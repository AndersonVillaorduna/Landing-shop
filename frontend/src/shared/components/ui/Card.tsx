import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

/**
 * 🃏 Card Component
 * Componente de tarjeta reutilizable con efectos hover
 */
const CardBase: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        ${hover ? "card-hover cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * 🖼️ Card.Image - Imagen optimizada para cards
 */
export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  return (
    <div className={`overflow-hidden rounded-t-xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 📝 Card.Content - Contenido del card
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

// 🔧 Crear tipo extendido para soportar subcomponentes
type CardComponent = typeof CardBase & {
  Image: typeof CardImage;
  Content: typeof CardContent;
};

// Exportar como componente compuesto
const Card = CardBase as CardComponent;
Card.Image = CardImage;
Card.Content = CardContent;

export { Card };
export default Card;
