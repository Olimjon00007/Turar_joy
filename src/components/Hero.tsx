"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { districts } from "../lib/mock-data";

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-300/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 w-full text-center space-y-8 md:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Stressiz ijara <br /> 
            <span className="text-primary italic font-serif">vaqtidir</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-medium">
            O'zbekistondagi eng ishonchli va tasdiqlangan xonadonlar platformasi. 
            Firibgarliksiz, ortiqcha ovvoragarchiliksiz uy toping.
          </p>
        </motion.div>



        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 text-sm"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">500+</span>
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Tasdiqlangan uylar</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">12k+</span>
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Baxtli ijarachilar</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-gray-900">100%</span>
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Xavfsiz bitim</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
