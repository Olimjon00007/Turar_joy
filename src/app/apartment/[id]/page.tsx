import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { 
  MapPin, 
  BedDouble, 
  Square, 
  CheckCircle2, 
  Building, 
  Users, 
  Dog, 
  Cigarette, 
  Calendar, 
  Phone,
  LayoutDashboard,
  ShieldCheck,
  Trash2,
  Home,
  Info,
  Clock,
  Edit
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { deleteApartment } from "@/lib/actions";
import Link from "next/link";

export default async function ApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Admin Session Check
  const sessionCookie = (await cookies()).get("session")?.value;
  let isAdmin = false;
  if (sessionCookie) {
    try {
      await decrypt(sessionCookie);
      isAdmin = true;
    } catch (e) {}
  }

  // 2. Await params (Next.js 15+)
  const { id } = await params;

  let apartment: any = await prisma.apartment.findUnique({
    where: { id },
    include: { images: true }
  });

  // Fallback to Mock Data if not in DB
  if (!apartment) {
    const { mockProperties } = await import("@/lib/mock-data");
    const mockProp = mockProperties.find(p => p.id === id);
    if (mockProp) {
      apartment = {
        ...mockProp,
        monthlyRent: mockProp.price, // Map this so formatPrice doesn't return NaN
        address: `${mockProp.district}, M.Tiklanish ko'chasi, 12-uy`,
        floor: 4,
        description: "Yaqinda evro-remontdan chiqqan, barcha qulayliklarga ega shinam xonadon. Markaziy issiqlik tizimi, konditsioner, internet va mebellar mavjud. Atrofda maktab, bog'cha va supermarketlar bor. Kvartira faqat ozoda, tartibli fuqarolarga ijaraga beriladi.",
        tenantRequirements: "Oilali yoki ishlaydigan insonlar",
        petsAllowed: false,
        smokingAllowed: false,
        minRentalTerm: "6 oy",
        extraRequirements: "Kechki soat 23:00 dan keyin shovqin qilmaslik talab etiladi.",
        images: [
          { url: mockProp.image },
          { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop" }
        ],
        createdAt: new Date()
      };
    }
  }

  if (!apartment) return notFound();

  const imageUrls = apartment.images?.map((img: any) => img.url).filter(Boolean);
  if (imageUrls.length === 0) {
    imageUrls.push("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop");
  }

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 py-10 pb-24">
      


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* ═══════════════ LEFT COLUMN ═══════════════ */}
        <div className="lg:col-span-2 space-y-10">

          {/* Gallery */}
          <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100/50">
            <ImageGallery images={imageUrls} />
          </div>

          {/* Title & Status badges */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
                Yangi e'lon
              </span>
              {apartment.isVerified && (
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                  <ShieldCheck size={13}/> Tasdiqlangan
                </span>
              )}
              {apartment.isPublished && (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
                  Nashr etilgan
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.1]">
              {apartment.title}
            </h1>
          </div>
            
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap gap-3 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl shadow-sm text-gray-700 font-medium">
              <MapPin size={18} className="text-primary" />
              {apartment.district}
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl shadow-sm text-gray-700 font-medium">
              <BedDouble size={18} className="text-primary" />
              {apartment.rooms} xona
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl shadow-sm text-gray-700 font-medium">
              <Square size={18} className="text-primary" />
              {apartment.area} m²
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl shadow-sm text-gray-700 font-medium">
              <LayoutDashboard size={18} className="text-primary" />
              {apartment.floor}-qavat
            </div>
          </div>

          {/* Full Address */}
          <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-primary shrink-0">
              <Home size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">To'liq manzil</p>
              <p className="font-semibold text-gray-800">{apartment.address}</p>
            </div>
          </div>

          {/* Description */}
          {apartment.description && apartment.description !== "Tavsif berilmagan" && (
            <div className="space-y-4 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3">
                <Info size={20} className="text-primary"/>
                <h2 className="text-xl font-extrabold tracking-tight">Tavsif</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-[1rem] whitespace-pre-wrap">
                {apartment.description}
              </p>
            </div>
          )}

          {/* Requirements */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-premium space-y-8">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Ijaraga berish talablari</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">Uy egasi tomonidan belgilangan shartlar</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Tenant Requirements */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-primary shrink-0">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kimlarga ruxsat</p>
                  <p className="font-bold text-gray-800">{apartment.tenantRequirements || "Belgilanmagan"}</p>
                </div>
              </div>

              {/* Min Rental Term */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-primary shrink-0">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Minimal muddat</p>
                  <p className="font-bold text-gray-800">{apartment.minRentalTerm || "Kelishuv asosida"}</p>
                </div>
              </div>

              {/* Pets */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-primary shrink-0">
                  <Dog size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Uy hayvonlari</p>
                  <p className={`font-bold ${apartment.petsAllowed ? "text-green-600" : "text-red-500"}`}>
                    {apartment.petsAllowed ? "✓ Ruxsat etiladi" : "✗ Man etiladi"}
                  </p>
                </div>
              </div>

              {/* Smoking */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-primary shrink-0">
                  <Cigarette size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Chekish</p>
                  <p className={`font-bold ${apartment.smokingAllowed ? "text-green-600" : "text-red-500"}`}>
                    {apartment.smokingAllowed ? "✓ Ruxsat etiladi" : "✗ Man etiladi"}
                  </p>
                </div>
              </div>

            </div>

            {/* Extra Requirements */}
            {apartment.extraRequirements && (
              <div className="pt-6 border-t border-gray-100">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 border-l-4 border-l-amber-400">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Qo'shimcha shartlar</p>
                  <p className="text-amber-900 font-semibold leading-relaxed">"{apartment.extraRequirements}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Clock size={14}/>
            E'lon sanasi: {new Date(apartment.createdAt).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

        </div>

        {/* ═══════════════ RIGHT SIDEBAR ═══════════════ */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Price Widget */}
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] border border-gray-100 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
              
              <div className="relative z-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Oylik ijara narxi</p>
                <p className="text-4xl font-extrabold text-gray-900 tracking-tighter">
                  {formatPrice(apartment.monthlyRent)}
                </p>
                <p className="text-sm text-gray-400 font-medium mt-1">/ 1 oy uchun</p>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-3 text-sm text-green-700 font-bold bg-green-50 p-3 rounded-xl border border-green-100">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  Bu uy tekshirilgan va tasdiqlangan
                </div>
                
                <button className="w-full bg-primary hover:bg-gray-800 text-white py-4 rounded-xl font-bold shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 group">
                  <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                  Uy egasi bilan bog'lanish
                </button>
                
                <p className="text-center text-xs text-gray-400 font-medium">
                  ID: APT-{apartment.id.substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Info Summary Widget */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-widest">Qisqacha ma'lumot</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Tuman</span>
                  <span className="font-bold text-gray-800">{apartment.district}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Xonalar</span>
                  <span className="font-bold text-gray-800">{apartment.rooms} ta</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Maydon</span>
                  <span className="font-bold text-gray-800">{apartment.area} m²</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Qavat</span>
                  <span className="font-bold text-gray-800">{apartment.floor}-qavat</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Hayvonlar</span>
                  <span className={`font-bold ${apartment.petsAllowed ? "text-green-600" : "text-red-500"}`}>
                    {apartment.petsAllowed ? "Ruxsat" : "Man etilgan"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 font-medium">Chekish</span>
                  <span className={`font-bold ${apartment.smokingAllowed ? "text-green-600" : "text-red-500"}`}>
                    {apartment.smokingAllowed ? "Ruxsat" : "Man etilgan"}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gray-50/80 p-5 rounded-3xl flex items-center gap-4 border border-gray-100">
              <div className="w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-700 border border-gray-100">
                <Building size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Safe Deal Kafolati</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Hujjatlar tekshirilgan</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
