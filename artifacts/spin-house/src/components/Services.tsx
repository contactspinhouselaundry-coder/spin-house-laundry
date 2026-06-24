import { motion } from "framer-motion";
import { Sparkles, Wind, Eraser, Layers, Footprints, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { lang } = useLanguage();

  const title = { en: "Our Services", ar: "خدماتنا" };
  const subtitle = {
    en: "Professional care for all your fabrics",
    ar: "عناية احترافية بجميع أنواع الأقمشة"
  };

  const services = [
    {
      icon: Sparkles,
      title: { en: "Dry Cleaning", ar: "غسيل جاف" },
      desc: {
        en: "Premium dry cleaning for suits, abayas, thobes, and delicate fabrics.",
        ar: "تنظيف جاف فاخر للبدل والعبايات والثياب والأقمشة الحساسة."
      }
    },
    {
      icon: Wind,
      title: { en: "Steam Cleaning", ar: "غسيل بالبخار" },
      desc: {
        en: "Professional steam treatment to refresh garments and remove tough wrinkles.",
        ar: "معالجة بالبخار الاحترافي لتجديد الملابس وإزالة التجاعيد."
      }
    },
    {
      icon: Eraser,
      title: { en: "Stain Removal", ar: "إزالة البقع" },
      desc: {
        en: "Expert stain removal techniques for all fabric types without damage.",
        ar: "تقنيات احترافية لإزالة البقع من جميع أنواع الأقمشة بأمان."
      }
    },
    {
      icon: Layers,
      title: { en: "Blanket Washing", ar: "غسيل البطانيات" },
      desc: {
        en: "Large-capacity washing for comforters, duvets, and heavy blankets.",
        ar: "غسيل بسعة كبيرة للبطانيات والألحفة الثقيلة."
      }
    },
    {
      icon: Footprints,
      title: { en: "Shoe Cleaning", ar: "غسيل الأحذية" },
      desc: {
        en: "Deep cleaning and restoration for sneakers, dress shoes, and all footwear.",
        ar: "تنظيف عميق وتجديد لجميع أنواع الأحذية."
      }
    },
    {
      icon: Zap,
      title: { en: "Express Laundry Service", ar: "خدمة الغسيل السريع" },
      desc: {
        en: "Same-day express washing and ironing — ready when you need it most.",
        ar: "غسيل وكي سريع في نفس اليوم — جاهز عندما تحتاجه."
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title[lang]}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle[lang]}</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300 group"
                data-testid={`card-service-${index}`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title[lang]}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc[lang]}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
