import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import storefrontImg from "@assets/IMG_2916_1782056982839.jpeg";
import gallery3 from "@/assets/images/gallery-3.png";

export default function Gallery() {
  const { lang } = useLanguage();

  const title    = { en: "Our Gallery",                          ar: "معرض صورنا"              };
  const subtitle = { en: "A glimpse at Spin House Laundry",      ar: "نظرة على مغسلة سبين هاوس" };

  const images = [
    {
      src:      storefrontImg,
      alt:      { en: "Spin House Laundry — A'ali, Bahrain", ar: "مغسلة سبين هاوس — عالي، البحرين" },
      featured: true,
    },
    {
      src:      gallery3,
      alt:      { en: "Shoe Cleaning Service", ar: "خدمة تنظيف الأحذية" },
      featured: false,
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title[lang]}</h2>
          <p className="text-lg text-muted-foreground">{subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Featured storefront — full width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative md:col-span-2 aspect-[16/7] rounded-2xl overflow-hidden group"
            data-testid="img-gallery-featured"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <img
              src={images[0].src}
              alt={images[0].alt[lang]}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-semibold text-lg">{images[0].alt[lang]}</p>
            </div>
          </motion.div>

          {/* Shoe cleaning — centred single card on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden group md:col-start-1 md:col-end-2"
            data-testid="img-gallery-1"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <img
              src={images[1].src}
              alt={images[1].alt[lang]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-medium text-sm">{images[1].alt[lang]}</p>
            </div>
          </motion.div>

          {/* Placeholder CTA card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-blue-700 flex flex-col items-center justify-center text-center p-8"
            data-testid="img-gallery-cta"
          >
            <p className="text-white/80 text-sm font-medium mb-3 uppercase tracking-widest">
              {lang === "en" ? "Free Pickup & Delivery" : "استلام وتوصيل مجاني"}
            </p>
            <p className="text-white text-3xl font-extrabold leading-tight mb-6">
              {lang === "en" ? "Book your laundry today" : "احجز غسيلك اليوم"}
            </p>
            <a
              href="#book"
              className="bg-white text-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-blue-50 transition-colors"
              data-testid="link-gallery-cta"
            >
              {lang === "en" ? "Book Now" : "احجز الآن"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
