import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs() {
  const { lang } = useLanguage();

  const title = { en: "Why Choose Us?", ar: "لماذا تختارنا؟" };

  const features = [
    {
      icon: Truck,
      title: { en: "Free Pickup & Delivery", ar: "توصيل واستلام مجاني" },
      desc: { en: "Right from your doorstep anywhere in Bahrain.", ar: "مباشرة من باب منزلك في أي مكان في البحرين." }
    },
    {
      icon: Clock,
      title: { en: "24h Turnaround", ar: "تسليم خلال 24 ساعة" },
      desc: { en: "Fast, reliable service when you need it most.", ar: "خدمة سريعة وموثوقة عندما تحتاجها بشدة." }
    },
    {
      icon: ShieldCheck,
      title: { en: "Professional Care", ar: "عناية احترافية" },
      desc: { en: "Expert fabric handling and stain removal.", ar: "التعامل بخبرة مع الأقمشة وإزالة البقع." }
    },
    {
      icon: ThumbsUp,
      title: { en: "100% Satisfaction", ar: "ضمان الرضا 100%" },
      desc: { en: "We re-wash for free if you're not completely happy.", ar: "نعيد الغسيل مجاناً إذا لم تكن راضياً تماماً." }
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwN0FFNiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48L2NpcmNsZT4KPC9zdmc+')] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title[lang]}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title[lang]}</h3>
                <p className="text-blue-100">{feature.desc[lang]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
