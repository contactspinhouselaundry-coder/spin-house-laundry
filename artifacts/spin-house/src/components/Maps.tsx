import { useLanguage } from "@/context/LanguageContext";

export default function Maps() {
  const { lang } = useLanguage();

  const title = { en: "Find Us", ar: "موقعنا" };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">{title[lang]}</h2>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg border border-border/50 h-[400px] md:h-[500px] w-full">
          <iframe
            src="https://maps.google.com/maps?q=A'ali,Bahrain&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Spin House Laundry Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
