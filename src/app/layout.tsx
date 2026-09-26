import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

import { AuthProvider } from "@/contexts/auth-context"
import { CotacaoProvider } from "@/contexts/cotacao-context"
import { ViewModeProvider } from "@/contexts/view-mode-context"

export const metadata: Metadata = {
  title: "OFIR | Marketplace de Construtoras, Engenharia & Arquitetura",
  description:
    "Plataforma de alta relevância para contratação de construtoras, empresas de engenharia e escritórios de arquitetura de alto padrão com custo por m².",
  icons: {
    icon: "/logomini.svg",
    shortcut: "/logomini.svg",
    apple: "/logomini.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AuthProvider>
          <CotacaoProvider>
            <ViewModeProvider>
              {children}
              <Footer />
            </ViewModeProvider>
          </CotacaoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
