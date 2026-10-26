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
