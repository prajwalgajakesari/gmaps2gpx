// Core conversion logic - server-side only

export interface ConvertRequest {
  url: string;
  mode: "driving" | "walking" | "bicycling" | "transit" | "motorcycle";
}

export interface RouteOption {
  summary: string;
  distance: number;
  duration: number;
  points: [number, number][];
  waypoints: { lat: number; lng: number; name: string }[];
  gpx: string;
}

export interface ConvertResult {
  routeName: string;
  routes: RouteOption[];
}

// ---------------------------------------------------------------------------
// URL Parsing
// ---------------------------------------------------------------------------

async function resolveShortUrl(url: string): Promise<string> {
  if (url.includes("goo.gl") || url.includes("maps.app")) {
    const resp = await fetch(url, { method: "HEAD", redirect: "follow" });
    return resp.url;
  }
  return url;
}

function parseGoogleMapsUrl(fullUrl: string): {
  origin: string;
  destination: string;
  waypoints: string[];
} {
  const parsed = new URL(fullUrl);
  const path = parsed.pathname; // raw, not decoded

  let dirMatch = path.match(/\/maps\/dir\/(.+?)(?:\/@|$)/);
  if (!dirMatch) dirMatch = path.match(/\/maps\/dir\/(.+)/);
  if (!dirMatch) {
    throw new Error("Could not parse directions from this URL. Make sure it contains '/maps/dir/'.");
  }

  const segments = dirMatch[1].split("/").filter((s) => s.trim());
  const cleanSegments: string[] = [];
  for (const seg of segments) {
    if (seg.startsWith("@")) break;
    const cleaned = seg.split("@")[0].trim();
    if (cleaned) cleanSegments.push(decodeURIComponent(cleaned));
  }

  if (cleanSegments.length < 2) {
    throw new Error("Need at least an origin and destination.");
  }

  // Extract dragged via-points from data= parameter
  const viaWaypoints: string[] = [];
  const dataMatch = fullUrl.match(/data=([^&]+)/);
  if (dataMatch) {
    const dataStr = decodeURIComponent(dataMatch[1]);
    const viaPoints = [...dataStr.matchAll(/!3m\d+!1m2!1d([\d.]+)!2d([\d.]+)/g)];
    for (const m of viaPoints) {
      viaWaypoints.push(`${m[2]},${m[1]}`);
    }
  }

  const pathWaypoints = cleanSegments.length > 2 ? cleanSegments.slice(1, -1) : [];

  return {
    origin: cleanSegments[0],
    destination: cleanSegments[cleanSegments.length - 1],
    waypoints: [...pathWaypoints, ...viaWaypoints],
  };
}

// ---------------------------------------------------------------------------
// Google Directions API
// ---------------------------------------------------------------------------

