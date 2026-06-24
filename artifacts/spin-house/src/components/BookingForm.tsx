import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaWhatsapp } from "react-icons/fa";
import { CheckCircle2, ChevronRight, ChevronLeft, Plus, Trash2, ShoppingCart, Copy, Check } from "lucide-react";

type ServiceKey = "ironing" | "wash" | "dry" | "shoes";

interface ServiceItem {
  id: string;
  en: string;
  ar: string;
  price: number;
}

interface ServiceDef {
  en: string;
  ar: string;
  items: ServiceItem[];
}

interface CartLine {
  serviceKey: ServiceKey;
  serviceName: { en: string; ar: string };
  itemId: string;
  itemName: { en: string; ar: string };
  price: number;
  qty: number;
}

const SERVICES: Record<ServiceKey, ServiceDef> = {
  ironing: {
    en: "Ironing & Steam",
    ar: "كي وبخار",
    items: [
      { id: "tshirt",     en: "T-Shirt",        ar: "تيشيرت",     price: 0.15 },
      { id: "trouser",    en: "Trouser",         ar: "بنطلون",     price: 0.15 },
      { id: "thobe",      en: "Thobe",           ar: "ثوب",        price: 0.20 },
      { id: "ghutra",     en: "Ghutra",          ar: "غترة",       price: 0.20 },
      { id: "abaya",      en: "Abaya",           ar: "عباية",      price: 0.50 },
      { id: "sheetSmall", en: "Bed Sheet Small", ar: "شرشف صغير",  price: 0.50 },
      { id: "sheetLarge", en: "Bed Sheet Large", ar: "شرشف كبير",  price: 0.80 },
      { id: "pillowCase", en: "Pillow Case",     ar: "غطاء وسادة", price: 0.10 },
    ],
  },
  wash: {
    en: "Wash & Iron",
    ar: "غسيل وكي",
    items: [
      { id: "tshirt",  en: "T-Shirt", ar: "تيشيرت", price: 0.30 },
      { id: "trouser", en: "Trouser", ar: "بنطلون",  price: 0.30 },
      { id: "thobe",   en: "Thobe",   ar: "ثوب",     price: 0.40 },
    ],
  },
  dry: {
    en: "Dry Cleaning",
    ar: "تنظيف جاف",
    items: [
      { id: "thobe",      en: "Thobe",       ar: "ثوب",        price: 0.86 },
      { id: "abaya",      en: "Abaya",       ar: "عباية",      price: 1.00 },
      { id: "suit",       en: "Suit",        ar: "بدلة",       price: 2.00 },
      { id: "safariSuit", en: "Safari Suit", ar: "بدلة سفاري", price: 2.00 },
    ],
  },
  shoes: {
    en: "Shoe Cleaning",
    ar: "تنظيف الأحذية",
    items: [
      { id: "sneakers", en: "Sneakers / Sports Shoes", ar: "أحذية رياضية",   price: 1.200 },
      { id: "leather",  en: "Leather Shoes",           ar: "أحذية جلدية",    price: 1.500 },
      { id: "boots",    en: "Boots",                   ar: "بوت",            price: 2.000 },
      { id: "sandals",  en: "Sandals / Slippers",      ar: "صنادل / شبشب",   price: 0.800 },
    ],
  },
};

const STEPS = 5;

