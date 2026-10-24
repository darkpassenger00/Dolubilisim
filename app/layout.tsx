import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dolubilisim.com"),
  title: "Dolu Bilişim | Teknoloji, güven ve dijital büyüme",
  description:
    "Bireysel teknoloji desteği ve işletmeler için web, bulut ve güvenlik danışmanlığı. İhtiyacınıza uygun çözüm için Dolu Bilişim'e ulaşın.",
  applicationName: "Dolu Bilişim",
  openGraph: {
    title: "Dolu Bilişim | Teknoloji, güven ve dijital büyüme",
    description:
      "Bireysel teknoloji desteği ve işletmeler için web, bulut ve güvenlik danışmanlığı. İhtiyacınıza uygun çözüm için Dolu Bilişim'e ulaşın.",
    locale: "tr_TR",
    siteName: "Dolu Bilişim",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dolu Bilişim | Teknoloji, güven ve dijital büyüme",
    description:
      "Bireysel teknoloji desteği ve işletmeler için web, bulut ve güvenlik danışmanlığı. İhtiyacınıza uygun çözüm için Dolu Bilişim'e ulaşın.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <div className="neon-entry-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
