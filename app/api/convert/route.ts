import { NextRequest, NextResponse } from "next/server";
import { convertUrlToGpx, ConvertRequest } from "@/lib/converter";

export async function POST(request: NextRequest) {
  try {
    const body: ConvertRequest = await request.json();

    if (!body.url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL looks like a Google Maps link
    if (
      !body.url.includes("google.com/maps") &&
      !body.url.includes("goo.gl") &&
      !body.url.includes("maps.app")
    ) {
      return NextResponse.json(
        { error: "Please provide a valid Google Maps directions URL" },
        { status: 400 }
      );
    }

    const result = await convertUrlToGpx({
      url: body.url,
      mode: body.mode || "driving",
      shortest: body.shortest || false,
    });

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Conversion failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
