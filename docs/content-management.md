# İçerik yönetimi

Hizmet sayfaları ve SEO rehberleri tek birer düzenlenebilir veri kataloğundan oluşturulur. İçerik değişikliklerini GitHub'da incelemek ve geri almak kolay olsun diye yeni bir CMS bağımlılığı eklenmemiştir.

## Hizmet ekleme veya düzenleme

Hizmet kataloğu `lib/site-content.mjs` içindeki `services` dizisidir. Her hizmet için:

- `id`: URL'de kullanılan, küçük harfli ve sabit kimlik. Örneğin `microsoft-365`.
- `audience`: `individual`, `business` veya `both`. Bu değer formdaki hizmet seçeneklerini ve sayfadaki kitle etiketini belirler.
- `title` ve `detail`: Kart, hizmet sayfası ve meta açıklamasında kullanılan metinler.
- `relatedServiceIds`: Sayfanın altındaki ilgili hizmet bağlantıları.
- `safetyNotice`: Yalnızca özel güvenlik veya rıza notu gereken hizmetlerde kullanılır.

Yeni `id` değerini değiştirmek mevcut bağlantıları etkiler. Her hizmetin en az bir geçerli ilgili hizmet kimliği olduğundan emin olun. Katalog, ana sayfa kartlarını, statik hizmet sayfalarını, metadata'yı ve site haritası adreslerini otomatik üretir.

## Rehber ekleme veya düzenleme

Rehber kataloğu `lib/seo-guides.mjs` içindeki `seoGuides` dizisidir. Her kayıtta:

- `slug`: Değiştirilmemesi tercih edilen URL kimliği.
- `title`, `description`, `category`: Sayfa başlığı, arama açıklaması ve kategori.
- `readingTime`, `publishedAt`, `updatedAt`: Tahmini okuma süresi, yayın tarihi ve içeriğin son güncellendiği tarih (`YYYY-AA-GG`). İçeriği düzenlediğinizde `updatedAt` değerini de güncelleyin; sitemap bu tarihi arama motorlarına iletir.
- `sections`: Başlıklar ve paragraf dizileri.
- `sources`: Kullanılan kaynakların başlığı ve tam URL'si. Kaynak gereken rehberlerde birincil, güncel ve güvenilir sayfaları ekleyin.

Rehber içeriği ana sayfadaki rehber kartına, statik rehber sayfasına, arama metadata'sına ve site haritasına otomatik yansır. SEO metinlerinde sıralama garantisi veya doğrulanmamış başarı iddiaları kullanmayın.

## Kontrol listesi

İçerik değişikliğinden sonra:

1. Türkçe yazımı ve bağlantı kimliklerini kontrol edin.
2. Hizmetlerde kitle seçimini ve ilgili bağlantıların geçerliliğini doğrulayın.
3. Rehberlerde yayın tarihini, bölümlerin başlıklarını ve kaynak URL'lerini gözden geçirin.
4. `npm test` ve `npm run build` çalıştırın; oluşturulan hizmet/rehber sayfalarının build çıktısında yer aldığını kontrol edin.

## İletişim bilgileri

Resmî e-posta, telefon ve WhatsApp bilgilerini doğrulamadan içeriklere eklemeyin. Destek bilgileri `.env.example` içinde açıklanan `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_SUPPORT_PHONE` ve `NEXT_PUBLIC_WHATSAPP_NUMBER` değişkenlerinden yapılandırılır. Değerler boşken telefon bağlantıları gösterilmez ve talep formu alıcı adresi boş olan bir e-posta taslağı açar.
