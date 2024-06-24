import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Imóvel Guide",
    default: "Cadastro de Corretor - Imóvel Guide",
  },
  description: "Guia de Imobiliárias e Corretores",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html className={inter.className} lang="pt-br">
      <body className="antialiased">
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
