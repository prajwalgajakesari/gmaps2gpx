import { NextRequest, NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Serve GPX from compressed base64url data in the "z" query param.
// No server-side state — the GPX content travels through the URL itself.
export async function GET(request: NextRequest) {
  const z = request.nextUrl.searchParams.get("z");
  if (!z) {
    return new NextResponse("Missing z parameter", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  try {
    // base64url → base64
    let base64 = z.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";

    // Decode base64 → binary
    const compressed = Buffer.from(base64, "base64");

    // Decompress gzip → GPX XML
    const ds = new DecompressionStream("gzip");
    const stream = new Blob([compressed]).stream().pipeThrough(ds);
    const gpx = await new Response(stream).text();

    return new NextResponse(gpx, {
      headers: {
        "Content-Type": "application/gpx+xml",
        "Content-Disposition": 'attachment; filename="route.gpx"',
        "Cache-Control": "public, max-age=3600",
        ...CORS_HEADERS,
      },
    });
  } catch {
    return new NextResponse("Failed to decode GPX data", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}
