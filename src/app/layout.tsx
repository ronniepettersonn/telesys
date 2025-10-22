import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PRIMARY_DOMAIN = "https://www.telesys.com.br";
const SECONDARY_DOMAIN = "https://www.telesys.com.br";

export const metadata: Metadata = {
  title: "Telesys - Sistema para Revenda de Gás",
  description:
    "Simplifique a Gestão da Sua Revenda de Gás - Controle pedidos, entregas, estoque e pagamentos em um só lugar de forma simples e rápida.",
  // Use o campo `icons` para padronizar entre domínios e forçar download do asset versionado
  icons: {
    icon: [
      // Favicon clássico (ICO) — URL ABSOLUTA e VERSIONADA
      { url: `${PRIMARY_DOMAIN}/favicon.ico`, type: "image/x-icon", rel: "icon" },
      { url: `${PRIMARY_DOMAIN}/icon-32-20251022.png`, sizes: "32x32", type: "image/png" },
      { url: `${PRIMARY_DOMAIN}/icon-16-20251022.png`, sizes: "16x16", type: "image/png" },

      { url: `${SECONDARY_DOMAIN}/favicon.ico`, type: "image/x-icon", rel: "icon" },
      { url: `${SECONDARY_DOMAIN}/icon-32-20251022.png`, sizes: "32x32", type: "image/png" },
      { url: `${SECONDARY_DOMAIN}/icon-16-20251022.png`, sizes: "16x16", type: "image/png" },
    ],
    // iOS / iPadOS (ícone para tela inicial)
    apple: [
      { url: `${PRIMARY_DOMAIN}/icon-32-20251022.png`, sizes: "180x180", type: "image/png" },
    ],
    // Safari pinned tab (opcional)
    other: [
      { rel: "mask-icon", url: `${PRIMARY_DOMAIN}/icon-32-20251022.png`, color: "#ffffff" },
    ],
  },
  // Se você tiver PWA/manifest, não esqueça de versionar os ícones DENTRO do manifest também.
  // manifest: `${PRIMARY_DOMAIN}/site-20251022.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="!scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
