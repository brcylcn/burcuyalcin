# Kampüs Etkinlikleri · Backend (Sprint 8)

Burcu Yalçın · C2221031010

Node.js, Express, MongoDB ve Mongoose kullanılarak geliştirilmiş Kampüs Etkinlikleri REST API'sidir.

Sprint 7'de etkinlikler JavaScript dizisinde ve bellekte tutuluyordu. Sprint 8 ile birlikte veriler MongoDB'ye taşındı. Bu nedenle sunucu kapatılıp yeniden başlatıldığında POST ile eklenen etkinlikler kaybolmaz.

## Kullanılan teknolojiler

- Node.js
- Express
- MongoDB
- MongoDB Atlas
- Mongoose
- dotenv
- cors

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
    app.js
    seed.js
    server.js
  requests/
    kampus-api.json
  .env.example
  .gitignore
  package.json
```

## Kurulum

Backend klasörüne girin:

```bash
cd backend
```

Paketleri yükleyin:

```bash
npm install
```

Örnek ortam değişkeni dosyasını kopyalayın:

```bash
cp .env.example .env
```

`.env.example` içeriği:

```text
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

MongoDB Atlas kullanılacaksa gerçek bağlantı URI'si yalnızca yerel `.env` dosyasına yazılmalıdır.

Gerçek MongoDB kullanıcı adı, şifresi veya bağlantı adresi hiçbir zaman README, `.env.example`, Postman collection veya kaynak kod içine yazılmamalıdır.

## Ortam değişkenleri

| Değişken | Açıklama |
| --- | --- |
| `PORT` | Express sunucusunun çalışacağı port |
| `MONGODB_URI` | MongoDB bağlantı adresi |

`.env` dosyası GitHub'a gönderilmez.

## Veritabanı bağlantısı

MongoDB bağlantısı ayrı bir modülde bulunur:

```text
src/config/database.js
```

Bağlantı adresi:

```js
process.env.MONGODB_URI
```

üzerinden okunur.

Uygulama önce MongoDB bağlantısını kurar, ardından Express sunucusunu başlatır.

Başarılı bağlantıda terminalde buna benzer bir çıktı görülür:

```text
MongoDB bağlandı (Atlas): <host>/kampus
API: http://localhost:3000
```

Gerçek bağlantı URI'si terminale yazdırılmaz.

## Seed verileri

Projede 6 örnek etkinlik bulunur:

```text
src/data/seed-events.js
```

Veritabanını örnek verilerle doldurmak için:

```bash
npm run seed
```

Seed işlemi önce mevcut etkinlikleri siler, ardından 6 örnek etkinliği yeniden ekler.

Bu nedenle komut iki kez çalıştırıldığında kayıt sayısı 12 olmaz; yine 6 kayıt bulunur.

```bash
npm run seed
npm run seed
```

Beklenen çıktı:

```text
6 etkinlik eklendi
```

MongoDB `_id` alanını otomatik oluşturur. Seed verilerinde manuel `id` alanı kullanılmaz.

## Sunucuyu çalıştırma

Geliştirme modunda:

```bash
npm run dev
```

Normal başlatma:

```bash
npm start
```

Sunucu:

```text
http://localhost:3000
```

Health-check:

