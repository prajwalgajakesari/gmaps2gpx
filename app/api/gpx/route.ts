import { NextRequest, NextResponse } from "next/server";

// In-memory store for temporary GPX files (shared within same serverless instance)
const store = new Map<string, { gpx: string; expires: number }>();

function cleanup() {
  const now = Date.now();
  for (const [key, val] of store) {
    if (val.expires < now) store.delete(key);
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Store GPX content, return an ID
export async function POST(request: NextRequest) {
  cleanup();
  const { gpx } = await request.json();
  if (!gpx) {
    return NextResponse.json({ error: "Missing gpx" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  store.set(id, { gpx, expires: Date.now() + 10 * 60 * 1000 }); // 10 min TTL
  return NextResponse.json({ id }, { headers: CORS_HEADERS });
}

// Serve GPX by ID (gpx.studio fetches this)
export async function GET(request: NextRequest) {
  cleanup();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return new NextResponse("Missing id parameter", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const entry = store.get(id);
  if (!entry) {
    return new NextResponse("GPX not found or expired. Please convert again.", {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  return new NextResponse(entry.gpx, {
    headers: {
      "Content-Type": "application/gpx+xml",
      "Content-Disposition": 'attachment; filename="route.gpx"',
      "Cache-Control": "public, max-age=600",
      ...CORS_HEADERS,
    },
  });
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}
