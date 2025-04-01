import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Skribbl: Code Smells & Design Patterns",
  description: "Un juego educativo para aprender sobre code smells y patrones de diseño",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
