# gmaps2gpx

Convert Google Maps direction URLs to GPX files — via web or CLI.

**Web app**: [gmaps2gpx.vercel.app](https://gmaps2gpx.vercel.app)
**CLI**: `pip install gmaps2gpx`
**PyPI**: [pypi.org/project/gmaps2gpx](https://pypi.org/project/gmaps2gpx/)

## Features

- **Shortened URLs** — Paste `maps.app.goo.gl` links directly
- **Dragged routes** — Preserves via-points when you drag a route on Google Maps
- **Motorcycle mode** — Two-wheeler routing via Google Routes API (great for India/SE Asia)
- **Alternative routes** — `--shortest` picks the shortest route by distance
- **Batch convert** — Pass multiple URLs at once
- **All travel modes** — driving, walking, bicycling, transit, motorcycle
- **Web app** — Dark-themed UI with map preview and one-click GPX download

## Web App

The web app is built with Next.js and deployed on Vercel. Paste any Google Maps directions URL, pick a travel mode, and download the GPX.

### Run locally

```bash
npm install
echo 'GOOGLE_MAPS_API_KEY=your_key' > .env.local
npm run dev
```

### Deploy to Vercel

```bash
vercel deploy --prod
# Set GOOGLE_MAPS_API_KEY in Vercel project settings
```

## CLI

### Install

```bash
# From PyPI
pip install gmaps2gpx

# Or with pipx (recommended)
pipx install gmaps2gpx
```

### Setup

You need a Google Maps API key with **Directions API** enabled. For motorcycle mode, also enable the **Routes API**.

```bash
export GOOGLE_MAPS_API_KEY="your_key_here"
```

### Usage

```bash
# Basic
gmaps2gpx 'https://maps.app.goo.gl/abc123'

# Motorcycle mode
gmaps2gpx 'https://maps.app.goo.gl/abc123' -m motorcycle -o ride.gpx

# Shortest route from alternatives
gmaps2gpx 'https://maps.app.goo.gl/abc123' --shortest

# Batch convert
gmaps2gpx URL1 URL2 URL3
```

### Options

```
  -k, --api-key KEY       Google Maps API key (or set GOOGLE_MAPS_API_KEY env var)
  -o, --output FILE       output GPX filename (auto-generated if omitted)
  -m, --mode MODE         driving, walking, bicycling, transit, motorcycle
  -s, --shortest          fetch alternatives and pick the shortest by distance
```

## How it works

1. Resolves shortened Google Maps URLs
2. Parses origin, destination, waypoints, and dragged via-points from the URL
3. Calls Google Directions API (or Routes API for motorcycle mode)
4. Decodes polylines into GPS coordinates
5. Generates a GPX 1.1 file with track points and waypoint markers

## Project Structure

```
.
├── app/              # Next.js web app
├── components/       # React components (MapPreview)
├── lib/              # Server-side converter logic
├── pip-package/      # Python CLI package (published to PyPI)
│   ├── pyproject.toml
│   └── gmaps2gpx/
└── vercel.json
```

## License

MIT

## Author

Prajwal P
