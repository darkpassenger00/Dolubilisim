"use client";

import { useMemo, useState } from "react";
import { countServicesByCategory, filterServicesForAudience } from "../lib/service-discovery.mjs";

type Service = { id: string; audience: string; category: string; title: string; detail: string };

const filters = [
  { id: "all", label: "Tüm hizmetler" },
  { id: "individual", label: "Bireysel" },
  { id: "business", label: "Kurumsal" },
] as const;

function audienceLabel(audience: string) {
  if (audience === "individual") return "Bireysel";
  if (audience === "business") return "Kurumsal";
  return "Bireysel ve kurumsal";
}

export default function ServiceDiscovery({ services }: { services: readonly Service[] }) {
  const [audience, setAudience] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => [...new Set(services.map((service) => service.category))], [services]);
  const categoryCounts: Record<string, number> = useMemo(() => countServicesByCategory(services, audience) as Record<string, number>, [services, audience]);
  const results: Service[] = useMemo(() => filterServicesForAudience(services, audience, selectedCategory, query) as Service[], [services, audience, selectedCategory, query]);

  return (
    <>
      <div className="service-discovery-controls">
        <label className="service-search-field">
          <span className="service-filter-title">Hizmetlerde ara</span>
          <input aria-label="Hizmet ara" type="search" placeholder="Örn. Microsoft 365, yedekleme…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="service-filter-group">
          <span className="service-filter-title">Hizmet türü</span>
          <div className="service-audience-filters" role="group" aria-label="Hizmet türü">
            {filters.map((filter) => (
              <button type="button" key={filter.id} aria-pressed={audience === filter.id} onClick={() => setAudience(filter.id)}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="service-filter-group">
          <span className="service-filter-title">Kategori</span>
          <div className="service-category-filters" role="group" aria-label="Hizmet kategorisi">
            <button type="button" aria-pressed={selectedCategory === "all"} onClick={() => setSelectedCategory("all")}>Tüm kategoriler</button>
            {categories.map((category) => (
              <button type="button" key={category} aria-label={`${category}, ${categoryCounts[category] ?? 0} hizmet`} aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
                <span>{category}</span><span className="service-filter-count" aria-hidden="true">{categoryCounts[category] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="service-result-count" aria-live="polite">{results.length} hizmet gösteriliyor</p>
      </div>
      <div className="service-grid">
        {results.map((service, index) => (
          <a className="service-card" href={`/hizmetler/${service.id}`} key={service.id}>
            <div className="service-card-top"><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span className="service-audience">{audienceLabel(service.audience)}</span><span className="service-arrow"><span aria-hidden="true" className="arrow">↗</span></span></div>
            <span className="service-category-tag">{service.category}</span>
            <h3>{service.title}</h3>
            <p>{service.detail}</p>
          </a>
        ))}
      </div>
      {results.length === 0 && (
        <div className="service-empty-state" role="status">
          <strong>Hizmet bulunamadı</strong>
          <p>Aramanı veya seçili filtreleri değiştirip yeniden deneyebilirsin.</p>
          <button type="button" onClick={() => { setQuery(""); setAudience("all"); setSelectedCategory("all"); }}>Aramayı ve filtreleri temizle</button>
        </div>
      )}
    </>
  );
}
