import { useState, useEffect } from "react";

interface HeroCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  imageClassName?: string;
}

/**
 * 🎠 HeroCarousel - Componente de carrusel de imágenes premium
 * Ofrece transiciones suaves (fade) y es totalmente responsivo.
 */
export const HeroCarousel = ({
  images,
  interval = 5000,
  className = "",
  imageClassName = "",
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, currentIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0 invisible"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover ${imageClassName}`}
          />
        </div>
      ))}

      {/* Indicadores opcionales (dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-rose-500 w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