async function getDirections(
  origin: string,
  destination: string,
  waypoints: string[],
  apiKey: string,
  mode: string,
  alternatives: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (mode === "motorcycle") {
    return getDirectionsRoutesApi(origin, destination, waypoints, apiKey, alternatives);
  }

  const params = new URLSearchParams({
    origin,
    destination,
    mode,
    key: apiKey,
  });
  if (waypoints.length) params.set("waypoints", waypoints.join("|"));
  if (alternatives) params.set("alternatives", "true");

  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?${params}`,
    { signal: AbortSignal.timeout(15000) }
  );
  const data = await resp.json();
  if (data.status !== "OK") {
    throw new Error(`Directions API error: ${data.status} — ${data.error_message || ""}`);
  }
  return data;
}

// Build a Routes API waypoint — latLng for coordinates, address for place names.
// No Geocoding API needed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function routesWaypoint(place: string): any {
  if (/^-?\d+\.?\d*,-?\d+\.?\d*$/.test(place.trim())) {
    const [lat, lng] = place.trim().split(",").map(Number);
    return { location: { latLng: { latitude: lat, longitude: lng } } };
  }
  return { address: place };
}

async function getDirectionsRoutesApi(
  origin: string,
  destination: string,
  waypoints: string[],
  apiKey: string,
  alternatives: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = {
    origin: routesWaypoint(origin),
    destination: routesWaypoint(destination),
    travelMode: "TWO_WHEELER",
    computeAlternativeRoutes: alternatives,
  };

  if (waypoints.length) {
    body.intermediates = waypoints.map((wp) => routesWaypoint(wp));
  }

  const resp = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "routes.legs.steps.polyline,routes.legs.distanceMeters,routes.legs.duration,routes.legs.startLocation,routes.legs.endLocation,routes.description",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  const data = await resp.json();
  if (!data.routes?.length) {
    throw new Error("Routes API returned no routes");
  }

  // Convert to legacy Directions API format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const converted: any = { routes: [] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const route of data.routes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legs: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const leg of route.legs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const steps: any[] = [];
      for (const step of leg.steps || []) {
        steps.push({ polyline: { points: step.polyline?.encodedPolyline || "" } });
      }
      const durStr = leg.duration || "0s";
      const durSecs = typeof durStr === "string" ? parseInt(durStr) : 0;
      const start = leg.startLocation?.latLng || {};
      const end = leg.endLocation?.latLng || {};
      legs.push({
        distance: { value: leg.distanceMeters || 0 },
        duration: { value: durSecs },
        start_location: { lat: start.latitude || 0, lng: start.longitude || 0 },
        end_location: { lat: end.latitude || 0, lng: end.longitude || 0 },
        start_address: "",
        end_address: "",
        steps,
      });
    }
    converted.routes.push({ legs, summary: route.description || "" });
  }
  return converted;
}

// ---------------------------------------------------------------------------
// Polyline Decoding
// ---------------------------------------------------------------------------

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    for (let coord = 0; coord < 2; coord++) {
      let shift = 0;
      let result = 0;
      let b: number;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const delta = result & 1 ? ~(result >> 1) : result >> 1;
      if (coord === 0) lat += delta;
      else lng += delta;
    }
    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

// ---------------------------------------------------------------------------
// GPX Generation
// ---------------------------------------------------------------------------

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildGpx(
  points: [number, number][],
  routeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legs: any[]
): string {
  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<gpx version="1.1" creator="gmaps2gpx"',
    '     xmlns="http://www.topografix.com/GPX/1/1"',
    '     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '     xsi:schemaLocation="http://www.topografix.com/GPX/1/1',
    '     http://www.topografix.com/GPX/1/1/gpx.xsd">',
    "  <metadata>",
    `    <name>${escapeXml(routeName)}</name>`,
    `    <time>${now}</time>`,
    "  </metadata>",
  ];

  if (legs.length) {
    const start = legs[0].start_location;
    const startName = legs[0].start_address || "Start";
    lines.push(`  <wpt lat="${start.lat}" lon="${start.lng}">`);
    lines.push(`    <name>${escapeXml(startName)}</name>`);
    lines.push("  </wpt>");
    for (let i = 0; i < legs.length; i++) {
      const end = legs[i].end_location;
      const endName = legs[i].end_address || `Stop ${i + 1}`;
      lines.push(`  <wpt lat="${end.lat}" lon="${end.lng}">`);
      lines.push(`    <name>${escapeXml(endName)}</name>`);
      lines.push("  </wpt>");
    }
  }

  lines.push("  <trk>");
  lines.push(`    <name>${escapeXml(routeName)}</name>`);
  lines.push("    <trkseg>");
  for (const [lat, lng] of points) {
    lines.push(`      <trkpt lat="${lat.toFixed(6)}" lon="${lng.toFixed(6)}"></trkpt>`);
  }
  lines.push("    </trkseg>");
  lines.push("  </trk>");
  lines.push("</gpx>");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main Pipeline
// ---------------------------------------------------------------------------

export async function convertUrlToGpx(req: ConvertRequest): Promise<ConvertResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("Server API key not configured");

  const resolvedUrl = await resolveShortUrl(req.url);
  const parsed = parseGoogleMapsUrl(resolvedUrl);
  const routeName = `${parsed.origin} to ${parsed.destination}`;

  const data = await getDirections(
    parsed.origin,
    parsed.destination,
    parsed.waypoints,
    apiKey,
    req.mode,
    true // always request alternatives
  );

  const routes: RouteOption[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (let i = 0; i < data.routes.length; i++) {
    const route = data.routes[i];
    const points: [number, number][] = [];
    const waypoints: RouteOption["waypoints"] = [];
    let distance = 0;
    let duration = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const leg of route.legs) {
      distance += leg.distance.value;
      duration += leg.duration.value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const step of leg.steps) {
        points.push(...decodePolyline(step.polyline.points));
      }
    }

    if (route.legs.length) {
      waypoints.push({
        lat: route.legs[0].start_location.lat,
        lng: route.legs[0].start_location.lng,
        name: route.legs[0].start_address || "Start",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const leg of route.legs) {
        waypoints.push({
          lat: leg.end_location.lat,
          lng: leg.end_location.lng,
          name: leg.end_address || "End",
        });
      }
    }

    routes.push({
      summary: route.summary || `Route ${i + 1}`,
      distance,
      duration,
      points,
      waypoints,
      gpx: buildGpx(points, routeName, route.legs),
    });
  }

  return { routeName, routes };
}
