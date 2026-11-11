# Kampüs Etkinlik API

## Çalıştırma Komutları
- Paket Kurulumu: `npm install`
- Geliştirme Sunucusunu Başlatma: `npm run dev`
- Canlı Sunucuyu Başlatma: `npm start`

*PORT ayarı `.env` dosyasından okunmaktadır (Varsayılan: 3000).*

## REST Sözleşmesi

| Method | Endpoint      | Amaç           | Başarılı | Hata     |
|--------|---------------|----------------|----------|----------|
| GET    | /events       | Listeyi getir  | 200      | -        |
| GET    | /events/:id   | Tek etkinlik   | 200      | 404      |
| POST   | /events       | Yeni etkinlik  | 201      | 400      |