# Kampüs Etkinlikleri · Backend (Sprint 9)

Burcu Yalçın · C2221031010

Node.js, Express, MongoDB ve Mongoose kullanılarak geliştirilmiş Kampüs Etkinlikleri REST API'sidir.

Sprint 9 ile API tam CRUD yapısına yaklaşmıştır. Etkinlikler MongoDB'de kalıcı olarak tutulur; güncellenebilir, silinebilir, aranabilir, kategoriye göre filtrelenebilir ve yaklaşan etkinlikler ayrı listelenebilir.

## Kullanılan teknolojiler

- Node.js
- Express
- MongoDB
- MongoDB Atlas
- Mongoose
- dotenv
- cors
- Newman

## Proje yapısı

```text
backend/
  src/
    config/
      database.js
    controllers/
      event-controller.js
    data/
      seed-events.js
    models/
      event-model.js
    routes/
      event-routes.js
    utils/
      date.js
    app.js
    seed.js
    server.js
  requests/
    kampus-api.json
    run-results.json
  .env.example
  .gitignore
  package.json
```

## Kurulum

```bash
cd backend
npm install
cp .env.example .env
```

`.env.example`:

```text
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

Gerçek MongoDB Atlas URI'si yalnızca yerel `.env` dosyasında tutulmalıdır.

## Seed

Veritabanını 6 örnek etkinlikle doldurmak için:

```bash
npm run seed
```

Seed işlemi önce mevcut etkinlikleri siler, ardından 6 örnek etkinliği yeniden ekler.

Seed verilerinde geçmiş ve gelecek tarihli etkinlikler bulunur. Böylece `/events/upcoming` endpoint'i test edilebilir.

## Sunucuyu çalıştırma

```bash
npm run dev
```

Adres:

```text
http://localhost:3000
```

## Tarih sistemi

API'de tarihler:

```text
GG-AA-YYYY
```

biçiminde kullanılır.

Örnek:

```text
15-10-2026
```

MongoDB tarafında ise tarih gerçek `Date` olarak saklanır.

Dönüşüm işlemleri:

```text
src/utils/date.js
```

dosyasında yapılır.

- `parseDate()` → `GG-AA-YYYY` değerini `Date` nesnesine çevirir.
- `formatDate()` → MongoDB Date değerini tekrar `GG-AA-YYYY` biçiminde döndürür.
- `todayStart()` → yaklaşan etkinlik sorgusu için bugünün başlangıcını üretir.

## Event Schema

Mongoose modeli:

```text
src/models/event-model.js
```

| Alan | Kural |
| --- | --- |
| `title` | Zorunlu, trim, 3–100 karakter |
| `category` | Zorunlu, enum |
| `capacity` | Minimum 0, varsayılan 0 |
| `date` | Zorunlu, Date |
| `time` | Varsayılan boş metin |
| `location` | Trim |
| `description` | Trim, maksimum 500 karakter |

Geçerli kategoriler:

```text
Seminer
Atölye
Söyleşi
Yarışma
```

Schema'da `timestamps: true` kullanıldığı için `createdAt` ve `updatedAt` otomatik oluşturulur.

## REST API

| Method | Endpoint | Amaç | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu kontrolü | 200 | — |
| GET | `/events?search=&category=` | Listeleme, arama ve filtreleme | 200 | — |
| GET | `/events/upcoming` | Yaklaşan etkinlikler | 200 | — |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 |
| POST | `/events` | Etkinlik oluştur | 201 | 400 |
| PATCH | `/events/:id` | Etkinlik güncelle | 200 | 400, 404 |
| DELETE | `/events/:id` | Etkinlik sil | 204 | 404 |

## GET /events

Tüm etkinlikleri tarihe göre sıralı getirir.

```text
GET /events
```

### Arama

Başlıkta büyük/küçük harf duyarsız arama:

```text
GET /events?search=atölye
```

### Kategori filtresi

```text
GET /events?category=Atölye
```

### Arama + kategori

```text
GET /events?search=atölye&category=Atölye
```

## GET /events/upcoming

Bugün ve sonrasındaki etkinlikleri en yakın tarihten başlayarak getirir:

```text
GET /events/upcoming
```

Geçmiş tarihli seed kayıtları bu listede bulunmaz.

## GET /events/:id

MongoDB `_id` değeri kullanılır:

```text
GET /events/<mongodb_id>
```

Geçersiz veya bulunamayan id:

```text
404 Not Found
```

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

## POST /events

```text
POST /events
```

Örnek:

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "20-12-2026",
  "capacity": 30
}
```

Başarılı:

```text
201 Created
```

Eksik veya geçersiz veri:

```text
400 Bad Request
```

Yanlış tarih biçimi de 400 döner.

Örneğin:

```text
2026-12-20
```

yerine:

```text
20-12-2026
```

kullanılmalıdır.

## PATCH /events/:id

PATCH yalnızca gönderilen alanları değiştirir.

Örnek:

```json
{
  "capacity": 55
}
```

Başarılı:

```text
200 OK
```

ve güncellenmiş kayıt döner.

Güncellemede schema doğrulaması çalışır.

Örneğin:

```json
{
  "category": "Parti"
}
```

400 döner.

Boş body:

```json
{}
```

400 döner:

```json
{
  "error": {
    "message": "Body is empty"
  }
}
```

Aşağıdaki alanlar PATCH ile değiştirilemez:

```text
_id
createdAt
updatedAt
__v
```

## DELETE /events/:id

```text
DELETE /events/<mongodb_id>
```

Başarılı silme:

```text
204 No Content
```

204 yanıtında gövde bulunmaz.

Aynı kayıt tekrar silinirse:

```text
404 Not Found
```

Geçersiz id de 404 döner.

## Route sırası

`/events/upcoming`, `/:id` route'undan önce tanımlanmıştır.

Doğru sıra:

```text
GET /
GET /upcoming
GET /:id
POST /
PATCH /:id
DELETE /:id
```

Böylece Express `"upcoming"` kelimesini MongoDB id'si olarak değerlendirmez.

## Postman ve Newman

Sprint 9 collection:

```text
requests/kampus-api.json
```

Runner sonucu:

```text
requests/run-results.json
```

Hocanın otomatik testi:

```bash
newman run https://webdersi.vercel.app/test.json
```

Beklenen sonuç:

```text
18 istek
45 test
0 hata
```

Sprint 9 testi Newman ve Postman Collection Runner ile başarıyla çalıştırılmıştır.

## Güvenlik

GitHub'da bulunmaması gerekenler:

```text
.env
node_modules/
```

Gerçek MongoDB Atlas kullanıcı adı, şifresi ve bağlantı URI'si aşağıdaki yerlere yazılmaz:

```text
README
.env.example
Postman collection
kaynak kod
```