const siteUrl = "https://dolubilisim.com";

export const homepageStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Dolu Bilişim",
    url: siteUrl,
    description:
      "Bireysel teknoloji desteği ve işletmeler için web, bulut ve güvenlik danışmanlığı.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Dolu Bilişim",
    url: siteUrl,
    inLanguage: "tr-TR",
    publisher: { "@id": `${siteUrl}/#organization` },
  },
];

export function breadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: url,
    })),
  };
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
