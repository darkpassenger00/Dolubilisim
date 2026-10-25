# Dolu Bilişim

Dolu Bilişim'in bireysel ve kurumsal teknoloji hizmetleri için Next.js tabanlı web sitesi.

## Geliştirme

```bash
npm ci
npm run dev
```

## Kontroller

```bash
npm test
npm run build
```

İçerik ve hizmet kataloğu `lib/site-content.mjs` dosyasında tutulur. E-posta taslağında alıcıyı otomatik doldurmak için doğrulanmış destek adresini `NEXT_PUBLIC_CONTACT_EMAIL` olarak tanımlayın. Değer boşken taslak yine açılır, alıcı alanını ziyaretçi doldurur. Telefon ve WhatsApp bilgileri doğrulanmadan arayüze eklenmez.

Hizmet ve rehber içeriklerini ekleme/düzenleme adımları için [İçerik yönetimi kılavuzuna](docs/content-management.md) bakın.
