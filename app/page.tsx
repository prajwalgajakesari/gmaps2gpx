"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Car,
  Motorbike,
  PersonStanding,
  Bus,
  Bike,
  Route,
  Download,
  ArrowRight,
  MapPin,
  Clock,
  Ruler,
  Waypoints,
  Loader2,
  ToggleLeft,
  ToggleRight,
  Terminal,
  ExternalLink,
  Github,
} from "lucide-react";

const MapPreview = dynamic(() => import("@/components/MapPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl glass flex items-center justify-center">
      <div className="flex items-center gap-3 text-zinc-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Loading map...</span>
      </div>
    </div>
  ),
});

interface RouteResult {
  gpx: string;
  points: [number, number][];
  waypoints: { lat: number; lng: number; name: string }[];
  distance: number;
  duration: number;
  routeName: string;
  alternatives?: { summary: string; distance: number; duration: number }[];
  chosenIndex?: number;
}

type TravelMode = "driving" | "walking" | "bicycling" | "transit" | "motorcycle";

const MODES: { value: TravelMode; label: string; icon: React.ElementType }[] = [
  { value: "driving", label: "Car", icon: Car },
  { value: "motorcycle", label: "Motorcycle", icon: Motorbike },
  { value: "bicycling", label: "Bicycle", icon: Bike },
  { value: "walking", label: "Walking", icon: PersonStanding },
  { value: "transit", label: "Transit", icon: Bus },
];

function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<TravelMode>("motorcycle");
  const [shortest, setShortest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RouteResult | null>(null);

  const handleConvert = useCallback(async () => {
    if (!url.trim()) {
      setError("Paste a Google Maps directions URL to get started");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const resp = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), mode, shortest }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Conversion failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url, mode, shortest]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result.gpx], { type: "application/gpx+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const safeName = result.routeName.replace(/[^\w\s-]/g, "_").slice(0, 60);
    a.download = `${safeName}.gpx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [result]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f8fafc] relative">
      <div className="ambient-glow" />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Route className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">gmaps2gpx</h1>
              <p className="text-xs text-zinc-500 leading-none mt-0.5">
                Google Maps to GPX
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://pypi.org/project/gmaps2gpx/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass glass-hover text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              pip install gmaps2gpx
            </a>
            <a
              href="https://github.com/prajwalp/gmaps2gpx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass glass-hover text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* ── URL Input ──────────────────────────────────────── */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-500" />
            Directions URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleConvert()}
                placeholder="https://maps.app.goo.gl/... or any Google Maps directions link"
                className="w-full px-4 py-3.5 rounded-xl glass text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200 font-mono"
              />
            </div>
            <button
              onClick={handleConvert}
              disabled={loading}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Converting
                </>
              ) : (
                <>
                  Convert
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Options ────────────────────────────────────────── */}
        <div className="flex flex-wrap items-end gap-6">
          {/* Travel Mode */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              Travel Mode
            </label>
            <div className="flex gap-1 p-1 rounded-xl glass">
              {MODES.map((m) => {
                const Icon = m.icon;
                const active = mode === m.value;
                return (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-emerald-600/90 text-white shadow-md shadow-emerald-600/20"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                    }`}
                    title={m.label}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shortest Toggle */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
              Route Selection
            </label>
            <button
              onClick={() => setShortest(!shortest)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                shortest
                  ? "glass text-emerald-400 border-emerald-500/20"
                  : "glass text-zinc-500 hover:text-zinc-300"
              }`}
              style={shortest ? { background: "rgba(34, 197, 94, 0.08)", borderColor: "rgba(34, 197, 94, 0.15)" } : {}}
            >
              {shortest ? (
                <ToggleRight className="w-5 h-5 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-5 h-5" />
              )}
              Pick shortest route
            </button>
          </div>
        </div>

        {/* ── Error ──────────────────────────────────────────── */}
        {error && (
          <div className="px-4 py-3.5 rounded-xl border border-red-500/15 bg-red-500/[0.06] text-red-400 text-sm flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            {error}
          </div>
        )}

        {/* ── Results ────────────────────────────────────────── */}
        {result && (
          <div className="space-y-5 animate-in">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Ruler, label: "Distance", value: formatDistance(result.distance) },
                { icon: Clock, label: "Duration", value: formatDuration(result.duration) },
                { icon: Waypoints, label: "Points", value: result.points.length.toLocaleString() },
                {
                  icon: MODES.find((m) => m.value === mode)?.icon || Car,
                  label: "Mode",
                  value: MODES.find((m) => m.value === mode)?.label || mode,
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass rounded-xl px-4 py-3.5"
                  >
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold uppercase tracking-widest">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-white tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download Bar */}
            <div className="flex items-center justify-between glass rounded-xl px-5 py-3.5">
              <div className="text-sm text-zinc-400 font-mono truncate mr-4">
                {result.routeName}
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 shrink-0"
              >
                <Download className="w-4 h-4" />
                Download GPX
              </button>
            </div>

            {/* Alternatives */}
            {result.alternatives && result.alternatives.length > 1 && (
              <div className="glass rounded-xl px-5 py-4 space-y-2.5">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Route className="w-3.5 h-3.5" />
                  {result.alternatives.length} routes found — shortest selected
                </div>
                <div className="space-y-1">
                  {result.alternatives.map((alt, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-xs py-1 ${
                        i === result.chosenIndex
                          ? "text-emerald-300 font-medium"
                          : "text-zinc-600"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          i === result.chosenIndex ? "bg-emerald-400" : "bg-zinc-700"
                        }`}
                      />
                      <span className="font-mono">{alt.summary}</span>
                      <span className="text-zinc-600">·</span>
                      <span>{formatDistance(alt.distance)}</span>
                      <span className="text-zinc-600">·</span>
                      <span>{formatDuration(alt.duration)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/[0.06]">
              <MapPreview points={result.points} waypoints={result.waypoints} />
            </div>
          </div>
        )}

        {/* ── Empty State ────────────────────────────────────── */}
        {!result && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 space-y-5">
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
              <MapPin className="w-7 h-7 text-zinc-600" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-zinc-500 text-sm">
                Paste a Google Maps directions URL to convert it to GPX
              </p>
              <p className="text-zinc-700 text-xs max-w-md">
                Supports shortened links, dragged routes, via-points, alternative routes, and two-wheeler mode
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-[11px] px-3 py-1.5 rounded-lg glass text-zinc-500 font-mono">
                pip install gmaps2gpx
              </code>
              <span className="text-zinc-700 text-xs">also available as CLI</span>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] mt-20">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            Built by{" "}
            <span className="text-zinc-500">Prajwal P</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-700">
            <span>Routes via Google Maps API</span>
            <span className="text-zinc-800">·</span>
            <span>Map tiles by OpenStreetMap</span>
            <a
              href="https://pypi.org/project/gmaps2gpx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              PyPI <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
