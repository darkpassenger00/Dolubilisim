import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dolu Bilişim | Teknoloji, güven ve dijital büyüme",
  description:
    "Bireysel teknoloji desteği ve işletmeler için web, bulut ve güvenlik danışmanlığı. İhtiyacınıza uygun çözüm için Dolu Bilişim'e ulaşın.",
  applicationName: "Dolu Bilişim",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
