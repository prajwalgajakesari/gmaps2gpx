import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Export Google Maps Route to Garmin GPS",
  description:
    "Step-by-step guide to convert a Google Maps route to GPX and import it into any Garmin device — Edge, Fenix, Forerunner, Zumo. Free, no signup required.",
  keywords: [
    "google maps to garmin",
    "export google maps route to garmin",
    "google maps to garmin edge",
    "google maps to garmin fenix",
    "google maps route garmin gps",
    "import gpx garmin connect",
    "google maps to garmin zumo",
  ],
  alternates: {
    canonical: "https://gmaps2gpx.vercel.app/google-maps-to-garmin",
  },
  openGraph: {
    title: "How to Export Google Maps Route to Garmin GPS",
    description:
      "Convert Google Maps routes to GPX and import into Garmin Edge, Fenix, Forerunner, or Zumo. Free online tool.",
    url: "https://gmaps2gpx.vercel.app/google-maps-to-garmin",
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Export a Google Maps Route to Garmin GPS",
    description:
      "Complete guide to converting Google Maps routes to GPX and importing into Garmin devices via Garmin Connect.",
    author: { "@type": "Person", name: "Prajwal P" },
    publisher: { "@type": "Organization", name: "gmaps2gpx" },
    mainEntityOfPage:
      "https://gmaps2gpx.vercel.app/google-maps-to-garmin",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function GoogleMapsToGarminPage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-[#0a0a0a] text-[#f8fafc]">
        <nav className="border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
              &larr; Back to gmaps2gpx
            </Link>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 py-12 space-y-10">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
              How to Export a Google Maps Route to Garmin
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Convert any Google Maps directions URL into a GPX file and import it
              into your Garmin Edge, Fenix, Forerunner, Zumo, or any other Garmin GPS device.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">The problem</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              You've planned the perfect route in Google Maps — maybe a cycling ride,
              a hiking trail, or a motorcycle tour. But Google Maps doesn't let you
              export routes as GPX files, and Garmin devices need GPX files for
              turn-by-turn course navigation. Garmin Connect can import GPX files,
              but first you need to create one from your Google Maps route.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Step 1: Convert Google Maps to GPX
            </h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>Open your route in Google Maps and click <strong>Share</strong> to copy the link</li>
                <li>Go to <Link href="/" className="text-emerald-400 hover:underline">gmaps2gpx.vercel.app</Link></li>
                <li>Paste the URL, select your travel mode, and click <strong>Convert</strong></li>
                <li>If multiple routes appear, select the one you want</li>
                <li>Click <strong>Download GPX</strong></li>
              </ol>
              <p>
                The GPX file will contain all the route coordinates, waypoints, and
                turn-by-turn navigation data that Garmin needs.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Step 2: Import GPX into Garmin Connect (Web)
            </h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to <a href="https://connect.garmin.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">connect.garmin.com</a> and sign in</li>
                <li>Navigate to <strong>Training &amp; Planning</strong> &gt; <strong>Courses</strong></li>
                <li>Click <strong>Import</strong> (or the upload icon)</li>
                <li>Select your downloaded GPX file</li>
                <li>Review the course on the map, give it a name, and click <strong>Save</strong></li>
              </ol>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Step 3: Send the course to your Garmin device
            </h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>In Garmin Connect, open the saved course</li>
                <li>Click <strong>Send to Device</strong> and select your Garmin</li>
                <li>Sync your device (via Wi-Fi, Bluetooth, or USB)</li>
                <li>On your Garmin, go to <strong>Navigation</strong> &gt; <strong>Courses</strong> to find and start the route</li>
              </ol>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Alternative: USB file transfer
            </h2>
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <p>
                For Garmin devices that support USB mass storage (Edge series, some
                automotive units):
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Connect your Garmin to your computer via USB</li>
                <li>Open the Garmin drive in your file explorer</li>
                <li>Copy the GPX file to the <code className="text-xs px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300">Garmin/NewFiles</code> folder</li>
                <li>Safely eject and disconnect. The course will appear under Navigation &gt; Courses</li>
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Compatible Garmin devices
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              GPX files from gmaps2gpx work with all Garmin devices that support course navigation:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Garmin Edge 540 / 840 / 1040 / Explore",
                "Garmin Fenix 7 / 8 / Enduro",
                "Garmin Forerunner 265 / 965",
                "Garmin Zumo XT / XT2 (motorcycle)",
                "Garmin GPSMAP / Montana",
                "Garmin Venu / Vivoactive",
              ].map((device) => (
                <div key={device} className="glass rounded-lg px-3 py-2 text-xs text-zinc-400">
                  {device}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Motorcycle touring with Garmin Zumo
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              If you're planning a motorcycle route, select <strong>Motorcycle</strong> mode
              in gmaps2gpx before converting. This uses Google's Routes API with
              TWO_WHEELER travel mode, giving you routes optimized for motorbikes
              rather than cars. The resulting GPX file can be imported directly into
              your Garmin Zumo XT or XT2 for turn-by-turn navigation.
            </p>
          </section>

          <div className="glass rounded-xl p-6 text-center space-y-3">
            <p className="text-sm text-zinc-400">
              Ready to export your Google Maps route to Garmin?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium text-sm transition-all duration-200"
            >
              Convert now — it&apos;s free &rarr;
            </Link>
          </div>

          <footer className="text-xs text-zinc-600 space-y-2 pt-6 border-t border-white/[0.04]">
            <p>Related guides:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/how-to-convert-google-maps-to-gpx" className="text-zinc-500 hover:text-zinc-300 transition-colors">How to convert Google Maps to GPX</Link>
              <Link href="/google-maps-to-wahoo" className="text-zinc-500 hover:text-zinc-300 transition-colors">Google Maps to Wahoo</Link>
              <Link href="/gpx-vs-kml" className="text-zinc-500 hover:text-zinc-300 transition-colors">GPX vs KML</Link>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
