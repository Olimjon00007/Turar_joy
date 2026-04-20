import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { districts } from "@/lib/mock-data";
import { updateApartment } from "@/lib/actions";
import { 
  Building2, MapPin, DollarSign, Bed, 
  Square, Info, UserCheck, Image as ImageIcon,
  CheckCircle2, ChevronLeft, Loader2
} from "lucide-react";
import Link from "next/link";

export default async function EditApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apt = await prisma.apartment.findUnique({
    where: { id },
    include: { images: true }
  });

  if (!apt) return notFound();

  // Parse existing address pieces from stored address
  // Format: "Tuman tumani, Neighborhood, HouseNumber"
  const addressParts = apt.address?.split(",").map(p => p.trim()) || [];
  const neighborhood = addressParts[1] || "";
  const houseNumber = addressParts[2] || "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-bold text-primary group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Dashboardga qaytish
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">E'lonni tahrirlash</h1>
        <p className="text-gray-500 font-medium">Quyidagi ma'lumotlarni o'zgartirib, saqlang.</p>
      </div>

      <form action={updateApartment} className="space-y-12 pb-24">
        {/* Hidden ID */}
        <input type="hidden" name="id" value={apt.id} />

        {/* Section: Basic Info */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Building2 className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Asosiy ma'lumotlar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sarlavha</label>
              <input 
                name="title" 
                type="text" 
                defaultValue={apt.title}
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aholi punkti / MFY / Hudud</label>
              <input 
                name="neighborhood" 
                type="text" 
                defaultValue={neighborhood}
                placeholder="Masalan: Asaka markazi"
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Uy va Xonadon raqami</label>
              <input 
                name="houseNumber" 
                type="text" 
                defaultValue={houseNumber}
                placeholder="Masalan: 12-dom, 45-xona"
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Oylik ijara (so'm)</label>
              <div className="relative">
                <input 
                  name="price" 
                  type="number" 
                  defaultValue={apt.monthlyRent}
                  className="w-full bg-muted border-none rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
                />
                <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tuman</label>
              <select name="district" defaultValue={apt.district} className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium capitalize">
                <option value="">Tanlang</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Xonalar soni</label>
              <input 
                name="rooms" 
                type="number" 
                defaultValue={apt.rooms}
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Umumiy maydon (m²)</label>
              <input 
                name="area" 
                type="number" 
                defaultValue={apt.area}
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>
          </div>
        </section>

        {/* Section: Requirements */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <UserCheck className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Ijaraga berish talablari</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ijarachilar toifasi</label>
              <input 
                name="tenantRequirements" 
                type="text" 
                defaultValue={apt.tenantRequirements ?? ""}
                placeholder="Masalan: Faqat oila uchun"
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>

            <div className="flex items-center gap-2">
              <input name="petsAllowed" type="checkbox" defaultChecked={apt.petsAllowed ?? false} className="w-5 h-5 accent-primary" id="pets" />
              <label htmlFor="pets" className="text-sm font-bold text-gray-600">Uy hayvonlariga ruxsat</label>
            </div>

            <div className="flex items-center gap-2">
              <input name="smokingAllowed" type="checkbox" defaultChecked={apt.smokingAllowed ?? false} className="w-5 h-5 accent-primary" id="smoking" />
              <label htmlFor="smoking" className="text-sm font-bold text-gray-600">Chekishga ruxsat</label>
            </div>
          </div>
        </section>

        {/* Section: Extra Details */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Info className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Qo'shimcha tafsilotlar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Minimal muddat</label>
              <input 
                name="minRentalTerm" 
                type="text" 
                defaultValue={apt.minRentalTerm ?? ""}
                placeholder="6 oy"
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Qavat</label>
              <input 
                name="floor" 
                type="number" 
                defaultValue={apt.floor ?? ""}
                placeholder="4"
                className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tavsif</label>
            <textarea 
              name="description" 
              rows={4} 
              defaultValue={apt.description ?? ""}
              className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium resize-none" 
              placeholder="Uy haqida batafsil ma'lumot..."
            />
          </div>
        </section>

        {/* Section: Image */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <ImageIcon className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Rasm (ixtiyoriy yangilash)</h2>
          </div>

          {/* Current image preview */}
          {apt.images?.[0]?.url && (
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-48 relative">
              <img src={apt.images[0].url} alt="Hozirgi rasm" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs font-bold py-2 px-4 backdrop-blur-sm">
                Hozirgi rasm — yangi rasm yuklamasangiz, shu qoladi
              </div>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center space-y-3 hover:border-primary transition-colors cursor-pointer relative">
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto text-gray-400">
              <ImageIcon size={28} />
            </div>
            <p className="text-sm font-bold text-gray-500">Yangi rasm tanlash (ixtiyoriy)</p>
            <p className="text-xs text-gray-400">JPG, PNG — yuklamasangiz eski rasm saqlanadi</p>
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-grow bg-primary hover:bg-gray-800 text-white py-5 rounded-2xl font-extrabold shadow-xl transition-all transform active:scale-95 text-lg flex items-center justify-center gap-3"
          >
            <CheckCircle2 size={22} />
            O'zgarishlarni saqlash
          </button>
          <Link 
            href="/admin/dashboard" 
            className="px-8 py-5 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Bekor qilish
          </Link>
        </div>
      </form>
    </div>
  );
}
