import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

export default function Reviews() {
  const { lang, isRtl } = useLanguage();

  const title = { en: "What Our Customers Say", ar: "ماذا يقول عملاؤنا" };

  const reviews = [
    {
      name: "Mohammed A.",
      text: { 
        en: "Excellent service! My suits came back looking brand new. The free pickup and delivery is a lifesaver for my busy schedule.", 
        ar: "خدمة ممتازة! عادت بدلاتي وكأنها جديدة. خدمة التوصيل المجانية أنقذتني بسبب جدولي المزدحم." 
      }
    },
    {
      name: "Fatima S.",
      text: { 
        en: "Very professional and punctual. They handled my delicate abayas with great care. Highly recommend Spin House!", 
        ar: "احترافية عالية ودقة في المواعيد. تعاملوا مع عباءاتي الحساسة بعناية فائقة. أوصي بشدة بمغسلة سبين هاوس!" 
      }
    },
    {
      name: "Ahmed K.",
      text: { 
        en: "The best laundry in Bahrain. Fast turnaround, great prices, and the clothes always smell amazingly fresh.", 
        ar: "أفضل مغسلة في البحرين. تسليم سريع، أسعار رائعة، والملابس دائماً رائحتها منعشة جداً." 
      }
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title[lang]}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/50 bg-white/60 backdrop-blur-lg hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg italic">"{review.text[lang]}"</p>
                  <div className="font-bold text-foreground">— {review.name}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
