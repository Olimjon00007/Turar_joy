import Link from "next/link";
import { Building2, Globe, Send, Share2, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-muted mt-24 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="font-bold text-lg">Rent Without Stress</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            O'zbekistondagi uylarni ishonchli va xavfsiz ijara berish platformasi. Biz firibgarliksiz kelajakni quramiz.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Kompaniya</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li><Link href="/about" className="hover:text-primary transition-colors">Biz haqimizda</Link></li>
            <li><Link href="/listings" className="hover:text-primary transition-colors">Barcha uylar</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Aloqa</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Yordam</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li><Link href="/faq" className="hover:text-primary transition-colors">Savol-javoblar</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Maxfiylik siyosati</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Foydalanish shartlari</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900">Aloqa markazi</h4>
          <div className="space-y-3">
            <a href="tel:+998901234567" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors">
              <Phone size={18} className="text-primary" />
              +998 90 123 45 67
            </a>
            <a href="mailto:info@rentstress.uz" className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors">
              <Mail size={18} className="text-primary" />
              info@rentstress.uz
            </a>
          </div>
          <div className="flex gap-4">
            <Globe size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            <Send size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            <Share2 size={20} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 2xl:px-16 mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Rent Without Stress. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
