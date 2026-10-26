# Windows'ta siteyi yerel açma

Bu adımlar Git kullanmadan, GitHub'dan indirilen ZIP ile çalışır. `npm` komutu Node.js kurulumu ile gelir.

## 1. Node.js LTS kur

[Node.js'in resmî indirme sayfasından](https://nodejs.org/en/download/) Windows için **LTS** kurulumunu indirip yükle. Kurulum seçeneklerini varsayılan bırak; `npm` ve PATH seçenekleri etkin kalsın. Kurulumdan sonra PowerShell'i (ve açıksa VS Code'u) tamamen kapatıp yeniden aç.

Kurulumu doğrula:

```powershell
node -v
npm -v
```

İki komut da sürüm numarası göstermeli. `npm tanınmıyor` hatası sürerse yeni bir PowerShell penceresi aç; devam ederse Node.js kurulumunu Windows uygulama listesinden **Modify/Repair** ile onar.

## 2. Proje klasörüne geç

GitHub deposunda **Code → Download ZIP** seçeneğiyle ZIP'i indirip çıkar. PowerShell'de `package.json` dosyasının bulunduğu proje klasörüne geç. Örnek:

```powershell
cd "$HOME\Downloads\Dolubilisim-main\Dolubilisim-main"
```

Klasör adın farklıysa yolu ona göre değiştir. Doğru klasörde olduğunu doğrulamak için:

```powershell
Get-ChildItem package.json, package-lock.json
```

`git clone` komutu ZIP yönteminde gerekmez; bilgisayara Git kurmadan da devam edebilirsin.

## 3. Bağımlılıkları yükle ve siteyi aç

```powershell
npm ci
npm run dev
```

PowerShell penceresi açık kalsın, ardından tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç. Geliştirme sunucusunu durdurmak için PowerShell'de `Ctrl+C` tuşlarına bas.

ZIP eski kaldıysa GitHub deposunun güncel **main** dalından yeni ZIP indirip aynı adımları tekrarla.
