import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Building2, CheckCircle2, Clock, Trash2, Edit } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function DashboardPage() {
  const apartments = await prisma.apartment.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Boshqaruvi</h1>
          <p className="text-gray-500 font-medium">Barcha e'lonlarni boshqarish va yangilarini qo'shish</p>
        </div>
        <Link 
          href="/admin/dashboard/add"
          className="bg-primary hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 w-fit shadow-premium"
        >
          <Plus size={20} />
          Yangi e'lon qo'shish
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Jami uylar</p>
            <p className="text-2xl font-extrabold">{apartments.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tasdiqlangan</p>
            <p className="text-2xl font-extrabold">
              {apartments.filter(a => a.isVerified).length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Nashr qilingan</p>
            <p className="text-2xl font-extrabold">
              {apartments.filter(a => a.isPublished).length}
            </p>
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-gray-100 shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Uy nomi</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tuman</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Narxi</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Holati</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {apartments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                    Hozircha hech qanday e'lon mavjud emas
                  </td>
                </tr>
              ) : (
                apartments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{apt.title}</div>
                      <div className="text-xs text-gray-400">{apt.rooms} xona • {apt.area} m²</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{apt.district}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatPrice(apt.monthlyRent)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {apt.isPublished ? (
                          <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase">Nashr etilgan</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full border border-gray-100 uppercase">Qoralama</span>
                        )}
                        {apt.isVerified && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase">Tasdiqlangan</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/edit/${apt.id}`}
                          className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"
                          title="Tahrirlash"
                        >
                          <Edit size={18} />
                        </Link>
                        <form action={async () => {
                          "use server";
                          const { deleteApartment } = await import("@/lib/actions");
                          await deleteApartment(apt.id);
                        }}>
                          <button
                            type="submit"
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                            title="O'chirish"
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
