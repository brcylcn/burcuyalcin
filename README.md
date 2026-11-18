Canlı site: https://burcuyalcin-frontend.vercel.app

# Kampüs Etkinlikleri

Burcu Yalçın · C2221031010

Fakültedeki seminer, atölye, söyleşi ve yarışmaları listeleyen web uygulaması. Proje iki ayrı uygulamadan oluşur:

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + MongoDB + Mongoose REST API

| Klasör | Teknoloji | Adres | Durum |
| --- | --- | --- | --- |
| `frontend/` | React + TypeScript + Vite | `localhost:5173` · Vercel'de yayında | Sprint 4–6 |
| `backend/` | Node.js + Express + MongoDB + Mongoose | `localhost:3000` | Sprint 8 |

## Repo yapısı

```text
kampus-etkinlik/
  frontend/    React uygulaması
  backend/     Express + MongoDB REST API
  README.md
```

## Frontend'i çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Frontend geliştirme adresi:

```text
http://localhost:5173
```

### Frontend özellikleri

- React Router ile sayfa yönlendirmeleri
- Context API ile etkinlik yönetimi
- Etkinlik ekleme ve düzenleme formları
- Form doğrulama
- Responsive yönetim paneli
- Etkinlik listeleme ve detay sayfaları

| Adres | Sayfa |
| --- | --- |
| `/` | Ana Sayfa |
| `/events` | Tüm Etkinlikler |
| `/events/:id` | Etkinlik Detayı |
| `/admin` | Etkinlik Yönetimi |
| `/admin/new` | Yeni Etkinlik |
| `/admin/:id/edit` | Etkinlik Güncelle |
| `/login` | Giriş Yap |
| `/register` | Kayıt Ol |
| `/forgot-password` | Şifremi Unuttum |
| `*` | Sayfa Bulunamadı |

## Backend'i çalıştırma

```bash
cd backend
npm install
cp .env.example .env
```

`.env` dosyasında MongoDB bağlantı adresi tanımlanmalıdır:

```text
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

MongoDB Atlas kullanılıyorsa gerçek bağlantı adresi yalnızca `.env` dosyasına yazılır.

İlk örnek verileri eklemek için:

```bash
npm run seed
```

Sunucuyu başlatmak için:

```bash
npm run dev
```

Backend geliştirme adresi:

```text
http://localhost:3000
```

## Backend özellikleri

- Express REST API
- MongoDB Atlas bağlantısı
- Mongoose Schema ve Model
- Kalıcı etkinlik verileri
- 6 kayıtlık seed verisi
- MongoDB tarafından oluşturulan `_id`
- Schema doğrulaması
- Merkezi hata middleware'i
- Kategoriye göre etkinlik filtreleme

## API

| Method | Endpoint | Açıklama | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu kontrolü | 200 | — |
| GET | `/events` | Etkinlikleri listele | 200 | — |
| GET | `/events/:id` | Tek etkinliği getir | 200 | 404 |
| POST | `/events` | Yeni etkinlik oluştur | 201 | 400 |

Etkinlikler artık bellekte değil MongoDB'de saklanır. Bu nedenle POST ile oluşturulan kayıtlar sunucu kapatılıp yeniden başlatıldığında korunur.

Backend ayrıntıları için:

```text
backend/README.md
```

Postman collection:

```text
backend/requests/kampus-api.json
```

## Güvenlik

Gerçek MongoDB bağlantı adresi ve şifre GitHub'a gönderilmez.

Aşağıdakiler `.gitignore` ile repository dışında tutulur:

```text
.env
node_modules/
```

Repository'de yalnızca örnek ortam değişkenlerini içeren `.env.example` bulunur.