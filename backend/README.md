# Kampüs Etkinlikleri · Backend (Sprint 7)

Burcu Yalçın · C2221031010

Express ile yazılmış REST API. Etkinlikleri JSON olarak verir. Veriler şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler silinir. Sprint 8'de MongoDB'ye taşınacak.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # ilk kurulumda
npm run dev            # node --watch: dosya değişince sunucu yeniden başlar
```

Sunucu: `http://localhost:3000` · Kontrol: `http://localhost:3000/health`

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme: dosya değişince sunucu kendini yeniden başlatır |
| `npm start` | Sunucuyu normal başlatır |

## Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. `.env` dosyasından okunur. |

`.env` GitHub'a gönderilmez (`.gitignore`). Hangi değişkenlerin gerektiği `.env.example` içinde yazar.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

**Bütün hatalar aynı biçimde:**

```json
{ "error": { "message": "Event not found" } }
```

### Etkinlik nesnesi

```json
{
  "id": "event-2",
  "title": "Flutter ile Mobil Uygulama Atölyesi",
  "category": "Atölye",
  "capacity": 25,
  "date": "2026-11-25",
  "time": "10:30",
  "location": "Yazılım Laboratuvarı 3",
  "description": "Adım adım basit bir yapılacaklar listesi uygulaması geliştiriyoruz."
}
```

### POST /events

Zorunlu alanlar: `title`, `category`, `date`. Diğerleri isteğe bağlı (`capacity` yoksa 0, metin alanları yoksa boş). `id` sunucu tarafından verilir.

```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "2026-12-01", "capacity": 30 }
```

Eksikse `400`: `{ "error": { "message": "title, category and date are required" } }`

### GET /health yanıtı

```json
{ "status": "ok", "time": "2026-11-11T09:46:43.247Z", "student": "C2221031010" }
```

## Postman

`requests/kampus-api.json` dosyasını Postman'de **Import** ile açın. "Kampüs API" collection'ında 6 istek var:

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt |
| 3 | GET /events/event-2 | 200 · event-2 |
| 4 | GET /events/yok | 404 · error |
| 5 | POST /events (tam body) | 201 · yeni id |
| 6 | POST /events (sadece title) | 400 · error |
