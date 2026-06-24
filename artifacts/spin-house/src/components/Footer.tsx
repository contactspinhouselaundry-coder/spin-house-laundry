import { WashingMachine } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang, isRtl } = useLanguage();

  const content = {
    tagline: { 
      en: "Premium laundry service with free pickup & delivery in Bahrain.", 
      ar: "خدمة غسيل مميزة مع توصيل مجاني في البحرين." 
    },
    quickLinks: { en: "Quick Links", ar: "روابط سريعة" },
    contact: { en: "Contact Info", ar: "معلومات التواصل" },
    rights: { 
      en: "© 2024 Spin House Laundry. All rights reserved.", 
      ar: "© 2024 مغسلة سبين هاوس. جميع الحقوق محفوظة." 
    }
  };

  const links = [
    { href: "#home", en: "Home", ar: "الرئيسية" },
    { href: "#services", en: "Services", ar: "الخدمات" },
    { href: "#pricing", en: "Pricing", ar: "الأسعار" },
    { href: "#gallery", en: "Gallery", ar: "معرض الصور" },
    { href: "#book", en: "Book Now", ar: "احجز الآن" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white mb-6">
              <WashingMachine className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">
                {lang === "en" ? "Spin House Laundry" : "مغسلة سبين هاوس"}
              </span>
            </div>
            <p className="text-slate-400 max-w-sm">
              {content.tagline[lang]}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="https://wa.me/97333157178" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/spinhouse_bh" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{content.quickLinks[lang]}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-primary transition-colors">
                    {link[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{content.contact[lang]}</h3>
            <ul className="space-y-3">
              <li dir="ltr" className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>+973 33157178</li>
              <li>@spinhouse_bh</li>
              <li>
                {lang === "en" 
                  ? "Building 421, Road 71, Block 738, A'ali, Bahrain" 
                  : "مبنى 421، طريق 71، مجمع 738، عالي، البحرين"}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>{content.rights[lang]}</p>
        </div>
      </div>
    </footer>
  );
}
