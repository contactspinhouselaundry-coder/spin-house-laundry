import { MapPin, Phone, Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const { lang, isRtl } = useLanguage();

  const title = { en: "Contact Us", ar: "تواصل معنا" };
  const subtitle = { en: "We're here to help you", ar: "نحن هنا لمساعدتك" };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title[lang]}</h2>
          <p className="text-lg text-muted-foreground">{subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a href="https://wa.me/97333157178" target="_blank" rel="noreferrer" className="group">
            <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center py-8">
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{lang === "en" ? "WhatsApp" : "واتساب"}</h3>
                <p className="text-muted-foreground hover:text-primary transition-colors font-medium text-lg" dir="ltr">
                  +973 33157178
                </p>
              </CardContent>
            </Card>
          </a>

          <a href="https://instagram.com/spinhouse_bh" target="_blank" rel="noreferrer" className="group">
            <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center py-8">
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Instagram className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{lang === "en" ? "Instagram" : "انستغرام"}</h3>
                <p className="text-muted-foreground hover:text-primary transition-colors font-medium text-lg" dir="ltr">
                  @spinhouse_bh
                </p>
              </CardContent>
            </Card>
          </a>

          <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center py-8">
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{lang === "en" ? "Address" : "العنوان"}</h3>
              <p className="text-muted-foreground font-medium">
                {lang === "en" 
                  ? "Building 421, Road 71, Block 738, A'ali, Bahrain" 
                  : "مبنى 421، طريق 71، مجمع 738، عالي، البحرين"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
