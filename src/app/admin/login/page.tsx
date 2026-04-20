"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      await loginAction(formData);
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 bg-muted/40">
      <div className="max-w-md w-full bg-white p-10 rounded-[var(--radius-lg)] shadow-premium border border-gray-100 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Tizimi</h1>
          <p className="text-sm text-gray-500 font-medium">
            Faqat vakolatli shaxslar uchun kirish
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Foydalanuvchi nomi</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 bg-muted border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              placeholder="Olimjon"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Parol</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-muted border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-gray-800 text-white py-4 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Tizimga kirish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
