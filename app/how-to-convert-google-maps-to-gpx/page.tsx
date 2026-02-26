import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Convert Google Maps to GPX — Step-by-Step Guide",
  description:
    "Learn how to convert any Google Maps directions URL to a GPX file for your Garmin, Wahoo, or GPS device. Free, no signup. Supports all travel modes.",
  alternates: {
    canonical: "https://gmaps2gpx.vercel.app/how-to-convert-google-maps-to-gpx",
  },
  openGraph: {
    title: "How to Convert Google Maps to GPX — Step-by-Step Guide",
    description:
      "Learn how to convert any Google Maps directions URL to a GPX file for your Garmin, Wahoo, or GPS device.",
    url: "https://gmaps2gpx.vercel.app/how-to-convert-google-maps-to-gpx",
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Google Maps to GPX",
    description:
      "A step-by-step guide to converting Google Maps routes to GPX files for GPS devices and navigation apps.",
    totalTime: "PT2M",
    tool: [{ "@type": "HowToTool", name: "gmaps2gpx web converter" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Create your route in Google Maps",
        text: "Open Google Maps on your computer or phone. Enter your starting point and destination. Add any stops or waypoints. You can drag the route to customize it — gmaps2gpx preserves dragged via-points.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Copy the Google Maps link",
        text: "Click the Share button in Google Maps and copy the URL. Both full URLs (google.com/maps/dir/...) and shortened URLs (maps.app.goo.gl/...) work.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Paste into gmaps2gpx and convert",
        text: "Go to gmaps2gpx.vercel.app, paste the URL, select your travel mode (driving, cycling, walking, motorcycle, or transit), and click Convert.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Select your preferred route",
        text: "If Google finds multiple alternative routes, gmaps2gpx displays all of them on the map. Click any route card to preview it, then proceed with your preferred option.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Download the GPX file",
        text: "Click Download GPX to save the file. You can also click Edit in gpx.studio to add elevation data, adjust waypoints, or split the track before downloading.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Import into your GPS device or app",
        text: "Import the GPX file into your device: upload to Garmin Connect for Garmin devices, use the Wahoo ELEMNT app for Wahoo devices, or drag into Strava, Komoot, AllTrails, or any GPS app.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HowToConvertPage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-[#0a0a0a] text-[#f8fafc]">
        <nav className="border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              &larr; Back to gmaps2gpx
            </Link>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 py-12 space-y-10">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
              How to Convert Google Maps to GPX
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              A complete guide to converting Google Maps directions into GPX files
              for Garmin, Wahoo, Strava, and any GPS device or navigation app.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Why convert Google Maps routes to GPX?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Google Maps is the most popular tool for planning routes, but it
              doesn't export to GPX — the universal file format used by GPS devices
              and fitness apps. If you want to follow a Google Maps route on your
              Garmin Edge, Wahoo ELEMNT, or any dedicated GPS device, you need a GPX
              file. The same applies if you want to import the route into Strava,
              Komoot, AllTrails, or OsmAnd.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              gmaps2gpx bridges this gap. It takes any Google Maps directions URL
              and converts it into a standard GPX 1.1 file with full route
              coordinates, waypoint markers, and support for all travel modes
              including motorcycle/two-wheeler routing.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Step-by-step instructions
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Create your route in Google Maps",
                  content: (
                    <>
                      <p>
                        Open{" "}
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline"
                        >
                          Google Maps
                        </a>{" "}
                        and enter your starting point and destination. Click
                        &quot;Directions&quot; to generate a route. You can:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Add multiple stops along the way</li>
                        <li>
                          Drag the route line to customize the exact path (gmaps2gpx
                          preserves these via-points)
                        </li>
                        <li>
                          Choose between driving, walking, cycling, or transit modes
                        </li>
                        <li>View alternative routes suggested by Google</li>
                      </ul>
                    </>
                  ),
                },
                {
                  step: "2",
                  title: "Copy the Google Maps link",
                  content: (
                    <p>
                      Click the <strong>Share</strong> button (or the hamburger
                      menu) and select &quot;Copy link&quot;. You'll get either a
                      full URL like{" "}
                      <code className="text-xs px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                        google.com/maps/dir/...
                      </code>{" "}
                      or a shortened URL like{" "}
                      <code className="text-xs px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                        maps.app.goo.gl/...
                      </code>
                      . Both formats work with gmaps2gpx.
                    </p>
                  ),
                },
                {
                  step: "3",
                  title: "Paste into gmaps2gpx and convert",
                  content: (
                    <p>
                      Go to{" "}
                      <Link href="/" className="text-emerald-400 hover:underline">
                        gmaps2gpx.vercel.app
                      </Link>
                      , paste your URL into the input field, select your travel mode
                      (driving, cycling, walking, motorcycle, or transit), and click{" "}
                      <strong>Convert</strong>. The tool resolves shortened URLs,
                      extracts waypoints, and calls the Google Directions API to
                      generate precise route coordinates.
                    </p>
                  ),
                },
                {
                  step: "4",
                  title: "Select from alternative routes",
                  content: (
                    <p>
                      If Google returns multiple route options, gmaps2gpx displays
                      all of them as clickable cards with distance and duration.
                      Each route is drawn on the map — the selected route in green,
                      alternatives in gray. Click any route card to preview it
                      before downloading. The shortest route is labeled automatically.
                    </p>
                  ),
                },
                {
                  step: "5",
                  title: "Download GPX or edit in gpx.studio",
                  content: (
                    <p>
                      Click <strong>Download GPX</strong> to save the file to your
                      device. If you want to add elevation data, adjust waypoints,
                      or split the track, click{" "}
                      <strong>Edit in gpx.studio</strong> to open the file directly
                      in the{" "}
                      <a
                        href="https://gpx.studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        gpx.studio
                      </a>{" "}
                      online editor.
                    </p>
                  ),
                },
                {
                  step: "6",
                  title: "Import into your GPS device or app",
                  content: (
                    <>
                      <p>
                        Import the GPX file into your device or app:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>
                          <strong>Garmin:</strong> Upload to{" "}
                          <a
                            href="https://connect.garmin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline"
                          >
                            Garmin Connect
                          </a>
                          , then sync to your device.{" "}
                          <Link
                            href="/google-maps-to-garmin"
                            className="text-emerald-400 hover:underline"
                          >
                            Full Garmin guide &rarr;
                          </Link>
                        </li>
                        <li>
                          <strong>Wahoo:</strong> Import via the Wahoo ELEMNT
                          Companion app.{" "}
                          <Link
                            href="/google-maps-to-wahoo"
                            className="text-emerald-400 hover:underline"
                          >
                            Full Wahoo guide &rarr;
                          </Link>
                        </li>
                        <li>
                          <strong>Strava:</strong> Go to Routes &gt; Create Route
                          &gt; Import GPX
                        </li>
                        <li>
                          <strong>Komoot:</strong> Import via the web app or mobile
                          app
                        </li>
                        <li>
                          <strong>AllTrails:</strong> Create a custom map and upload
                          the GPX
                        </li>
                      </ul>
                    </>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="glass rounded-xl p-5 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                      {item.step}
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-sm text-zinc-400 leading-relaxed pl-10">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Tips for better GPX conversions
            </h2>
            <ul className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <li>
                <strong className="text-zinc-200">Use motorcycle mode for two-wheelers:</strong>{" "}
                If you're planning a motorcycle route in India or Southeast Asia,
                select Motorcycle mode. It uses Google's Routes API with
                TWO_WHEELER travel mode, which gives routes suited for motorbikes
                rather than cars.
              </li>
              <li>
                <strong className="text-zinc-200">Drag routes for precision:</strong>{" "}
                If Google's default route doesn't follow the road you want, drag
                the route line in Google Maps. gmaps2gpx extracts these custom
                via-points from the URL's data parameter.
              </li>
              <li>
                <strong className="text-zinc-200">Check alternatives:</strong>{" "}
                When Google shows multiple routes, gmaps2gpx lets you preview
                each one on the map before downloading. The shortest route is
                automatically labeled.
              </li>
              <li>
                <strong className="text-zinc-200">Add elevation in gpx.studio:</strong>{" "}
                Google's Directions API doesn't always include elevation data.
                Click "Edit in gpx.studio" to automatically add elevation from
                SRTM datasets before importing into your device.
              </li>
              <li>
                <strong className="text-zinc-200">Use the CLI for batch conversion:</strong>{" "}
                If you need to convert multiple routes, install the CLI tool with{" "}
                <code className="text-xs px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                  pip install gmaps2gpx
                </code>{" "}
                and pass multiple URLs at once.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Supported travel modes
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              gmaps2gpx supports all Google Maps travel modes:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                "Driving",
                "Cycling / Bicycling",
                "Walking / Hiking",
                "Transit / Public transport",
                "Motorcycle / Two-wheeler",
              ].map((mode) => (
                <div
                  key={mode}
                  className="glass rounded-lg px-3 py-2 text-xs text-zinc-400"
                >
                  {mode}
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Motorcycle mode uses the Google Routes API with TWO_WHEELER travel
              mode, which provides routes optimized for motorbikes — especially
              useful in countries like India, Thailand, Vietnam, and Indonesia
              where two-wheeler routes differ significantly from car routes.
            </p>
          </section>

          <div className="glass rounded-xl p-6 text-center space-y-3">
            <p className="text-sm text-zinc-400">
              Ready to convert your route?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium text-sm transition-all duration-200"
            >
              Open gmaps2gpx converter &rarr;
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
