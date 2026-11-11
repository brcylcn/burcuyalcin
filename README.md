Canlı site: https://burcuyalcin-frontend.vercel.app

# Kampüs Etkinlikleri

Burcu Yalçın · C2221031010

Fakültedeki seminer, atölye, söyleşi ve yarışmaları listeleyen web uygulaması. Repoda iki ayrı uygulama var: arayüzü gösteren **frontend** ve etkinlikleri JSON olarak veren **backend**.

| Klasör | Teknoloji | Adres | Durum |
| --- | --- | --- | --- |
| `frontend/` | React + TypeScript + Vite | `localhost:5173` · Vercel'de yayında | Sprint 4–6 |
| `backend/` | Node.js + Express (REST API) | `localhost:3000` | Sprint 7 (canlıya alınmadı) |

## Repo yapısı

```
kampus_etkinlik/
  frontend/    React uygulaması (10 sayfa, React Router, Context, form doğrulama)
  backend/     Express REST API (health, GET liste, GET tek, POST)
  README.md
```

## Frontend'i çalıştırma

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

**Özellikler (Sprint 6 · Vize):**
- **React Router:** 10 sayfa ve dinamik adresler (`/events/:id`, `/admin/:id/edit`)
- **Context API:** etkinlik listesi ile ekleme, güncelleme ve silme tek yerde
- **Form doğrulama:** etkinlik formu, giriş, kayıt ve şifremi unuttum
- **Responsive yönetim paneli:** masaüstünde tablo, mobilde kart görünümü

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
cp .env.example .env   # ilk kurulumda
npm run dev            # http://localhost:3000
```

| Method | Endpoint | Başarılı | Hata |
| --- | --- | --- | --- |
| GET | `/health` | 200 | — |
| GET | `/events` | 200 | — |
| GET | `/events/:id` | 200 | 404 |
| POST | `/events` | 201 | 400 |

REST sözleşmesinin tamamı, PORT ayarı ve hata biçimi için: [backend/README.md](backend/README.md). Postman istekleri: `backend/requests/kampus-api.json`.
