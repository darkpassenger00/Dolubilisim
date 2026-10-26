"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { getServicesForAudience } from "../lib/site-content.mjs";
import { createEmailDraftHref } from "../lib/contact-draft.mjs";

type RequestDetails = {
  audience: string;
  service: string;
  urgency: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  message: string;
};

export default function RequestForm() {
  const [status, setStatus] = useState("");
  const [draftHref, setDraftHref] = useState("");
  const [audience, setAudience] = useState<"Bireysel" | "Kurumsal">("Bireysel");
  const [service, setService] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const serviceOptions = getServicesForAudience(audience === "Bireysel" ? "individual" : "business");

  function handleAudienceChange(event: ChangeEvent<HTMLSelectElement>) {
    setAudience(event.currentTarget.value as "Bireysel" | "Kurumsal");
    setService("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const request: RequestDetails = {
      audience: String(values.get("audience") || ""),
      service: String(values.get("service") || ""),
      urgency: String(values.get("urgency") || ""),
      name: String(values.get("name") || ""),
      email: String(values.get("email") || ""),
      phone: String(values.get("phone") || ""),
      preferredContact: String(values.get("preferredContact") || ""),
      message: String(values.get("message") || ""),
    };

    const href = createEmailDraftHref(process.env.NEXT_PUBLIC_CONTACT_EMAIL, request);
    setDraftHref(href);
    window.location.href = href;
    setStatus(
      process.env.NEXT_PUBLIC_CONTACT_EMAIL
        ? "E-posta taslağı açılmaya çalışılıyor. E-postayı kontrol edip göndermek size kalır."
        : "Dolu Bilişim e-posta adresi henüz tanımlı değil; taslağın alıcı alanını siz doldurun.",
    );
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-intro"><span className="form-step">TALEP FORMU / 01</span><p>İhtiyacınızı kısaca anlatın. Bilgileriniz bu sitede kaydedilmez; e-posta taslağı cihazınızda açılır.</p></div>
      <div className="form-grid">
        <label>Müşteri türü
          <select name="audience" value={audience} onChange={handleAudienceChange} required><option>Bireysel</option><option>Kurumsal</option></select>
        </label>
        <label>Hizmet alanı
          <select name="service" value={service} onChange={(event) => setService(event.currentTarget.value)} required><option value="" disabled>Seçim yapın</option>{serviceOptions.map((option) => <option key={option.id}>{option.title}</option>)}<option>Diğer / Emin değilim</option></select>
        </label>
        <label>Ad soyad
          <input name="name" autoComplete="name" placeholder="Adınız ve soyadınız" required />
        </label>
        <label>E-posta adresi
          <input name="email" type="email" autoComplete="email" placeholder="ornek@email.com" required />
        </label>
        <label>Telefon <span className="optional-label">İsteğe bağlı</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="05__ ___ __ __" />
        </label>
        <label>İletişim tercihi
          <select name="preferredContact" defaultValue="E-posta"><option>E-posta</option><option>Telefon</option><option>WhatsApp</option></select>
        </label>
        <label className="form-wide">Talebiniz
          <textarea name="message" rows={4} maxLength={1800} onChange={(event) => setMessageLength(event.currentTarget.value.length)} placeholder="Nasıl yardımcı olabiliriz? Lütfen parola gibi hassas bilgileri yazmayın." required />
          <span className="message-counter" aria-live="polite">{messageLength}/1800 karakter</span>
        </label>
        <label className="urgency-field">Öncelik
          <select name="urgency" defaultValue="Normal"><option>Normal</option><option>Acil</option></select>
        </label>
        <div className="form-submit-wrap"><button className="button button-primary form-submit" type="submit">E-posta taslağı oluştur <span aria-hidden="true">↗</span></button></div>
      </div>
      <p className="form-privacy">E-postanız otomatik gönderilmez. Açılan taslağı inceleyip gönderme işlemini siz yaparsınız.</p>
      <p className="form-status" role="status" aria-live="polite">
        {status}
        {draftHref && <><br /><a className="form-draft-retry" href={draftHref}>E-posta taslağını yeniden aç <span aria-hidden="true">↗</span></a></>}
      </p>
    </form>
  );
}
