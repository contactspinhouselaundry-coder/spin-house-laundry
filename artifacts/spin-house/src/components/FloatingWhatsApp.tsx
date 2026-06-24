import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/97333157178"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] hover:scale-110"
      aria-label="Contact us on WhatsApp"
      data-testid="button-floating-whatsapp"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30"></div>
      <FaWhatsapp className="w-8 h-8 relative z-10" />
    </a>
  );
}
