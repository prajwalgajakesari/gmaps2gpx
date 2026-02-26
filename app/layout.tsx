import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://gmaps2gpx.vercel.app";
const TITLE = "Google Maps to GPX Converter — Free Online Route Converter | gmaps2gpx";
const DESCRIPTION =
  "Convert Google Maps routes to GPX files instantly. Free, no signup. Works with Garmin, Wahoo, Strava & all GPS devices. Supports driving, cycling, walking, motorcycle & transit routes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | gmaps2gpx",
  },
  description: DESCRIPTION,
  keywords: [
    "google maps to gpx",
    "google maps to gpx converter",
    "convert google maps route to gpx",
    "google maps gpx download",
    "maps to gpx",
    "export google maps to gpx",
    "google maps to garmin",
    "google maps to wahoo",
    "gpx converter online",
    "google maps directions to gpx file",
    "google maps route to garmin gps",
    "google maps to gpx cycling",
    "google maps to gpx hiking",
    "google maps to gpx motorcycle",
    "two wheeler route gpx",
    "free gpx converter",
    "mapstogpx alternative",
    "route converter gps",
  ],
  authors: [{ name: "Prajwal P" }],
  creator: "Prajwal P",
  publisher: "gmaps2gpx",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "gmaps2gpx",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "gmaps2gpx — Convert Google Maps routes to GPX files",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Maps to GPX Converter — Free Online",
    description: DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
  other: {
    "google-site-verification": "",
  },
};

// Structured data: WebApplication + FAQPage + HowTo
function JsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "gmaps2gpx — Google Maps to GPX Converter",
      url: SITE_URL,
      description: DESCRIPTION,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: {
        "@type": "Person",
        name: "Prajwal P",
      },
      featureList: [
        "Convert Google Maps directions URLs to GPX",
        "Support for Garmin, Wahoo, Bryton, Suunto & all GPS devices",
        "Compatible with Strava, Komoot, AllTrails, OsmAnd, Ride with GPS",
        "Driving, cycling, walking, transit & motorcycle/two-wheeler modes",
        "Alternative route selection with map preview",
        "Shortened URL support (maps.app.goo.gl links)",
        "Dragged route & via-point preservation",
        "One-click edit in gpx.studio",
        "GPX 1.1 standard output",
        "No registration required",
        "Privacy-first: no route data stored on server",
        "Also available as CLI: pip install gmaps2gpx",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Convert a Google Maps Route to GPX",
      description:
        "Convert any Google Maps directions URL to a GPX file in 3 simple steps using gmaps2gpx.",
      totalTime: "PT1M",
      tool: [{ "@type": "HowToTool", name: "gmaps2gpx web converter" }],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Copy your Google Maps directions URL",
          text: 'Open Google Maps, create your route with origin and destination, then click "Share" and copy the link. Shortened links (maps.app.goo.gl) work too.',
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste the URL and convert",
          text: "Paste the Google Maps URL into the converter, choose your travel mode (driving, cycling, walking, motorcycle, or transit), and click Convert. If multiple routes are found, select the one you want.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Download GPX or edit in gpx.studio",
          text: 'Click "Download GPX" to save the file, then import it into your Garmin, Wahoo, or any GPS device. Or click "Edit in gpx.studio" to fine-tune the route before downloading.',
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I export a Google Maps route as a GPX file?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Google Maps does not natively export GPX files, but gmaps2gpx converts any Google Maps directions URL into a standard GPX 1.1 file. Just copy the URL from Google Maps, paste it into gmaps2gpx, and download the GPX file. It works with shortened links, dragged routes, and via-points.",
          },
        },
        {
          "@type": "Question",
          name: "How do I convert Google Maps directions to GPX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: 'Open Google Maps, create your route, click Share, and copy the link. Then go to gmaps2gpx.vercel.app, paste the URL, choose your travel mode, and click Convert. You can preview the route on the map, select from alternative routes, and download the GPX file.',
          },
        },
        {
          "@type": "Question",
          name: "How do I export a Google Maps route to my Garmin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Convert your Google Maps route to GPX using gmaps2gpx, then import the GPX file into Garmin Connect (web or app). From Garmin Connect, send the course to your Garmin device. This works with all Garmin devices including Edge cycling computers, Fenix watches, and automotive GPS units.",
          },
        },
        {
          "@type": "Question",
          name: "Does the GPX file include elevation data?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The GPX file includes precise GPS coordinates (latitude and longitude) for every point along the route. Elevation data depends on the Google API response. For full elevation profiles, you can open the GPX file in gpx.studio (one-click from gmaps2gpx) which automatically adds elevation data from SRTM datasets.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best Google Maps to GPX converter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "gmaps2gpx is a free, modern Google Maps to GPX converter that supports all travel modes including motorcycle/two-wheeler routing, alternative route selection with map preview, shortened URLs, dragged routes, and one-click editing in gpx.studio. It is also available as a CLI tool (pip install gmaps2gpx) for batch conversion.",
          },
        },
        {
          "@type": "Question",
          name: "Does Google Maps support GPX files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Google Maps does not natively import or export GPX files. However, you can convert Google Maps routes to GPX using gmaps2gpx, and import GPX files into Google My Maps (maps.google.com/mymaps) by uploading them as a new layer.",
          },
        },
        {
          "@type": "Question",
          name: "Is gmaps2gpx free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, gmaps2gpx is 100% free with no hidden fees, no signup required, and no usage limits. Both the web app and the CLI tool (pip install gmaps2gpx) are free and open source.",
          },
        },
        {
          "@type": "Question",
          name: "What GPS devices and apps are compatible with GPX files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GPX is a universal GPS format supported by virtually all GPS devices and apps including: Garmin (Edge, Fenix, Forerunner, Zumo), Wahoo (ELEMNT, ROAM), Bryton, Suunto, Strava, Komoot, AllTrails, OsmAnd, Ride with GPS, Wikiloc, Gaia GPS, Google Earth, and many more.",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert a shortened Google Maps link?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. gmaps2gpx automatically resolves shortened Google Maps links (maps.app.goo.gl/... format). Just paste the shortened URL directly — no need to expand it first.",
          },
        },
        {
          "@type": "Question",
          name: "Does gmaps2gpx support motorcycle or two-wheeler routing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. gmaps2gpx supports motorcycle/two-wheeler routing via the Google Routes API. This is especially useful in India and Southeast Asia where two-wheeler routes differ from car routes. Select 'Motorcycle' mode before converting.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between GPX and KML?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GPX (GPS Exchange Format) is the standard format for GPS devices and fitness apps. KML (Keyhole Markup Language) is Google's format used in Google Earth and Google My Maps. GPX is more widely supported by GPS hardware (Garmin, Wahoo, Suunto), while KML is better for visualization in Google products. gmaps2gpx outputs GPX 1.1, the most compatible format.",
          },
        },
        {
          "@type": "Question",
          name: "Is my route data stored on the server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. gmaps2gpx processes your route in real-time and does not store any route data, URLs, or personal information on the server. Your privacy is fully protected.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
