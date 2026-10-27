"use client";

import { useMemo, useRef, useState } from "react";
import { filterSeoGuides } from "../lib/search-guides.mjs";

type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  keywords: readonly string[];
};

export default function GuideSearch({ guides }: { guides: readonly Guide[] }) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useMemo(() => [...new Set(guides.map((guide) => guide.category))], [guides]);
  const results: Guide[] = useMemo(() => filterSeoGuides(guides, query, selectedCategory), [guides, query, selectedCategory]);

  return (
    <div className="guide-discovery">
      <div className="guide-search-row">
        <label className="guide-search-label" htmlFor="guide-search">Rehberlerde ara</label>
        <input
          ref={searchRef}
          id="guide-search"
          className="guide-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Ör. Microsoft 365, yedekleme…"
          autoComplete="off"
        />
        {query && <button className="guide-search-clear" type="button" onClick={() => { setQuery(""); searchRef.current?.focus(); }}>Aramayı temizle</button>}
      </div>
      <nav className="guide-category-filters" aria-label="Rehber kategorileri">
        <button type="button" aria-pressed={selectedCategory === ""} onClick={() => setSelectedCategory("")}>Tümü</button>
        {categories.map((category) => (
          <button type="button" key={category} aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)}>{category}</button>
        ))}
      </nav>
      <p className="guide-search-count" aria-live="polite">{results.length} rehber gösteriliyor</p>
      {results.length > 0 && (query || selectedCategory) && (
        <button className="guide-search-clear" type="button" onClick={() => { setQuery(""); setSelectedCategory(""); searchRef.current?.focus(); }}>Tüm filtreleri temizle</button>
      )}
      {results.length > 0 ? (
        <div className="guide-card-grid">
          {results.map((guide) => (
            <a className="guide-card" href={`/rehber/${guide.slug}`} key={guide.slug}>
              <div className="guide-card-meta"><span>{guide.category}</span><span>{guide.readingTime} dk</span></div>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <span className="guide-card-link">Rehberi oku <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      ) : (
        <div className="guide-search-empty">
          <p role="status">Bu aramayla eşleşen rehber bulunamadı. Farklı bir kelime deneyin veya tüm rehberlere dönün.</p>
          <button className="guide-search-clear" type="button" onClick={() => { setQuery(""); setSelectedCategory(""); searchRef.current?.focus(); }}>Tüm rehberleri göster</button>
          <p>Aradığınız yanıtı bulamadınız mı? <a className="guide-card-link" href="/#iletisim">Destek talebi aç <span aria-hidden="true">↗</span></a></p>
        </div>
      )}
    </div>
  );
}
