import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "../../../features/cart/components/CartDrawer";
import { WhatsAppButton } from "../ui";

/**
 * 🎨 MainLayout Component
 * Layout principal de la aplicación con Header y Footer
 */
export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* 🌎 Global Overlays */}
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};
