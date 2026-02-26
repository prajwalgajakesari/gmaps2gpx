import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "gmaps2gpx — Convert Google Maps routes to GPX files";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(34, 197, 94, 0.15)",
              border: "2px solid rgba(34, 197, 94, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="19" r="3" />
              <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
              <circle cx="18" cy="5" r="3" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
            }}
          >
            gmaps2gpx
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#22c55e",
            marginBottom: "16px",
          }}
        >
          Google Maps to GPX Converter
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#71717a",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.6,
          }}
        >
          Free online tool. All travel modes. Works with Garmin, Wahoo, Strava & all GPS devices.
        </div>
      </div>
    ),
    { ...size }
  );
}
