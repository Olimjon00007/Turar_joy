import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import { ShieldCheck, Zap, Heart } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const dbProperties = await prisma.apartment.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { images: true }
  });

  // Map db properties to fit the card props or fallback to mock
  const featuredProperties = dbProperties.length > 0 
    ? dbProperties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.monthlyRent,
        district: p.district,
        rooms: p.rooms,
        area: p.area,
        image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
        isVerified: p.isVerified
      }))
    : mockProperties.slice(0, 10);

  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      
      {/* USP Section */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-sm border border-blue-100/50">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Tasdiqlangan uylar</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">Har bir e'lon bizning xodimlarimiz tomonidan shaxsan tekshiriladi.</p>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-sm border border-amber-100/50">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Tezkor ijara</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">Uy egalari bilan to'g'ridan-to'g'ri bog'laning va bir kunda ko'chib kiring.</p>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-sm border border-rose-100/50">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Stressiz hayot</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">Barcha hujjatlar va shartnomalar xavfsizligini biz kafolatlaymiz.</p>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-gray-900">Yangi e'lonlar</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Verified Premium Listings</p>
          </div>
          <Link href="/listings" className="text-primary font-bold hover:underline underline-offset-8 transition-all flex items-center gap-2">
            Barcha uylarni ko'rish →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </section>
    </div>
  );
}
