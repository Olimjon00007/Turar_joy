"use client";

import { useState } from "react";
import { districts } from "@/lib/mock-data";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Bed, 
  Square, 
  Info, 
  UserCheck, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronLeft,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { createApartment } from "@/lib/actions";

export default function AddApartmentPage() {
  const [loading, setLoading] = useState(false);
  const [filesArray, setFilesArray] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    
    setFilesArray(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    
    // Clear input so same file can be selected again
    e.target.value = '';
  }

  function removeImage(index: number) {
    setFilesArray(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.delete("images");
    filesArray.forEach(file => formData.append("images", file));
    await createApartment(formData);
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-bold text-primary group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Dashboardga qaytish
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Yangi e'lon qo'shish</h1>
      </div>

      <form action={createApartment} onSubmit={handleSubmit} className="space-y-12 pb-24">

        {/* Section: Basic Info */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Building2 className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Asosiy ma'lumotlar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sarlavha</label>
              <input name="title" type="text" placeholder="Masalan: Yunusobodda 3 xonali uy ijarasi" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aholi punkti / MFY / Hudud</label>
              <input name="neighborhood" type="text" placeholder="Masalan: Qo'rg'ontepa markazi" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Uy va Xonadon raqami</label>
              <input name="houseNumber" type="text" placeholder="Masalan: 12-dom, 45-xona" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Oylik ijara (so'm)</label>
              <div className="relative">
                <input name="price" type="number" placeholder="6000000" className="w-full bg-muted border-none rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
                <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tuman</label>
              <select name="district" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium capitalize">
                <option value="">Tanlang</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Xonalar soni</label>
              <input name="rooms" type="number" placeholder="2" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Umumiy maydon (m²)</label>
              <input name="area" type="number" placeholder="60" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
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
              <input name="tenantRequirements" type="text" placeholder="Masalan: Faqat oila uchun" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>

            <div className="flex items-center gap-2">
              <input name="petsAllowed" type="checkbox" className="w-5 h-5 accent-primary" id="pets" />
              <label htmlFor="pets" className="text-sm font-bold text-gray-600">Uy hayvonlariga ruxsat</label>
            </div>

            <div className="flex items-center gap-2">
              <input name="smokingAllowed" type="checkbox" className="w-5 h-5 accent-primary" id="smoking" />
              <label htmlFor="smoking" className="text-sm font-bold text-gray-600">Chekishga ruxsat</label>
            </div>
          </div>
        </section>

        {/* Custom fields needed for submission */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <Info className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Qo'shimcha tafsilotlar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Minimal muddat</label>
              <input name="minRentalTerm" type="text" placeholder="6 oy" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Qavat</label>
              <input name="floor" type="number" placeholder="4" className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tavsif (Description)</label>
            <textarea name="description" rows={4} className="w-full bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-medium resize-none" placeholder="Uy haqida batafsil ma'lumot..."></textarea>
          </div>
        </section>

        {/* Map Section Removed */}

        {/* Section: Media */}
        <section className="bg-white p-8 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <ImageIcon className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Rasmlar</h2>
          </div>
          {/* Image upload zone */}
          <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center relative">
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            {previews.length === 0 ? (
              <label htmlFor="image-upload" className="block cursor-pointer space-y-3 hover:text-primary transition-colors">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-gray-400 hover:text-primary transition-colors">
                  <ImageIcon size={32} />
                </div>
                <p className="text-sm font-bold text-gray-500 hover:text-primary transition-colors">Rasmlarni shu yerga tashlang yoki ustiga bosing</p>
                <p className="text-xs text-gray-400">Ko'p rasm tanlash mumkin (JPG, PNG)</p>
              </label>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {previews.map((p, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <div className="absolute bottom-1 left-1 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Asosiy</div>
                      )}
                      <button 
                        type="button" 
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center gap-3 pt-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 size={18} />
                    <p className="text-sm font-bold">{previews.length} ta rasm tanlandi.</p>
                  </div>
                  <label htmlFor="image-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
                    + Yana rasm qo'shish
                  </label>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-grow bg-primary hover:bg-gray-800 text-white py-5 rounded-2xl font-extrabold shadow-xl transition-all transform active:scale-95 text-lg disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : "E'lonni tasdiqlash uchun yuborish"}
          </button>
          <button type="button" className="px-10 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-colors">
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
}
