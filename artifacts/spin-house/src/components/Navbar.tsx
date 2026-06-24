import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import logoImg from "@/assets/images/logo-transparent.png";

export default function Navbar() {
  const { lang, setLang, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  const navLinks = [
    { href: "#home", en: "Home", ar: "الرئيسية" },
    { href: "#services", en: "Services", ar: "الخدمات" },
    { href: "#offers", en: "Offers", ar: "العروض" },
    { href: "#pricing", en: "Pricing", ar: "الأسعار" },
    { href: "#reviews", en: "Reviews", ar: "التقييمات" },
    { href: "#gallery", en: "Gallery", ar: "معرض الصور" },
    { href: "#contact", en: "Contact", ar: "اتصل بنا" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Spin House Laundry Logo"
              className="h-[50px] w-[50px] object-contain"
            />
            <span className={`font-bold text-xl ${isScrolled ? "text-foreground" : "text-white drop-shadow"}`}>
              {lang === "en" ? "Spin House Laundry" : "مغسلة سبين هاوس"}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isScrolled ? "text-muted-foreground" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link[lang]}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 border-s border-border/50 ps-4">
              <button
                onClick={toggleLanguage}
                className={`font-semibold text-sm transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
                data-testid="button-language-toggle"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>

              <Button
                asChild
                variant={isScrolled ? "default" : "secondary"}
                className={!isScrolled ? "bg-white text-primary hover:bg-white/90" : ""}
                data-testid="button-nav-book"
              >
                <a href="#book">
                  {lang === "en" ? "Book Now" : "احجز الآن"}
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`font-semibold text-sm transition-colors hover:text-primary ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              data-testid="button-mobile-language-toggle"
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? "text-foreground" : "text-white"}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b shadow-lg absolute w-full left-0 top-20">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-foreground hover:text-primary py-2"
              >
                {link[lang]}
              </a>
            ))}
            <Button asChild className="w-full" data-testid="button-mobile-nav-book">
              <a href="#book" onClick={() => setMobileMenuOpen(false)}>
                {lang === "en" ? "Book Now" : "احجز الآن"}
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
