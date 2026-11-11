# Kampüs Etkinlikleri (Sprint 6 & Vize Teslimi)

Vercel'de Yayında: https://burcuyalcin-frontend.vercel.app/

Bu proje, React Router, Context API ve Form yönetimi eklenerek tamamen tek sayfalık bir uygulamaya (SPA) dönüştürülmüştür.

## 🚀 Özellikler
- **React Router DOM (v6):** 10 farklı sayfa yapısı ve dinamik adresleme.
- **Context API:** Tüm uygulama genelinde etkinlik verilerini (Ekleme, Silme, Güncelleme, Listeleme) merkezi bir state ile yönetme.
- **Controlled Forms & Doğrulama:** Form validation (Kayıt, Giriş, Etkinlik Ekle/Güncelle).
- **Responsive Yönetim Paneli:** Masaüstünde tablo, mobilde kart görünümüne geçen CSS yapısı.

## 📦 Kurulum ve Çalıştırma

Projeyi yerelde çalıştırmak için:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## 🗺️ Route Haritası
- `/` - Ana Sayfa (HomePage)
- `/events` - Tüm Etkinlikler (EventsPage)
- `/events/:id` - Etkinlik Detayı (EventDetailPage)
- `/admin` - Etkinlik Yönetimi (AdminPage)
- `/admin/new` - Yeni Etkinlik Ekle (AddEventPage)
- `/admin/:id/edit` - Etkinlik Güncelle (EditEventPage)
- `/login` - Giriş Yap (LoginPage)
- `/register` - Kayıt Ol (RegisterPage)
- `/forgot-password` - Şifremi Unuttum (ForgotPasswordPage)
- `*` - Sayfa Bulunamadı (NotFoundPage)


