"use client";

import { useState } from "react";
import { districts } from "@/lib/mock-data";
import PropertyCard from "@/components/PropertyCard";
import { SlidersHorizontal, MapPin } from "lucide-react";

export default function ListingsClient({ initialData }: { initialData: any[] }) {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filteredProperties = selectedDistrict 
    ? initialData.filter(p => p.district === selectedDistrict)
    : initialData;

  return (
    <div className="flex flex-col md:flex-row gap-12">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-10 flex-shrink-0">
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <SlidersHorizontal size={20} className="text-gray-900" />
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Filtrlar</h2>
        </div>

        {/* District Filter */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <MapPin size={16} /> Tuman
          </h3>
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-muted border-none rounded-2xl px-4 py-4 outline-none focus:ring-4 focus:ring-gray-200 text-sm font-bold text-gray-700 cursor-pointer transition-all"
          >
            <option value="">Barcha tumanlar</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => setSelectedDistrict("")}
          className="w-full bg-white border border-gray-200 text-gray-600 hover:text-gray-900 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all text-sm"
        >
          Filtrni tozalash
        </button>
      </aside>

      {/* Listings Grid */}
      <main className="flex-grow space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 p-6 rounded-[2rem]">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {selectedDistrict ? `${selectedDistrict} uylari` : "Barcha e'lonlar"}
          </h1>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm font-bold">
              <span className="text-gray-900">{filteredProperties.length}</span> ta natija
            </p>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-gray-100 border-dashed">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Afsuski, uylar topilmadi</h3>
            <p className="text-gray-500 font-medium">Bu tumanda hozircha ijaraga uylar yo'q. Boshqa tumanlarni ko'ring.</p>
            <button 
              onClick={() => setSelectedDistrict("")}
              className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              Barcha uylarni ko'rish
            </button>
          </div>
        )}
      </main>

    </div>
  );
}