```text
http://localhost:3000/health
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Sunucuyu watch modunda başlatır |
| `npm start` | Sunucuyu normal olarak başlatır |
| `npm run seed` | MongoDB'yi 6 örnek etkinlikle yeniden doldurur |

## Event Schema

Mongoose modeli:

```text
src/models/event-model.js
```

Etkinlik alanları:

| Alan | Kural |
| --- | --- |
| `title` | Zorunlu, trim, 3–100 karakter |
| `category` | Zorunlu, enum |
| `capacity` | Minimum 0, varsayılan 0 |
| `date` | Zorunlu |
| `time` | Varsayılan boş metin |
| `location` | Trim, varsayılan boş metin |
| `description` | Trim, maksimum 500 karakter |

Geçerli kategoriler:

```text
Seminer
Atölye
Söyleşi
Yarışma
```

Schema'da:

```js
timestamps: true
```

kullanıldığı için MongoDB kayıtlarında otomatik olarak:

```text
createdAt
updatedAt
```

alanları bulunur.

## REST API

| Method | Endpoint | Amaç | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu kontrolü | 200 | — |
| GET | `/events` | Etkinlikleri getir | 200 | — |
| GET | `/events/:id` | Tek etkinliği getir | 200 | 404 |
| POST | `/events` | Yeni etkinlik oluştur | 201 | 400 |

## GET /health

İstek:

```text
GET http://localhost:3000/health
```

Örnek yanıt:

```json
{
  "status": "ok",
  "time": "2026-11-18T06:37:58.261Z",
  "student": "C2221031010"
}
```

## GET /events

İstek:

```text
GET http://localhost:3000/events
```

Seed işleminden sonra 6 etkinlik döner.

Kategori filtresi isteğe bağlıdır:

```text
GET /events?category=Atölye
```

Etkinlikler MongoDB'den okunur ve tarihe göre sıralanır.

Örnek kayıt:

```json
{
  "_id": "MongoDB tarafından oluşturulan id",
  "title": "Bulut Bilişime Giriş Semineri",
  "category": "Seminer",
  "capacity": 120,
  "date": "2026-11-20",
  "time": "14:00",
  "location": "Mühendislik Fakültesi Mavi Salon",
  "description": "Bulutta ilk sanal sunucunu kurmak için bilmen gereken temel kavramlar.",
  "createdAt": "MongoDB timestamp",
  "updatedAt": "MongoDB timestamp"
}
```

## GET /events/:id

Sprint 7'de kullanılan:

```text
event-1
event-2
```

gibi ID'ler artık kullanılmaz.

Önce `GET /events` ile etkinlik listesi alınır ve istenen kaydın MongoDB `_id` değeri kopyalanır.

İstek:

```text
GET http://localhost:3000/events/<mongodb_id>
```

Kayıt bulunursa:

```text
200 OK
```

Kayıt yoksa:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

ve:

```text
404 Not Found
```

döner.

Geçersiz MongoDB ObjectId değerleri de 500 yerine 404 döner.

Örnek:

```text
GET /events/yok
```

Sonuç:

```text
404 Not Found
```

## POST /events

İstek:

```text
POST http://localhost:3000/events
```

Örnek body:

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30
}
```

Başarılı olduğunda:

```text
201 Created
```

döner ve MongoDB tarafından otomatik `_id`, `createdAt` ve `updatedAt` alanları oluşturulur.

## Validation

`title`, `category` ve `date` zorunludur.

Örneğin yalnızca:

```json
{
  "title": "Git Atölyesi"
}
```

gönderilirse Mongoose schema doğrulaması başarısız olur ve:

```text
400 Bad Request
```

döner.

Hata biçimi:

```json
{
  "error": {
    "message": "Event validation failed: ..."
  }
}
```

Validation hatası sunucuyu durdurmaz.

## Hata yönetimi

Eşleşmeyen route'lar:

```json
{
  "error": {
    "message": "Route not found"
  }
}
```

ile 404 döner.

Beklenmeyen sunucu hataları merkezi Express error middleware'i tarafından yakalanır ve istemciye:

```json
{
  "error": {
    "message": "Server error"
  }
}
```

yanıtı gönderilir.

## Kalıcılık testi

MongoDB entegrasyonunu doğrulamak için:

1. `npm run seed` çalıştırılır.
2. `npm run dev` ile sunucu başlatılır.
3. `POST /events` ile yeni etkinlik eklenir.
4. Sunucu `Ctrl + C` ile kapatılır.
5. `npm run dev` ile tekrar başlatılır.
6. `GET /events` çalıştırılır.

POST ile eklenen etkinlik listede hâlâ bulunuyorsa MongoDB kalıcılığı çalışıyor demektir.

## Postman

Postman collection:

```text
requests/kampus-api.json
```

Postman'de **Import** ile açılabilir.

Collection'da 6 temel istek bulunur:

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET `/health` | 200 |
| 2 | GET `/events` | 200 |
| 3 | GET `/events/<mongodb_id>` | 200 |
| 4 | GET `/events/yok` | 404 |
| 5 | POST `/events` (tam body) | 201 |
| 6 | POST `/events` (eksik body) | 400 |

Tek etkinlik isteğinde `_id`, `GET /events` sonucundan kopyalanmalıdır.

## Güvenlik

GitHub repository'sinde bulunmaması gerekenler:

```text
.env
node_modules/
```

Gerçek Atlas URI'si ve veritabanı şifresi aşağıdaki dosyalara yazılmamalıdır:

```text
README.md
.env.example
Postman collection
kaynak kod
```

Repository'de yalnızca örnek bağlantı bilgisini içeren `.env.example` tutulur.