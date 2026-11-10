import "./globals.css";
import { CartProvider } from "../components/CartContext";
import Header from "../components/Header";
import Cart from "../components/Cart";
export const metadata = { title: "Aryana Restaurant", description: "Authentic Afghan food. Order online for collection or delivery." };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Header /><main>{children}</main><Cart />
          <footer>©  Aryana Restaurant. All rights reserved.</footer>
        </CartProvider>
      </body>
    </html>
  );
}