function StepIndicator({ step, lang }: { step: number; lang: "en" | "ar" }) {
  const labels = {
    en: ["Service", "Item", "Quantity", "Your Info", "Confirm"],
    ar: ["الخدمة", "القطعة", "الكمية", "بياناتك", "تأكيد"],
  };
  return (
    <div className="flex items-center justify-between mb-8">
      {labels[lang].map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300
              ${done ? "bg-primary border-primary text-white" : active ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground bg-white"}`}>
              {done ? <CheckCircle2 className="w-5 h-5" /> : n}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function CartSummary({ cart, lang, onRemove }: { cart: CartLine[]; lang: "en" | "ar"; onRemove?: (i: number) => void }) {
  if (cart.length === 0) return null;
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0);
  return (
    <div className="mt-6 rounded-2xl border border-border/60 overflow-hidden">
      <div className="bg-slate-50 px-4 py-2.5 flex items-center gap-2 border-b border-border/60">
        <ShoppingCart className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          {lang === "en" ? "Your Order" : "طلبك"} ({cart.length} {lang === "en" ? "item(s)" : "قطعة"})
        </span>
      </div>
      <div className="divide-y divide-border/40">
        {cart.map((line, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 bg-white gap-3" data-testid={`cart-line-${i}`}>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{line.itemName[lang]}</p>
              <p className="text-xs text-muted-foreground">{line.serviceName[lang]} · ×{line.qty}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-bold text-primary">{(line.price * line.qty).toFixed(3)} BD</span>
              {onRemove && (
                <button onClick={() => onRemove(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1" data-testid={`btn-remove-${i}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/5 px-4 py-3 flex justify-between items-center border-t border-primary/20">
        <span className="text-sm font-semibold text-foreground">{lang === "en" ? "Total" : "الإجمالي"}</span>
        <span className="text-lg font-extrabold text-primary" data-testid="text-cart-total">{total.toFixed(3)} BD</span>
      </div>
    </div>
  );
}

export default function BookingForm() {
  const { lang } = useLanguage();

  // wizard state
  const [step, setStep]       = useState(1);
  const [service, setService] = useState<ServiceKey | null>(null);
  const [itemId, setItemId]   = useState<string | null>(null);
  const [qty, setQty]         = useState(1);

  // cart
  const [cart, setCart] = useState<CartLine[]>([]);

  // contact
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [copied, setCopied]   = useState(false);

  const selectedService = service ? SERVICES[service] : null;
  const selectedItem    = selectedService?.items.find((i) => i.id === itemId) ?? null;
  const lineTotal       = selectedItem ? selectedItem.price * qty : 0;
  const cartTotal       = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const grandTotal      = cartTotal + lineTotal;

  const c = {
    title:         { en: "Book Your Laundry Pickup",                          ar: "احجز موعد الاستلام"              },
    subtitle:      { en: "Add items, then enter your details — we confirm via WhatsApp", ar: "أضف القطع ثم أدخل بياناتك وسنتواصل معك عبر واتساب" },
    step1:         { en: "Select a Service",                                  ar: "اختر الخدمة"                     },
    step2:         { en: "Select an Item",                                    ar: "اختر القطعة"                     },
    step3:         { en: "Set Quantity",                                      ar: "حدد الكمية"                      },
    step4:         { en: "Your Details",                                      ar: "بياناتك"                         },
    step5:         { en: "Review & Send",                                     ar: "مراجعة وإرسال"                   },
    name:          { en: "Full Name",                                         ar: "الاسم الكامل"                    },
    phone:         { en: "Phone Number",                                      ar: "رقم الهاتف"                      },
    address:       { en: "Delivery Address",                                  ar: "عنوان التوصيل"                   },
    next:          { en: "Next",                                              ar: "التالي"                          },
    back:          { en: "Back",                                              ar: "رجوع"                            },
    addAnother:    { en: "Add Another Item",                                  ar: "أضف قطعة أخرى"                   },
    checkout:      { en: "Continue to Details",                               ar: "المتابعة للبيانات"               },
    send:          { en: "Send via WhatsApp",                                 ar: "أرسل عبر واتساب"                 },
    priceEach:     { en: "Price each",                                        ar: "سعر الواحدة"                     },
    grandTotal:    { en: "Grand Total",                                       ar: "الإجمالي الكلي"                  },
    emptyCart:     { en: "No items added yet",                                ar: "لم تتم إضافة أي قطعة بعد"        },
  };
  const t = (k: keyof typeof c) => c[k][lang];

  function validateContact() {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2)
      errs.name = lang === "en" ? "Enter your full name" : "أدخل اسمك الكامل";
    if (!phone.trim() || phone.trim().length < 8)
      errs.phone = lang === "en" ? "Enter a valid phone number" : "أدخل رقم هاتف صحيح";
    if (!address.trim() || address.trim().length < 5)
      errs.address = lang === "en" ? "Enter your delivery address" : "أدخل عنوان التوصيل";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function commitCurrentLine() {
    if (!service || !selectedItem) return;
    setCart((prev) => [
      ...prev,
      {
        serviceKey:  service,
        serviceName: { en: SERVICES[service].en, ar: SERVICES[service].ar },
        itemId:      selectedItem.id,
        itemName:    { en: selectedItem.en, ar: selectedItem.ar },
        price:       selectedItem.price,
        qty,
      },
    ]);
  }

  function handleAddAnother() {
    commitCurrentLine();
    setService(null);
    setItemId(null);
    setQty(1);
    setStep(1);
  }

  function handleCheckout() {
    commitCurrentLine();
    setStep(4);
  }

  function handleNext() {
    if (step === 4 && !validateContact()) return;
    setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  function removeCartLine(i: number) {
    setCart((prev) => prev.filter((_, idx) => idx !== i));
  }

  function buildWhatsAppMessage() {
    // Build combined cart (committed + current line already committed at this point)
    const lines = cart;
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

    if (lang === "en") {
      const itemsText = lines
        .map((l, i) => `  ${i + 1}. ${l.serviceName.en} — ${l.itemName.en} ×${l.qty} = ${(l.price * l.qty).toFixed(3)} BD`)
        .join("\n");
      return `*New Laundry Order — Spin House*\n\n*Items:*\n${itemsText}\n\n*Grand Total:* ${total.toFixed(3)} BD\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}`;
    } else {
      const itemsText = lines
        .map((l, i) => `  ${i + 1}. ${l.serviceName.ar} — ${l.itemName.ar} ×${l.qty} = ${(l.price * l.qty).toFixed(3)} BD`)
        .join("\n");
      return `*طلب غسيل جديد — سبين هاوس*\n\n*القطع:*\n${itemsText}\n\n*الإجمالي:* ${total.toFixed(3)} BD\n\n*الاسم:* ${name}\n*الهاتف:* ${phone}\n*العنوان:* ${address}`;
    }
  }

  function handleSend() {
    window.open(`https://wa.me/97333157178?text=${encodeURIComponent(buildWhatsAppMessage())}`, "_blank");
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildWhatsAppMessage()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const slide = {
    enter:  { opacity: 0, x: lang === "ar" ? -24 : 24 },
    center: { opacity: 1, x: 0 },
    exit:   { opacity: 0, x: lang === "ar" ? 24 : -24 },
  };

  return (
    <section id="book" className="py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-border/50 p-6 md:p-10">
          <StepIndicator step={step} lang={lang} />

          <AnimatePresence mode="wait">
            <motion.div key={step} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>

              {/* ── Step 1: Service ── */}
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-5">{t("step1")}</h3>
                  <div className="grid gap-3">
                    {(Object.keys(SERVICES) as ServiceKey[]).map((key) => (
                      <button key={key} onClick={() => { setService(key); setItemId(null); }}
                        data-testid={`btn-service-${key}`}
                        className={`w-full text-start px-5 py-4 rounded-xl border-2 font-semibold transition-all duration-200
                          ${service === key ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-foreground"}`}>
                        {SERVICES[key][lang]}
                      </button>
                    ))}
                  </div>
                  <CartSummary cart={cart} lang={lang} onRemove={removeCartLine} />
                </div>
              )}

              {/* ── Step 2: Item ── */}
              {step === 2 && selectedService && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{t("step2")}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{selectedService[lang]}</p>
                  <div className="grid gap-3">
                    {selectedService.items.map((itm) => (
                      <button key={itm.id} onClick={() => setItemId(itm.id)}
                        data-testid={`btn-item-${itm.id}`}
                        className={`w-full flex justify-between items-center px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200
                          ${itemId === itm.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-foreground"}`}>
                        <span>{itm[lang]}</span>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-0.5 rounded-full">{itm.price.toFixed(3)} BD</span>
                      </button>
                    ))}
                  </div>
                  <CartSummary cart={cart} lang={lang} onRemove={removeCartLine} />
                </div>
              )}

              {/* ── Step 3: Quantity ── */}
              {step === 3 && selectedItem && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{t("step3")}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{selectedItem[lang]} — {selectedItem.price.toFixed(3)} BD {t("priceEach")}</p>

                  {/* Quantity picker */}
                  <div className="flex flex-col items-center gap-5 mb-6">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => qty === 1 ? setStep(2) : setQty((q) => q - 1)}
                        data-testid="btn-qty-decrease"
                        className={`w-14 h-14 rounded-full border-2 font-bold transition-colors flex items-center justify-center text-2xl
                          ${qty === 1
                            ? "border-destructive/50 hover:border-destructive hover:bg-destructive/10 text-destructive"
                            : "border-border hover:border-primary text-foreground hover:text-primary"}`}>
                        {qty === 1 ? <Trash2 className="w-5 h-5" /> : "−"}
                      </button>
                      <span className="text-5xl font-extrabold text-foreground w-16 text-center" data-testid="text-quantity">{qty}</span>
                      <button onClick={() => setQty((q) => q + 1)} data-testid="btn-qty-increase"
                        className="w-14 h-14 rounded-full border-2 border-border hover:border-primary text-foreground hover:text-primary text-2xl font-bold transition-colors flex items-center justify-center">+</button>
                    </div>
                    <div className="w-full bg-primary/5 rounded-2xl p-4 text-center border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-0.5">{lang === "en" ? "This item" : "هذه القطعة"}</p>
                      <p className="text-3xl font-extrabold text-primary" data-testid="text-total">{lineTotal.toFixed(3)} BD</p>
                    </div>
                  </div>

                  {/* Cart so far + running grand total */}
                  {cart.length > 0 && (
                    <CartSummary cart={cart} lang={lang} onRemove={removeCartLine} />
                  )}

                  {/* Grand total preview */}
                  {(cart.length > 0 || lineTotal > 0) && (
                    <div className="mt-3 flex justify-between items-center px-4 py-3 bg-primary rounded-xl text-white">
                      <span className="text-sm font-semibold">{t("grandTotal")}</span>
                      <span className="text-xl font-extrabold" data-testid="text-grand-total">{grandTotal.toFixed(3)} BD</span>
                    </div>
                  )}

                  {/* Add another / checkout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    <Button variant="outline" onClick={handleAddAnother} className="h-12 gap-2" data-testid="btn-add-another">
                      <Plus className="w-4 h-4" />
                      {t("addAnother")}
                    </Button>
                    <Button onClick={handleCheckout} className="h-12 gap-1" data-testid="btn-checkout">
                      {t("checkout")}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 4: Contact ── */}
              {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6">{t("step4")}</h3>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder={lang === "en" ? "Mohammed Al-Ali" : "محمد العلي"} className="h-12" data-testid="input-name" />
                      {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+973 33157178" className="h-12" dir="ltr" data-testid="input-phone" />
                      {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="address">{t("address")}</Label>
                      <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                        placeholder={lang === "en" ? "Building, Road, Block, Area" : "المبنى، الطريق، المجمع، المنطقة"} className="h-12" data-testid="input-address" />
                      {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}
                    </div>
                  </div>
                  <CartSummary cart={cart} lang={lang} />
                </div>
              )}

              {/* ── Step 5: Confirm ── */}
              {step === 5 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-6">{t("step5")}</h3>

                  {/* Contact summary */}
                  <div className="bg-slate-50 rounded-2xl divide-y divide-border/60 border border-border/60 mb-4 overflow-hidden">
                    {[
                      { label: t("name"),    value: name    },
                      { label: t("phone"),   value: phone   },
                      { label: t("address"), value: address },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-muted-foreground">{label}</span>
                        <span className="text-sm font-semibold text-foreground text-end max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Full order */}
                  <CartSummary cart={cart} lang={lang} />

                  <div className="flex flex-col gap-3 mt-6">
                    <Button onClick={handleSend} size="lg"
                      className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white gap-2"
                      data-testid="button-submit-booking">
                      <FaWhatsapp className="w-6 h-6" />
                      {t("send")}
                    </Button>
                    <Button onClick={handleCopy} variant="outline" size="lg"
                      className={`w-full h-12 gap-2 transition-all duration-300 ${copied ? "border-green-500 text-green-600 bg-green-50" : ""}`}
                      data-testid="button-copy-order">
                      {copied
                        ? <><Check className="w-4 h-4" />{lang === "en" ? "Copied!" : "تم النسخ!"}</>
                        : <><Copy className="w-4 h-4" />{lang === "en" ? "Copy Order Summary" : "نسخ ملخص الطلب"}</>
                      }
                    </Button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Standard back / next (steps 1–2 and step 4) */}
          {step !== 3 && step !== 5 && (
            <div className={`flex mt-8 gap-3 ${step === 1 ? "justify-end" : "justify-between"}`}>
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} className="gap-1" data-testid="btn-back">
                  <ChevronLeft className="w-4 h-4" />
                  {t("back")}
                </Button>
              )}
              {step < STEPS && step !== 3 && (
                <Button onClick={handleNext}
                  disabled={(step === 1 && !service) || (step === 2 && !itemId)}
                  className="gap-1 ms-auto" data-testid="btn-next">
                  {t("next")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}

          {/* Back button for step 5 */}
          {step === 5 && (
            <div className="mt-4">
              <Button variant="outline" onClick={handleBack} className="gap-1" data-testid="btn-back-confirm">
                <ChevronLeft className="w-4 h-4" />
                {t("back")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
