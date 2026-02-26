"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Car,
  Motorbike,
  PersonStanding,
  Bus,
  Bike,
  Route,
  Download,
  ArrowRight,
  MapPin,
  Clock,
  Ruler,
  Waypoints,
  Loader2,
  Terminal,
  ExternalLink,
  Github,
  Pencil,
  ChevronRight,
  Link,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  Monitor,
  Smartphone,
  Watch,
  Navigation,
} from "lucide-react";

const MapPreview = dynamic(() => import("@/components/MapPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl glass flex items-center justify-center">
      <div className="flex items-center gap-3 text-zinc-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Loading map...</span>
      </div>
    </div>
  ),
});

interface RouteOption {
  summary: string;
  distance: number;
  duration: number;
  points: [number, number][];
  waypoints: { lat: number; lng: number; name: string }[];
  gpx: string;
}

interface ConvertResult {
  routeName: string;
  routes: RouteOption[];
}

type TravelMode = "driving" | "walking" | "bicycling" | "transit" | "motorcycle";

const MODES: { value: TravelMode; label: string; icon: React.ElementType }[] = [
  { value: "driving", label: "Car", icon: Car },
  { value: "motorcycle", label: "Motorcycle", icon: Motorbike },
  { value: "bicycling", label: "Bicycle", icon: Bike },
  { value: "walking", label: "Walking", icon: PersonStanding },
  { value: "transit", label: "Transit", icon: Bus },
];

