import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Tab = "ironing" | "wash" | "dry";

export default function Pricing() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("ironing");

  const title = { en: "Pricing", ar: "الأسعار" };
  const subtitle = { en: "Simple, transparent pricing. No hidden fees.", ar: "أسعار بسيطة وشفافة. بدون رسوم خفية." };
  const note = { en: "Free pickup & delivery on all orders", ar: "توصيل واستلام مجاني لجميع الطلبات" };

  const tabs: { id: Tab; en: string; ar: string }[] = [
    { id: "ironing", en: "Ironing & Steam", ar: "كي وبخار" },
    { id: "wash",    en: "Wash & Iron",    ar: "غسيل وكي" },
    { id: "dry",     en: "Dry Cleaning",   ar: "تنظيف جاف" },
  ];

  const ironingItems = [
    { name: { en: "T-Shirt",                   ar: "تيشيرت"              }, price: "0.150 BD" },
    { name: { en: "Trouser / Pant",             ar: "بنطلون"             }, price: "0.150 BD" },
    { name: { en: "Thobe",                      ar: "ثوب"                }, price: "0.200 BD" },
    { name: { en: "Ghutra (without Starch)",    ar: "غترة (بدون نشا)"   }, price: "0.200 BD" },
    { name: { en: "Ghutra (with Starch/Nasha)", ar: "غترة (مع نشا)"     }, price: "0.250 BD" },
    { name: { en: "Blouse",                     ar: "بلوزة"              }, price: "0.200 BD" },
    { name: { en: "Saree",                      ar: "ساري"               }, price: "0.500 BD" },
    { name: { en: "Abaya (Steam)",              ar: "عباية (بخار)"       }, price: "0.500 BD" },
    { name: { en: "Jalabiya",                   ar: "جلابية"             }, price: "0.500 BD" },
    { name: { en: "Long Dress",                 ar: "فستان طويل"         }, price: "0.500 BD" },
    { name: { en: "Bed Sheet (Single/Small)",   ar: "شرشف (مفرد/صغير)"  }, price: "0.500 BD" },
    { name: { en: "Bed Sheet (Double/Big)",     ar: "شرشف (مزدوج/كبير)" }, price: "0.800 BD" },
    { name: { en: "Pillow Case",                ar: "غطاء وسادة"         }, price: "0.100 BD" },
    { name: { en: "Curtains",                   ar: "ستائر"              }, price: "1.000 BD" },
    { name: { en: "Suit (Pant & Coat) Steaming",ar: "بدلة (بنطلون ومعطف) بخار" }, price: "1.000 BD" },
    { name: { en: "Safari Suit",                ar: "بدلة سفاري"         }, price: "1.000 BD" },
  ];

  const washItems = [
    { name: { en: "T-Shirt",              ar: "تيشيرت"             }, price: "0.300 BD" },
    { name: { en: "Trouser / Pant",       ar: "بنطلون"             }, price: "0.300 BD" },
    { name: { en: "Thobe",                ar: "ثوب"                }, price: "0.400 BD" },
    { name: { en: "Bed Sheet (Small)",    ar: "شرشف (صغير)"        }, price: "0.800 BD" },
    { name: { en: "Bed Sheet (Big)",      ar: "شرشف (كبير)"        }, price: "1.000 BD" },
    { name: { en: "Pillow Case",          ar: "غطاء وسادة"         }, price: "0.200 BD" },
  ];

  const dryItems = [
    { name: { en: "T-Shirt",          ar: "تيشيرت"         }, price: "0.600 BD" },
    { name: { en: "Trouser / Pant",   ar: "بنطلون"         }, price: "0.600 BD" },
    { name: { en: "Thobe",            ar: "ثوب"            }, price: "0.860 BD" },
    { name: { en: "Abaya",            ar: "عباية"          }, price: "1.000 BD" },
    { name: { en: "Jalabiya",         ar: "جلابية"         }, price: "1.000 BD" },
    { name: { en: "Suit (Pant & Coat)", ar: "بدلة (بنطلون ومعطف)" }, price: "2.000 BD" },
    { name: { en: "Safari Suit",      ar: "بدلة سفاري"    }, price: "2.000 BD" },
    { name: { en: "Curtains",         ar: "ستائر"          }, price: "1.000 BD" },
  ];

  const itemsMap: Record<Tab, typeof ironingItems> = {
    ironing: ironingItems,
    wash:    washItems,
    dry:     dryItems,
  };

  const activeItems = itemsMap[activeTab];

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title[lang]}</h2>
          <p className="text-lg text-muted-foreground">{subtitle[lang]}</p>
        </div>

        {/* Tab Bar */}
        <div className="flex rounded-2xl bg-slate-100 p-1.5 mb-8 gap-1" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-pricing-${tab.id}`}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab[lang]}
            </button>
          ))}
        </div>

        {/* Price List */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-border/60 shadow-lg shadow-blue-900/5 overflow-hidden"
        >
          <div className="divide-y divide-border/60">
            {activeItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-6 py-4 hover:bg-slate-50 transition-colors"
                data-testid={`row-price-${index}`}
              >
                <span className="text-base font-medium text-foreground">{item.name[lang]}</span>
                <span className="text-base font-bold text-primary bg-primary/10 px-4 py-1 rounded-full whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 px-6 py-4 border-t border-border/60 text-center">
            <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              {note[lang]}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
