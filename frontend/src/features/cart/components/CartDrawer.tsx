import React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/useRedux";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartDrawerOpen,
  closeDrawer,
  updateQuantity,
  removeFromCart,
} from "../store/cartSlice";
import { Button } from "../../../shared/components/ui";

/**
 * 🛒 CartDrawer Component
 * Ventana lateral deslizante para gestionar el carrito de compras
 */
export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const isOpen = useAppSelector(selectIsCartDrawerOpen);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const phoneNumber = "51975104756"; // Número de la boutique
    let message = "🛍️ *Nuevo Pedido - Boutique Hilda Silva*\n\n";
    message += "Hola! Me gustaría adquirir las siguientes prendas:\n\n";

    items.forEach((item) => {
      message += `• *${item.product.name}*\n`;
      message += `  Talla: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      message += `  Cant: ${item.quantity} x $${item.product.price}\n`;
      message += `  Subtotal: *$${(item.product.price * item.quantity).toFixed(
        2
      )}*\n\n`;
    });

    message += `💰 *TOTAL A PAGAR: $${total.toFixed(2)}*\n\n`;
    message += "--- \n";
    message +=
      "Quedo a la espera de su confirmación para coordinar el pago y la entrega en tienda. ✨";

    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(waLink, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden">
      {/* Overlay con blur */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => dispatch(closeDrawer())}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 animate-slide-in-right">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Tu Carrito
            </h2>
            <button
              onClick={() => dispatch(closeDrawer())}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors group"
            >
              <svg
                className="w-6 h-6 text-slate-400 group-hover:text-rose-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Listado de Productos */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-slate-500 font-light italic">
                  Tu carrito está vacío
                </p>
                <button
                  onClick={() => dispatch(closeDrawer())}
                  className="mt-6 text-rose-600 font-bold border-b border-rose-200 hover:border-rose-400 transition-all"
                >
                  Seguir Comprando
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 group"
                  >
                    {/* Imagen */}
                    <div className="w-24 h-32 bg-stone-50 rounded-2xl overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2 mb-1">
                        <h3 className="font-serif font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => dispatch(removeFromCart(index))}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest font-medium">
                        {item.selectedSize} / {item.selectedColor}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Control de Cantidad */}
                        <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  index,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  index,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        <span className="font-bold text-slate-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Totales */}
          {items.length > 0 && (
            <div className="p-8 bg-stone-50 border-t border-slate-100 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">
                    Total Estimado
                  </p>
                  <p className="text-slate-500 text-xs italic">
                    Impuestos incluidos
                  </p>
                </div>
                <p className="text-4xl font-serif font-bold text-slate-900">
                  ${total.toFixed(2)}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-slate-900 text-white h-16 rounded-2xl shadow-xl shadow-slate-200 text-lg font-bold hover:bg-rose-600 transition-all duration-500"
                >
                  🛒 Finalizar Compra
                </Button>
                <button
                  onClick={() => dispatch(closeDrawer())}
                  className="w-full h-12 text-slate-400 hover:text-slate-600 font-medium transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
