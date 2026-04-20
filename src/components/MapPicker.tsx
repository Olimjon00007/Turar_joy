"use client";

import { useState, useRef } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import { LocateFixed } from "lucide-react";

export default function MapPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [coords, setCoords] = useState<[number, number]>([40.7821, 72.3442]); // Andijan Center
  const mapRef = useRef<any>(null);

  const handleMapClick = (e: any) => {
    const newCoords = e.get("coords");
    setCoords(newCoords);
    onLocationSelect(newCoords[0], newCoords[1]);
  };

  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setCoords(userCoords);
          onLocationSelect(userCoords[0], userCoords[1]);
          if (mapRef.current) {
            mapRef.current.setCenter(userCoords, 15, { duration: 300 });
          }
        },
        (err) => {
          console.warn(err);
          alert("Joylashuvni avtomatik aniqlab bo'lmayapti. Brauzeringiz GPS ga ruxsat bermagan bo'lishi mumkin. Iltimos kartadan qo'lda belgilang.");
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="space-y-4 relative z-0">
      <div className="h-[300px] w-full rounded-2xl border border-gray-100 overflow-hidden relative">
        <YMaps query={{ lang: "uz_UZ", apikey: "" } as any}>
          <Map
            instanceRef={mapRef}
            defaultState={{ center: [40.7821, 72.3442], zoom: 13, controls: [] }}
            width="100%"
            height="100%"
            onClick={handleMapClick}
            options={{ maxZoom: 19 }}
          >
            {/* Zoom Controls */}
            <ZoomControl options={{ size: "small", position: { right: 10, top: 108 } }} />

            {/* Marker */}
            {coords && <Placemark geometry={coords} options={{ preset: 'islands#blueHomeIcon' }} />}
          </Map>
        </YMaps>

        {/* Locate Me Button */}
        <button
          type="button"
          onClick={locateUser}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100 hover:bg-white hover:scale-105 transition-all text-primary z-10 flex items-center justify-center"
          title="Mening joylashuvimni aniqlash"
        >
          <LocateFixed size={22} className="text-primary hover:animate-pulse" />
        </button>
      </div>
      <p className="text-xs text-gray-400 font-bold bg-muted p-3 rounded-xl">
        Karta ustiga bosing yoki xaritadagi "Nishon" (Lokatsiya) tugmasini bosing
      </p>
    </div>
  );
}
