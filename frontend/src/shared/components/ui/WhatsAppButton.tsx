import React from "react";

/**
 * 📱 WhatsAppButton Component
 * Botón flotante para contacto directo por WhatsApp
 */
export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "51975104756"; // Número de ejemplo (Perú)
  const message =
    "Hola! Me gustaría recibir información sobre las prendas de la boutique.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-4"
    >
      {/* Label - Appears on Group Hover */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-rose-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 font-medium text-slate-700 text-sm pointer-events-none">
        ¿Necesitas ayuda?{" "}
        <span className="text-rose-500">Chatea con nosotros</span>
      </div>

      <div className="relative">
        {/* Soft Luxury Glow */}
        <span className="absolute inset-0 rounded-full bg-rose-400 opacity-20 animate-ping group-hover:opacity-40"></span>

        {/* Main Button Container */}
        <div className="relative w-16 h-16 bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-full flex items-center justify-center shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 border-2 border-white/50 overflow-hidden">
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

          <svg
            className="w-8 h-8 fill-current text-rose-50"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.212l-.045.079-.663 2.425 2.487-.652.071.041c.903.536 1.847.811 2.893.811 3.18 0 5.765-2.586 5.766-5.766 0-3.18-2.585-5.766-5.766-5.766zm3.336 8.288c-.145.412-.731.764-1.002.812-.271.048-.601.085-1.001-.044-.241-.078-.545-.181-1.047-.394-2.138-.909-3.522-3.08-3.629-3.223-.107-.143-.872-1.162-.872-2.235s.554-1.599.751-1.815c.197-.216.429-.271.572-.271.143 0 .286.002.41.008s.308-.046.482.375c.174.421.595 1.45.646 1.556.051.106.084.23.013.374s-.106.23-.217.356c-.111.127-.233.283-.333.38-.108.106-.221.222-.095.44.127.218.563.929 1.21 1.505.834.743 1.537 1.218 1.751 1.328.214.11.339.091.466-.055.127-.146.545-.634.69-.851.145-.218.291-.182.493-.108.203.074 1.284.606 1.506.717.222.111.369.167.424.261.055.093.055.541-.09.953z" />
            <path d="M12.036 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 21.84c-1.833 0-3.626-.475-5.204-1.378l-4.502 1.18 1.203-4.398c-1.005-1.741-1.537-3.727-1.536-5.744.003-6.323 5.438-11.46 12.126-11.46 3.259 0 6.322 1.272 8.625 3.582 2.304 2.311 3.57 5.38 3.568 8.63-.003 6.323-5.438 11.46-12.126 11.46l-.154-.002z" />
          </svg>
        </div>
      </div>
    </a>
  );
};
