"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPreviewProps {
  points: [number, number][];
  waypoints: { lat: number; lng: number; name: string }[];
}

export default function MapPreview({ points, waypoints }: MapPreviewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || points.length === 0) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    });
    mapInstance.current = map;

    // Dark-toned map tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    // Route polyline with glow
    const latLngs = points.map(([lat, lng]) => L.latLng(lat, lng));

    // Outer glow
    L.polyline(latLngs, {
      color: "#22c55e",
      weight: 8,
      opacity: 0.15,
    }).addTo(map);

    // Main line
    const polyline = L.polyline(latLngs, {
      color: "#22c55e",
      weight: 3,
      opacity: 0.9,
    }).addTo(map);

    // Markers
    const startIcon = L.divIcon({
      html: '<div style="background:#22c55e;width:12px;height:12px;border-radius:50%;border:2.5px solid #0a0a0a;box-shadow:0 0 0 2px #22c55e,0 2px 8px rgba(34,197,94,0.4)"></div>',
      iconSize: [17, 17],
      iconAnchor: [8, 8],
      className: "",
    });

    const endIcon = L.divIcon({
      html: '<div style="background:#ef4444;width:12px;height:12px;border-radius:50%;border:2.5px solid #0a0a0a;box-shadow:0 0 0 2px #ef4444,0 2px 8px rgba(239,68,68,0.4)"></div>',
      iconSize: [17, 17],
      iconAnchor: [8, 8],
      className: "",
    });

    const midIcon = L.divIcon({
      html: '<div style="background:#f59e0b;width:8px;height:8px;border-radius:50%;border:2px solid #0a0a0a;box-shadow:0 0 0 1.5px #f59e0b"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      className: "",
    });

    waypoints.forEach((wp, i) => {
      const icon =
        i === 0 ? startIcon : i === waypoints.length - 1 ? endIcon : midIcon;
      L.marker([wp.lat, wp.lng], { icon })
        .bindPopup(
          `<div style="font-family:var(--font-sans),system-ui;font-size:12px;font-weight:500">${wp.name}</div>`
        )
        .addTo(map);
    });

    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [points, waypoints]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[420px]"
      style={{ background: "#0f172a" }}
    />
  );
}
