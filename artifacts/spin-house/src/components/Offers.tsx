import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Offers() {
  const { lang } = useLanguage();

  return (
    <section id="offers" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            {lang === "en" ? "Special Offer" : "عرض خاص"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {lang === "en" ? "Clean Shoes, New Steps!" : "حذاء نظيف... وخطوات جديدة!"}
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            {lang === "en"
              ? "Clean 2 pairs — get the 3rd pair FREE"
              : "نظّف زوجين واحصل على الزوج الثالث مجاناً"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-xl rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/20"
        >
          <img
            src="/promo-shoes.png"
            alt={
              lang === "en"
                ? "Spin House shoe cleaning special offer — 1.2 BD per pair, clean 2 get 3rd free"
                : "عرض خاص لتنظيف الأحذية — 1.2 دينار للزوج، نظّف زوجين واحصل على الثالث مجاناً"
            }
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/97333157178?text=Hi%2C%20I'd%20like%20to%20book%20the%20shoe%20cleaning%20offer%20(2%2B1%20free)"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-full text-base transition-colors shadow-lg"
            data-testid="link-offers-whatsapp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.855L.057 23.786a.5.5 0 0 0 .614.641l6.094-1.598A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.166-1.418l-.37-.22-3.827 1.004 1.021-3.727-.242-.384A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            {lang === "en" ? "Book Shoe Cleaning" : "احجز تنظيف الأحذية"}
          </a>
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-full text-base transition-colors"
            data-testid="link-offers-book"
          >
            {lang === "en" ? "Book Other Services" : "احجز خدمات أخرى"}
          </a>
        </div>
      </div>
    </section>
  );
}
