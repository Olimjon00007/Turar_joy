"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Square, CheckCircle2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  district: string;
  rooms: number;
  area: number;
  image: string;
  isVerified?: boolean;
}

export default function PropertyCard({
  id,
  title,
  price,
  district,
  rooms,
  area,
  image,
  isVerified = true,
}: PropertyCardProps) {
  return (
    <Link
      href={`/apartment/${id}`}
      className="group block w-full bg-white rounded-[24px] overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_-6px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-all duration-300 border border-gray-100/80 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 rounded-t-[24px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
        />
        {isVerified && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-md text-gray-900 font-bold text-xs uppercase tracking-wide border border-white/40">
            <CheckCircle2 size={16} className="text-green-500" />
            Tasdiqlangan
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3 flex-grow bg-white">
        
        <div className="flex flex-col gap-1.5">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-extrabold tracking-tight text-gray-900 leading-none">
              {formatPrice(price)}
            </span>
            <span className="text-gray-500 text-[13px] font-medium">/ oy</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[15px] sm:text-[16px] text-gray-800 line-clamp-1 leading-snug mt-0.5 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 text-[13px] font-medium mt-0.5">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span className="truncate">{district}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-gray-600 text-[12px] sm:text-[13px] font-bold">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <BedDouble size={16} className="text-gray-300" />
            <span>{rooms} xona</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Square size={14} className="text-gray-300" />
            <span>{area} m²</span>
          </div>
        </div>

      </div>
    </Link>
  );
}
