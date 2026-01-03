import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  className?: string;
}

/**
 * 🏷️ Badge Component
 * Componente de etiqueta para indicadores (Nuevo, Oferta, etc.)
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
}) => {
  // 🎨 Variantes de color
  const variants = {
    primary: "bg-primary-100 text-primary-700 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-700 border-secondary-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    error: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
  };

  // 📏 Tamaños
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center
        font-semibold rounded-full border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
