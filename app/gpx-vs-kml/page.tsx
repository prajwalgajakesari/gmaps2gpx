import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GPX vs KML — What's the Difference? Which Format Should You Use?",
  description:
    "GPX vs KML compared: when to use GPX (Garmin, Strava, GPS devices) vs KML (Google Earth, Google My Maps). Learn the differences and how to convert between them.",
  keywords: [
    "gpx vs kml",
    "gpx or kml",
    "difference between gpx and kml",
    "gpx vs kml vs kmz",
    "gpx file format",
    "kml file format",
    "which is better gpx or kml",
    "convert kml to gpx",
  ],
  alternates: {
    canonical: "https://gmaps2gpx.vercel.app/gpx-vs-kml",
  },
  openGraph: {
    title: "GPX vs KML — What's the Difference?",
    description: "GPX vs KML compared: when to use each format for GPS navigation, fitness tracking, and mapping.",
    url: "https://gmaps2gpx.vercel.app/gpx-vs-kml",
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GPX vs KML: What's the Difference and Which Should You Use?",
    description: "A comprehensive comparison of GPX and KML file formats for GPS navigation and mapping.",
    author: { "@type": "Person", name: "Prajwal P" },
    publisher: { "@type": "Organization", name: "gmaps2gpx" },
    mainEntityOfPage: "https://gmaps2gpx.vercel.app/gpx-vs-kml",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export default function GpxVsKmlPage() {
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
              GPX vs KML: What&apos;s the Difference?
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Both GPX and KML are XML-based formats for storing geographic data, but they serve
              different purposes. Here&apos;s when to use each one.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Quick comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="py-3 pr-4 text-zinc-400 font-semibold">Feature</th>
                    <th className="py-3 px-4 text-emerald-400 font-semibold">GPX</th>
                    <th className="py-3 pl-4 text-blue-400 font-semibold">KML</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Full name</td>
                    <td className="py-3 px-4">GPS Exchange Format</td>
                    <td className="py-3 pl-4">Keyhole Markup Language</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Created by</td>
                    <td className="py-3 px-4">Topografix (open standard)</td>
                    <td className="py-3 pl-4">Google (originally Keyhole)</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Primary use</td>
                    <td className="py-3 px-4">GPS navigation &amp; fitness tracking</td>
                    <td className="py-3 pl-4">Visualization &amp; presentation</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">GPS device support</td>
                    <td className="py-3 px-4 text-emerald-400">Excellent (universal)</td>
                    <td className="py-3 pl-4 text-zinc-500">Limited</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Google Earth</td>
                    <td className="py-3 px-4">Supported</td>
                    <td className="py-3 pl-4 text-blue-400">Native format</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Strava / Komoot</td>
                    <td className="py-3 px-4 text-emerald-400">Native import</td>
                    <td className="py-3 pl-4 text-zinc-500">Not supported</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Styling (colors, icons)</td>
                    <td className="py-3 px-4 text-zinc-500">Limited</td>
                    <td className="py-3 pl-4 text-blue-400">Rich styling</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-zinc-300">Data types</td>
                    <td className="py-3 px-4">Waypoints, tracks, routes</td>
                    <td className="py-3 pl-4">Placemarks, paths, polygons, overlays</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-zinc-300">Compressed variant</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 pl-4">KMZ (zipped KML)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">What is GPX?</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              GPX (GPS Exchange Format) is an open XML standard designed for transferring GPS data
              between devices and software. It stores three types of data: <strong>waypoints</strong> (individual
              points of interest), <strong>tracks</strong> (recorded paths with timestamps), and{" "}
              <strong>routes</strong> (planned sequences of waypoints).
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              GPX is the de facto standard for GPS hardware. Every Garmin, Wahoo, Bryton, Suunto,
              Polar, and COROS device reads GPX files natively. Fitness apps like Strava, Komoot,
              AllTrails, and Ride with GPS all import and export GPX. If you need to get a route
              onto a GPS device, GPX is the format to use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">What is KML?</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              KML (Keyhole Markup Language) was developed by Keyhole, Inc. and later acquired by
              Google. It's the native format for Google Earth and Google My Maps. KML is more
              expressive than GPX — it supports rich styling (colors, line widths, icons),
              3D models, image overlays, and complex polygons.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              KMZ is the compressed version of KML (a ZIP file containing a KML file and any
              referenced images). Google My Maps exports in KMZ format by default.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">When to use GPX</h2>
            <ul className="text-sm text-zinc-400 leading-relaxed space-y-2 list-disc list-inside">
              <li>Importing routes into <strong>Garmin, Wahoo, Bryton, Suunto</strong> or any GPS device</li>
              <li>Uploading activities to <strong>Strava, Komoot, AllTrails, Ride with GPS</strong></li>
              <li>Sharing routes with other <strong>cyclists, hikers, runners, or motorcyclists</strong></li>
              <li>When you need <strong>universal compatibility</strong> across devices and apps</li>
              <li>Recording and analyzing GPS tracks with <strong>elevation and heart rate data</strong></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">When to use KML</h2>
            <ul className="text-sm text-zinc-400 leading-relaxed space-y-2 list-disc list-inside">
              <li>Visualizing data in <strong>Google Earth</strong> or <strong>Google My Maps</strong></li>
              <li>Creating styled maps with <strong>custom icons, colors, and overlays</strong></li>
              <li>Sharing geographic data that includes <strong>polygons, boundaries, or regions</strong></li>
              <li>Embedding maps in <strong>presentations or websites</strong></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Converting between GPX and KML</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              If you have a Google Maps route and need a GPX file (the most common scenario),
              use <Link href="/" className="text-emerald-400 hover:underline">gmaps2gpx</Link> to
              convert directly. For converting between existing GPX and KML files,{" "}
              <a href="https://gpx.studio" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">gpx.studio</a>{" "}
              and{" "}
              <a href="https://www.gpsvisualizer.com/convert_input" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">GPS Visualizer</a>{" "}
              both handle format conversion.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Bottom line</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Use GPX</strong> if you want to navigate a route on a GPS device or share it with fitness apps.{" "}
              <strong className="text-zinc-200">Use KML</strong> if you want to create styled visualizations in Google Earth.
              For most people converting Google Maps routes for outdoor activities, <strong>GPX is the right choice</strong> — it's
              supported everywhere that matters.
            </p>
          </section>

          <div className="glass rounded-xl p-6 text-center space-y-3">
            <p className="text-sm text-zinc-400">Need a GPX file from Google Maps?</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium text-sm transition-all duration-200">
              Convert now with gmaps2gpx &rarr;
            </Link>
          </div>

          <footer className="text-xs text-zinc-600 space-y-2 pt-6 border-t border-white/[0.04]">
            <p>Related guides:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/how-to-convert-google-maps-to-gpx" className="text-zinc-500 hover:text-zinc-300 transition-colors">How to convert Google Maps to GPX</Link>
              <Link href="/google-maps-to-garmin" className="text-zinc-500 hover:text-zinc-300 transition-colors">Google Maps to Garmin</Link>
              <Link href="/google-maps-to-wahoo" className="text-zinc-500 hover:text-zinc-300 transition-colors">Google Maps to Wahoo</Link>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
