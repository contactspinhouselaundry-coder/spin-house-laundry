import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import heroImg from "@assets/IMG_2916_1782056982839.jpeg";

export default function Hero() {
  const { lang, isRtl } = useLanguage();

  const content = {
    en: {
      headline: "Spin House Laundry",
      subtext: "Free Pickup & Delivery in A'ali",
      book: "Book on WhatsApp",
      services: "Our Services"
    },
    ar: {
      headline: "مغسلة سبين هاوس",
      subtext: "توصيل واستلام مجاني في عالي",
      book: "احجز عبر واتساب",
      services: "خدماتنا"
    }
  };

  return (
    <section id="home" className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Spin House Laundry Storefront" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
            {content[lang].headline}
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 font-medium mb-10 drop-shadow">
            {content[lang].subtext}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg h-14 px-8 bg-green-600 hover:bg-green-700 text-white border-0"
              asChild
              data-testid="button-hero-whatsapp"
            >
              <a href="#book">
                {content[lang].book}
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto text-lg h-14 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
              asChild
              data-testid="button-hero-services"
            >
              <a href="#services">
                {content[lang].services}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <a href="#services" aria-label="Scroll down">
          <ChevronDown className="h-10 w-10" />
        </a>
      </motion.div>
    </section>
  );
}
