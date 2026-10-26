"use client";

import { useMemo, useState } from "react";
import { filterServicesForAudience } from "../lib/service-discovery.mjs";

type Service = { id: string; audience: string; title: string; detail: string };

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
  const results = useMemo(() => filterServicesForAudience(services, audience), [services, audience]);

  return (
    <>
      <div className="service-discovery-controls">
        <div className="service-audience-filters" role="group" aria-label="Hizmet türü">
          {filters.map((filter) => (
            <button type="button" key={filter.id} aria-pressed={audience === filter.id} onClick={() => setAudience(filter.id)}>
              {filter.label}
            </button>
          ))}
        </div>
        <p className="service-result-count" aria-live="polite">{results.length} hizmet gösteriliyor</p>
      </div>
      <div className="service-grid">
        {results.map((service, index) => (
          <a className="service-card" href={`/hizmetler/${service.id}`} key={service.id}>
            <div className="service-card-top"><span className="service-number">{String(index + 1).padStart(2, "0")}</span><span className="service-audience">{audienceLabel(service.audience)}</span><span className="service-arrow"><span aria-hidden="true" className="arrow">↗</span></span></div>
            <h3>{service.title}</h3>
            <p>{service.detail}</p>
          </a>
        ))}
      </div>
    </>
  );
}
