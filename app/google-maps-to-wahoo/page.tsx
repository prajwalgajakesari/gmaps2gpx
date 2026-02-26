import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Export Google Maps Route to Wahoo ELEMNT",
  description:
    "Convert Google Maps routes to GPX and import into Wahoo ELEMNT, ROAM, or BOLT. Step-by-step guide using the free gmaps2gpx converter.",
  keywords: [
    "google maps to wahoo",
    "google maps to wahoo elemnt",
    "google maps route wahoo bolt",
    "import gpx wahoo",
    "wahoo elemnt gpx import",
    "google maps to wahoo roam",
  ],
  alternates: {
    canonical: "https://gmaps2gpx.vercel.app/google-maps-to-wahoo",
  },
  openGraph: {
    title: "How to Export Google Maps Route to Wahoo ELEMNT",
    description: "Convert Google Maps routes to GPX for Wahoo ELEMNT, ROAM, BOLT. Free online tool.",
    url: "https://gmaps2gpx.vercel.app/google-maps-to-wahoo",
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Export a Google Maps Route to Wahoo ELEMNT",
    description: "Guide to converting Google Maps routes to GPX and importing into Wahoo cycling computers.",
    author: { "@type": "Person", name: "Prajwal P" },
    publisher: { "@type": "Organization", name: "gmaps2gpx" },
    mainEntityOfPage: "https://gmaps2gpx.vercel.app/google-maps-to-wahoo",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export default function GoogleMapsToWahooPage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-[#0a0a0a] text-[#f8fafc]">
        <nav className="border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">&larr; Back to gmaps2gpx</Link>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 py-12 space-y-10">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
              How to Export a Google Maps Route to Wahoo
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Plan your cycling route in Google Maps, convert it to GPX with gmaps2gpx,
              and ride it on your Wahoo ELEMNT, ROAM, or BOLT with turn-by-turn navigation.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Why use Google Maps for route planning?</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              While Wahoo and Strava have built-in route planners, Google Maps remains the most
              familiar and detailed mapping tool. It lets you easily drag routes to follow
              specific roads, check street view for road conditions, and plan multi-stop routes.
              The missing piece is getting that route onto your Wahoo — which is where gmaps2gpx
              comes in.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Step 1: Convert your Google Maps route to GPX</h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>Plan your cycling route in Google Maps (select Cycling mode for bike-friendly roads)</li>
                <li>Click <strong>Share</strong> and copy the URL</li>
                <li>Go to <Link href="/" className="text-emerald-400 hover:underline">gmaps2gpx.vercel.app</Link></li>
                <li>Paste the URL, select <strong>Bicycle</strong> mode, and click <strong>Convert</strong></li>
                <li>Preview the route on the map and click <strong>Download GPX</strong></li>
              </ol>
              <p>
                Tip: If you want elevation data added to your GPX file, click{" "}
                <strong>Edit in gpx.studio</strong> before downloading. gpx.studio automatically
                adds elevation from SRTM datasets, which improves Wahoo's climb tracking.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Step 2: Import GPX into the Wahoo ELEMNT app</h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>Open the <strong>Wahoo ELEMNT Companion</strong> app on your phone</li>
                <li>Tap the <strong>Routes</strong> tab at the bottom</li>
                <li>Tap the <strong>+</strong> button and select <strong>Import file</strong></li>
                <li>Browse to your downloaded GPX file and select it</li>
                <li>The route will appear in your routes list</li>
              </ol>
              <p>
                You can also email the GPX file to yourself and open it on your phone — iOS and
                Android will offer to open it in the Wahoo app.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Step 3: Start the route on your Wahoo</h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>Make sure your Wahoo ELEMNT is paired with the companion app and synced</li>
                <li>On your Wahoo device, press the page button to navigate to the route page</li>
                <li>Select your imported route from the list</li>
                <li>Press <strong>Ride</strong> to start turn-by-turn navigation</li>
              </ol>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Alternative: Import via Strava or Komoot</h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <p>
                If you sync your Wahoo with Strava or Komoot, you can import the GPX file there instead:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Strava:</strong> Go to Routes &gt; Create Route &gt; Import GPX. The route will sync to your Wahoo automatically.</li>
                <li><strong>Komoot:</strong> Import the GPX via the web app, then sync to Wahoo through the Komoot integration.</li>
                <li><strong>Ride with GPS:</strong> Upload the GPX file, then send to your Wahoo via the app.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Compatible Wahoo devices</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Wahoo ELEMNT BOLT v1/v2",
                "Wahoo ELEMNT ROAM v1/v2",
                "Wahoo ELEMNT ACE",
                "Wahoo ELEMNT RIVAL (watch)",
              ].map((device) => (
                <div key={device} className="glass rounded-lg px-3 py-2 text-xs text-zinc-400">{device}</div>
              ))}
            </div>
          </section>

          <div className="glass rounded-xl p-6 text-center space-y-3">
            <p className="text-sm text-zinc-400">Ready to export your Google Maps route to Wahoo?</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium text-sm transition-all duration-200">
              Convert now — it&apos;s free &rarr;
            </Link>
          </div>

          <footer className="text-xs text-zinc-600 space-y-2 pt-6 border-t border-white/[0.04]">
            <p>Related guides:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/how-to-convert-google-maps-to-gpx" className="text-zinc-500 hover:text-zinc-300 transition-colors">How to convert Google Maps to GPX</Link>
              <Link href="/google-maps-to-garmin" className="text-zinc-500 hover:text-zinc-300 transition-colors">Google Maps to Garmin</Link>
              <Link href="/gpx-vs-kml" className="text-zinc-500 hover:text-zinc-300 transition-colors">GPX vs KML</Link>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
