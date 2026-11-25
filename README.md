Canlı site: https://burcuyalcin-frontend.vercel.app

# Kampüs Etkinlikleri

Burcu Yalçın · C2221031010

Fakültedeki seminer, atölye, söyleşi ve yarışmaları listeleyen web uygulaması. Proje iki ayrı uygulamadan oluşur:

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + MongoDB + Mongoose REST API

| Klasör | Teknoloji | Adres | Durum |
| --- | --- | --- | --- |
| `frontend/` | React + TypeScript + Vite | `localhost:5173` · Vercel'de yayında | Sprint 4–6 |
| `backend/` | Node.js + Express + MongoDB + Mongoose | `localhost:3000` | Sprint 9 |

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

## Backend'i çalıştırma

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Backend geliştirme adresi:

```text
http://localhost:3000
```

`.env` dosyasında MongoDB bağlantısı tanımlanmalıdır:

```text
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

MongoDB Atlas kullanılıyorsa gerçek bağlantı adresi yalnızca `.env` dosyasına yazılır.

## Sprint 9 özellikleri

- MongoDB ve Mongoose ile kalıcı veri
- PATCH ile kısmi etkinlik güncelleme
- DELETE ile etkinlik silme
- `?search=` ile başlıkta arama
- `?category=` ile kategori filtresi
- `/events/upcoming` ile yaklaşan etkinlikleri listeleme
- API tarih biçimi: `GG-AA-YYYY`
- MongoDB içinde tarihlerin gerçek `Date` olarak tutulması
- Mongoose schema doğrulaması
- Geçersiz veya bulunamayan id için 404
- DELETE başarılı olduğunda 204 No Content
- Newman ve Postman Runner ile otomatik test

## API

| Method | Endpoint | Açıklama | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu kontrolü | 200 | — |
| GET | `/events?search=&category=` | Listeleme, arama ve filtreleme | 200 | — |
| GET | `/events/upcoming` | Yaklaşan etkinlikleri listele | 200 | — |
| GET | `/events/:id` | Tek etkinliği getir | 200 | 404 |
| POST | `/events` | Yeni etkinlik oluştur | 201 | 400 |
| PATCH | `/events/:id` | Etkinliği güncelle | 200 | 400, 404 |
| DELETE | `/events/:id` | Etkinliği sil | 204 | 404 |

## Tarih biçimi

API'de tarihler:

```text
GG-AA-YYYY
```

biçimindedir.

Örnek:

```text
20-12-2026
```

MongoDB'de tarihler gerçek `Date` olarak saklanır. Böylece sıralama ve yaklaşan etkinlik sorguları doğru çalışır.

## Test

Sprint 9 otomatik testi:

```bash
newman run https://webdersi.vercel.app/test.json
```

Beklenen sonuç:

```text
18 istek
45 test
0 hata
```

Runner sonucu:

```text
backend/requests/run-results.json
```

Sprint 9 Postman collection:

```text
backend/requests/kampus-api.json
```

## Güvenlik

Gerçek MongoDB bağlantı adresi ve şifre GitHub'a gönderilmez.

GitHub'da bulunmaması gerekenler:

```text
.env
node_modules/
```

Repository'de yalnızca örnek ortam değişkenlerini içeren `.env.example` bulunur.

Backend ayrıntıları için:

```text
backend/README.md
```