function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<TravelMode>("motorcycle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [studioLoading, setStudioLoading] = useState(false);

  const handleConvert = useCallback(async () => {
    if (!url.trim()) {
      setError("Paste a Google Maps directions URL to get started");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setSelectedRoute(0);
    try {
      const resp = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), mode }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Conversion failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url, mode]);

  const currentRoute = result?.routes[selectedRoute] ?? null;

  const handleDownload = useCallback(() => {
    if (!currentRoute || !result) return;
    const blob = new Blob([currentRoute.gpx], { type: "application/gpx+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const safeName = result.routeName.replace(/[^\w\s-]/g, "_").slice(0, 60);
    a.download = `${safeName}.gpx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [currentRoute, result]);

  const handleOpenStudio = useCallback(async () => {
    if (!currentRoute || !result) return;
    setStudioLoading(true);
    try {
      // Gzip compress the GPX using browser's CompressionStream API
      const blob = new Blob([currentRoute.gpx]);
      const compressed = await new Response(
        blob.stream().pipeThrough(new CompressionStream("gzip"))
      ).arrayBuffer();

      // Base64url encode (URL-safe, no padding)
      const bytes = new Uint8Array(compressed);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const b64url = btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      // GPX data is embedded in the URL itself — no server-side storage needed.
      // Our /api/gpx endpoint decodes the z param and serves raw GPX with CORS.
      const gpxUrl = `${window.location.origin}/api/gpx?z=${b64url}`;

      // For very long routes (>2000 points), the URL may exceed server limits.
      // Fall back to download + manual import in gpx.studio.
      if (gpxUrl.length > 12000) {
        handleDownload();
        window.open("https://gpx.studio/app", "_blank");
        setError("Route too long to open directly. GPX downloaded — drag it into gpx.studio.");
        return;
      }

      const studioUrl = `https://gpx.studio/app?files=${encodeURIComponent(JSON.stringify([gpxUrl]))}`;
      window.open(studioUrl, "_blank");
    } catch {
      setError("Failed to open gpx.studio. Try downloading the file and importing it manually.");
    } finally {
      setStudioLoading(false);
    }
  }, [currentRoute, result, handleDownload]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f8fafc] relative">
      <div className="ambient-glow" />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Route className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-base font-semibold tracking-tight">gmaps2gpx</span>
              <p className="text-xs text-zinc-500 leading-none mt-0.5">
                Google Maps to GPX
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://pypi.org/project/gmaps2gpx/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass glass-hover text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              pip install gmaps2gpx
            </a>
            <a
              href="https://github.com/prajwalgajakesari/gmaps2gpx-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass glass-hover text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h1 className="sr-only">Convert Google Maps Routes to GPX Files — Free Online Converter</h1>

        {/* ── URL Input ──────────────────────────────────────── */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-500" />
            Directions URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleConvert()}
                placeholder="https://maps.app.goo.gl/... or any Google Maps directions link"
                className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200 font-mono"
              />
            </div>
            <button
              onClick={handleConvert}
              disabled={loading}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Converting
                </>
              ) : (
                <>
                  Convert
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Travel Mode ──────────────────────────────────────── */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
            Travel Mode
          </label>
          <div className="flex gap-1 p-1 rounded-xl glass w-fit">
            {MODES.map((m) => {
              const Icon = m.icon;
              const active = mode === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-emerald-600/90 text-white shadow-md shadow-emerald-600/20"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                  }`}
                  title={m.label}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Error ──────────────────────────────────────────── */}
        {error && (
          <div className="px-4 py-3.5 rounded-xl border border-red-500/15 bg-red-500/[0.06] text-red-400 text-sm flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Results ────────────────────────────────────────── */}
        {result && currentRoute && (
          <div className="space-y-5 animate-in">
            {/* Route Picker — only when multiple routes */}
            {result.routes.length > 1 && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Route className="w-3.5 h-3.5" />
                  {result.routes.length} routes found — select one
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {result.routes.map((route, i) => {
                    const isSelected = i === selectedRoute;
                    const isShortest =
                      route.distance ===
                      Math.min(...result.routes.map((r) => r.distance));
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedRoute(i)}
                        className={`glass rounded-xl px-4 py-3.5 text-left transition-all duration-200 cursor-pointer relative ${
                          isSelected
                            ? "ring-1 ring-emerald-500/30 bg-emerald-500/[0.06]"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        {/* Radio indicator */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2.5 h-2.5 rounded-full shrink-0 border-2 transition-colors ${
                                  isSelected
                                    ? "bg-emerald-400 border-emerald-400"
                                    : "border-zinc-600 bg-transparent"
                                }`}
                              />
                              <span className="text-sm font-medium text-white truncate">
                                {route.summary || `Route ${i + 1}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5 mt-2 ml-[18px] text-xs text-zinc-500">
                              <span className="flex items-center gap-1">
                                <Ruler className="w-3 h-3" />
                                {formatDistance(route.distance)}
                              </span>
                              <span className="text-zinc-700">·</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDuration(route.duration)}
                              </span>
                            </div>
                          </div>
                          {isShortest && (
                            <span className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-widest whitespace-nowrap mt-0.5">
                              Shortest
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Ruler, label: "Distance", value: formatDistance(currentRoute.distance) },
                { icon: Clock, label: "Duration", value: formatDuration(currentRoute.duration) },
                { icon: Waypoints, label: "Points", value: currentRoute.points.length.toLocaleString() },
                {
                  icon: MODES.find((m) => m.value === mode)?.icon || Car,
                  label: "Mode",
                  value: MODES.find((m) => m.value === mode)?.label || mode,
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass rounded-xl px-4 py-3.5">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold uppercase tracking-widest">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-white tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 glass rounded-xl px-5 py-4">
              <div className="text-sm text-zinc-400 font-mono truncate">
                {result.routeName}
                {result.routes.length > 1 && (
                  <span className="text-zinc-600 ml-2">
                    via {currentRoute.summary}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleOpenStudio}
                  disabled={studioLoading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass glass-hover text-sm font-medium text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-40"
                >
                  {studioLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Pencil className="w-4 h-4" />
                  )}
                  Edit in gpx.studio
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  Download GPX
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/[0.06]">
              <MapPreview
                routes={result.routes.map((r) => ({
                  points: r.points,
                  waypoints: r.waypoints,
                }))}
                selectedIndex={selectedRoute}
              />
            </div>
          </div>
        )}

        {/* ── Empty State ────────────────────────────────────── */}
        {!result && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 space-y-5">
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
              <MapPin className="w-7 h-7 text-zinc-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-zinc-500 text-sm">
                Paste a Google Maps directions URL to convert it to GPX
              </p>
              <p className="text-zinc-700 text-xs max-w-md">
                Supports shortened links, dragged routes, via-points, alternative routes, and two-wheeler mode
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-[11px] px-3 py-1.5 rounded-lg glass text-zinc-500 font-mono">
                pip install gmaps2gpx
              </code>
              <span className="text-zinc-700 text-xs">also available as CLI</span>
            </div>
          </div>
        )}
      </main>

      {/* ── SEO Content Sections ──────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mt-24 space-y-20">

        {/* How It Works */}
        <section>
          <h2 className="text-xl font-semibold text-white tracking-tight mb-2">
            How to Convert Google Maps to GPX
          </h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-2xl">
            Convert any Google Maps directions URL to a GPX file in three simple steps. No signup, no software to install.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                icon: Link,
                title: "Copy your Google Maps URL",
                desc: "Create your route in Google Maps with origin, destination, and any stops. Click Share and copy the link. Shortened links (maps.app.goo.gl) work too.",
              },
              {
                step: "2",
                icon: Zap,
                title: "Paste and convert",
                desc: "Paste the URL above, choose your travel mode (driving, cycling, walking, motorcycle, or transit), and click Convert. Select from alternative routes if available.",
              },
              {
                step: "3",
                icon: Download,
                title: "Download or edit",
                desc: "Download the GPX file to import into your Garmin, Wahoo, or any GPS device. Or click Edit in gpx.studio to fine-tune the route before saving.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="glass rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
                      {item.step}
                    </div>
                    <Icon className="w-4 h-4 text-zinc-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-xl font-semibold text-white tracking-tight mb-2">
            Why Choose gmaps2gpx
          </h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-2xl">
            A modern, free Google Maps to GPX converter built for GPS enthusiasts, cyclists, hikers, and motorcycle tourers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: Route, title: "All travel modes", desc: "Driving, cycling, walking, transit, and motorcycle/two-wheeler routing via Google Routes API." },
              { icon: MapPin, title: "Dragged routes preserved", desc: "Via-points from dragged routes are automatically extracted and included in the GPX file." },
              { icon: Globe, title: "Shortened URL support", desc: "Paste maps.app.goo.gl links directly. The tool automatically resolves shortened URLs." },
              { icon: Waypoints, title: "Alternative route selection", desc: "When Google finds multiple routes, preview each one on the map and pick the one you want." },
              { icon: Pencil, title: "One-click gpx.studio editing", desc: "Open your GPX directly in gpx.studio to add elevation data, split tracks, or adjust waypoints." },
              { icon: Shield, title: "Privacy-first", desc: "No route data is stored on the server. No account required. No tracking. 100% free." },
              { icon: Terminal, title: "CLI tool available", desc: "Install via pip install gmaps2gpx for batch conversion, scripting, and automation." },
              { icon: Motorbike, title: "Motorcycle mode", desc: "Two-wheeler routing via Google Routes API — especially useful in India and Southeast Asia." },
              { icon: Download, title: "GPX 1.1 standard", desc: "Universal GPS format compatible with all devices: Garmin, Wahoo, Bryton, Suunto, and all GPS apps." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-xl px-4 py-3.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400/70" />
                    <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compatible Devices & Apps */}
        <section>
          <h2 className="text-xl font-semibold text-white tracking-tight mb-2">
            Compatible GPS Devices and Apps
          </h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-2xl">
            GPX is the universal GPS exchange format. Files from gmaps2gpx work with every major GPS device and navigation app.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <Navigation className="w-4 h-4" />
                <h3 className="text-sm font-semibold text-white">GPS Devices</h3>
              </div>
              <ul className="text-xs text-zinc-500 space-y-1.5">
                <li>Garmin Edge, Fenix, Forerunner, Zumo</li>
                <li>Wahoo ELEMNT, ROAM, BOLT</li>
                <li>Bryton Rider, Aero</li>
                <li>Suunto, Polar, COROS</li>
                <li>TomTom, Lezyne</li>
              </ul>
            </div>
            <div className="glass rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <Smartphone className="w-4 h-4" />
                <h3 className="text-sm font-semibold text-white">Mobile Apps</h3>
              </div>
              <ul className="text-xs text-zinc-500 space-y-1.5">
                <li>Strava</li>
                <li>Komoot</li>
                <li>AllTrails</li>
                <li>OsmAnd</li>
                <li>Gaia GPS, Wikiloc</li>
              </ul>
            </div>
            <div className="glass rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <Monitor className="w-4 h-4" />
                <h3 className="text-sm font-semibold text-white">Desktop & Web</h3>
              </div>
              <ul className="text-xs text-zinc-500 space-y-1.5">
                <li>Garmin Connect</li>
                <li>Ride with GPS</li>
                <li>Google Earth</li>
                <li>gpx.studio</li>
                <li>Garmin BaseCamp</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold text-white tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-2xl">
            Everything you need to know about converting Google Maps routes to GPX files.
          </p>
          <div className="space-y-2">
            {[
              {
                q: "Can I export a Google Maps route as a GPX file?",
                a: "Yes. Google Maps does not natively export GPX files, but gmaps2gpx converts any Google Maps directions URL into a standard GPX 1.1 file. Just copy the URL from Google Maps, paste it into gmaps2gpx, and download the GPX file. It works with shortened links, dragged routes, and via-points.",
              },
              {
                q: "How do I convert Google Maps directions to GPX?",
                a: "Open Google Maps, create your route, click Share, and copy the link. Then go to gmaps2gpx, paste the URL, choose your travel mode (driving, cycling, walking, motorcycle, or transit), and click Convert. You can preview the route on the map, select from alternative routes, and download the GPX file.",
              },
              {
                q: "How do I export a Google Maps route to my Garmin?",
                a: "Convert your Google Maps route to GPX using gmaps2gpx, then import the GPX file into Garmin Connect (web or app). From Garmin Connect, send the course to your Garmin device. This works with all Garmin devices including Edge cycling computers, Fenix watches, and Zumo motorcycle GPS units.",
              },
              {
                q: "What is the best Google Maps to GPX converter?",
                a: "gmaps2gpx is a free, modern Google Maps to GPX converter that supports all travel modes including motorcycle/two-wheeler routing, alternative route selection with map preview, shortened URLs, dragged routes, and one-click editing in gpx.studio. It is also available as a CLI tool (pip install gmaps2gpx) for batch conversion.",
              },
              {
                q: "Does the GPX file include elevation data?",
                a: "The GPX file includes precise GPS coordinates for every point along the route. For full elevation profiles, you can open the GPX file in gpx.studio (one-click from gmaps2gpx) which automatically adds elevation data from SRTM datasets.",
              },
              {
                q: "Does Google Maps support GPX files?",
                a: "Google Maps does not natively import or export GPX files. However, you can convert Google Maps routes to GPX using gmaps2gpx, and import GPX files into Google My Maps by uploading them as a new layer.",
              },
              {
                q: "Is gmaps2gpx free to use?",
                a: "Yes, gmaps2gpx is 100% free with no hidden fees, no signup required, and no usage limits. Both the web app and the CLI tool (pip install gmaps2gpx) are completely free and open source.",
              },
              {
                q: "Can I convert shortened Google Maps links?",
                a: "Yes. gmaps2gpx automatically resolves shortened Google Maps links (maps.app.goo.gl format). Just paste the shortened URL directly — no need to expand it first.",
              },
              {
                q: "Does gmaps2gpx support motorcycle routing?",
                a: "Yes. gmaps2gpx supports motorcycle/two-wheeler routing via the Google Routes API. This is especially useful in India and Southeast Asia where two-wheeler routes differ significantly from car routes. Select the Motorcycle mode before converting.",
              },
              {
                q: "What is the difference between GPX and KML?",
                a: "GPX (GPS Exchange Format) is the standard for GPS devices and fitness apps like Garmin, Wahoo, Strava, and Komoot. KML (Keyhole Markup Language) is Google's format for Google Earth and Google My Maps. GPX is more widely supported by GPS hardware, while KML is better for Google products. gmaps2gpx outputs GPX 1.1, the most compatible format.",
              },
              {
                q: "What GPS devices are compatible with GPX files?",
                a: "GPX is a universal format supported by virtually all GPS devices and apps: Garmin (Edge, Fenix, Forerunner, Zumo), Wahoo (ELEMNT, ROAM, BOLT), Bryton, Suunto, Polar, COROS, Strava, Komoot, AllTrails, OsmAnd, Ride with GPS, Wikiloc, Gaia GPS, Google Earth, and many more.",
              },
              {
                q: "Is my route data stored on the server?",
                a: "No. gmaps2gpx processes your route in real-time and does not store any route data, URLs, or personal information on the server. Your privacy is fully protected.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="glass rounded-xl group"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-sm font-medium text-zinc-200 hover:text-white transition-colors">
                  <span>{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-600 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4 text-sm text-zinc-500 leading-relaxed border-t border-white/[0.04] pt-3">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Why Convert */}
        <section>
          <h2 className="text-xl font-semibold text-white tracking-tight mb-2">
            Why Convert Google Maps to GPX?
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
            Google Maps is great for planning routes, but it doesn't export to GPX — the universal format used by GPS devices and fitness apps. Whether you're planning a cycling route on your Garmin Edge, a hiking trail for AllTrails, a motorcycle tour for your Zumo, or a running course for Strava, you need a GPX file. gmaps2gpx bridges the gap: plan your route in Google Maps where it's easiest, then convert to GPX for turn-by-turn navigation on your device.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { icon: Bike, label: "Cycling" },
              { icon: PersonStanding, label: "Hiking" },
              { icon: Motorbike, label: "Motorcycle touring" },
              { icon: Car, label: "Road trips" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass rounded-xl px-4 py-3 flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-emerald-400/60" />
                  <span className="text-xs text-zinc-400 font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] mt-20">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            Built by{" "}
            <span className="text-zinc-500">Prajwal P</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-700">
            <span>Routes via Google Maps API</span>
            <span className="text-zinc-800">·</span>
            <span>Map tiles by OpenStreetMap</span>
            <a
              href="https://pypi.org/project/gmaps2gpx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              PyPI <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
