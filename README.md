# Dolu Bilişim

Dolu Bilişim'in bireysel ve kurumsal teknoloji hizmetleri için Next.js tabanlı web sitesi.

## Geliştirme

```bash
npm ci
npm run dev
```

Windows'ta ZIP dosyasından projeyi açma adımları için [Windows yerel önizleme kılavuzuna](docs/windows-local-preview.md) bakın. ZIP'i kullanmak için Git kurulumu gerekmez; `npm` komutları için Node.js gerekir.

## Kontroller

```bash
npm test
npm run build
```

İçerik ve hizmet kataloğu `lib/site-content.mjs` dosyasında tutulur. E-posta taslağında alıcıyı otomatik doldurmak için doğrulanmış destek adresini `NEXT_PUBLIC_CONTACT_EMAIL` olarak tanımlayın. Değer boşken taslak yine açılır, alıcı alanını ziyaretçi doldurur. Telefon ve WhatsApp bilgileri doğrulanmadan arayüze eklenmez.

Hizmet ve rehber içeriklerini ekleme/düzenleme adımları için [İçerik yönetimi kılavuzuna](docs/content-management.md) bakın.

## Neon kenar animasyonu

27 Ekim 2026 tarihli tasarım güncellemesi: ilk açılışta iki saniyelik tek tur yerine, yaklaşık 12 saniyelik yavaş ve tekrarlayan bir döngü kullanılır. Işık üstten sağ kenara ilerler, aşağı inerken solar ve sol kenarda yeniden belirir. Alt kenarda yatay ışık çizgisi bulunmaz.

- Stil ve zamanlama: `app/globals.css` içindeki `.neon-entry-glow` kuralları.
- Alt kenarın açık kalması için `::before` alt dolgusu sıfırdır; dört kenara eşit dolgu uygulanmamalıdır.
- Efekt dekoratiftir (`aria-hidden`); tıklamaları engellemez (`pointer-events: none`).
- Hareketi azaltma tercihinde animasyon gösterilmez.
- `tests/neon-entry.test.mjs` döngüyü, erişilebilirlik önlemlerini ve alt kenarın açık kalmasını kontrol eder. Görsel doğrulamada masaüstü ve mobil ekranda tam bir döngü izlenmelidir; build başarısı görsel doğrulamanın yerini tutmaz.
