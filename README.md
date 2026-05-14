<div align="center">
  <img src="https://cdn.envoyou.com/brand/logoEnvoyou.png" alt="Envoyou Logo" width="100" height="100" />
  
  # Envoyou Hub
  
  **The Dynamic Bento Grid Portfolio Ecosystem**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

## 📸 Preview

<div align="center">
  <img src="https://cdn.envoyou.com/brand/envoyouHub.jpeg" alt="Envoyou Preview" width="100%" />
  <p><i>Tampilan antarmuka Envoyou Hub yang bersih dan responsif.</i></p>
</div>

---

## 🧐 About

**Envoyou Hub** adalah pusat ekosistem digital (landing page utama) untuk Envoyou. Dibangun dengan desain *Bento Grid* berarsitektur *Glassmorphism* modern, platform ini berfungsi sebagai agregator yang menarik data kehadiran (*presence*) dari berbagai sumber secara *real-time*, menjadikannya sebuah entitas digital yang hidup.

## 🚀 Fitur Utama

- **⚡ Blazing Fast ISR**: Memanfaatkan *Incremental Static Regeneration* dari Next.js untuk menarik data *real-time* tanpa mengorbankan kecepatan muat halaman (*zero client latency*).
- **🟢 Dynamic Lanyard Presence**: Sinkronisasi otomatis dengan status Discord untuk menampilkan aktivitas profesional secara langsung.
- **💻 GitHub Activity Sync**: Menampilkan pergerakan dan kontribusi kode terbaru dari repositori secara otomatis.
- **📰 Blog Aggregation**: Terhubung ke backend NestJS API untuk menarik artikel-artikel terbaru dari *Envoyou Blog*.
- **✨ Premium UI/UX**: Desain *Dark Mode Glassmorphism* yang didukung efek kursor berpendar (*glow*) menggunakan *Framer Motion*.
- **🔍 SEO Optimized**: Terstruktur dengan *JSON-LD schema markup* (Person & Organization) serta *Dynamic Sitemap* otomatis.

## 🛠️ Tech Stack

- **Core**: Next.js 15+ (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animation**: Framer Motion
- **Icons**: Lucide React & Custom SVG
- **APIs**: GitHub REST API, Lanyard API, Envoyou Internal API

## 📦 Struktur Proyek

```text
src/
├── app/            # Next.js App Router (Pages, Layouts, API, SEO)
├── components/     # Reusable UI Components
│   └── BentoCard/  # Komponen inti untuk Grid dengan animasi glow
├── lib/
│   └── services/   # Aggregator services (GitHub, Lanyard, Blog)
└── public/         # Static assets & brand images
```

## 🛠️ Memulai Pengembangan

### 1. Persiapan
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 20+) dan [npm](https://www.npmjs.com/).

### 2. Instalasi
```bash
# Clone repositori
git clone https://github.com/hk-dev13/envoyou-hub.git

# Masuk ke direktori
cd envoyou-hub

# Instal dependensi
npm install
```

### 3. Konfigurasi
Buat file `.env.local` dan lengkapi variabel berikut:
```env
# Hubungkan ke backend blog Anda (localhost atau production)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# ID pengguna Discord Anda untuk Lanyard
DISCORD_USER_ID=your_discord_id_here
```

### 4. Jalankan
```bash
npm run dev
```
Aplikasi akan berjalan secara *default* di `http://localhost:3002` (port ini disesuaikan agar tidak bertabrakan dengan backend).

## 🚀 Deployment

Platform ini dioptimalkan penuh untuk [Vercel](https://vercel.com/):

1. Hubungkan repositori ke akun Vercel Anda.
2. Tambahkan *Environment Variables* (`DISCORD_USER_ID` dan `NEXT_PUBLIC_API_URL`).
3. Klik **Deploy**.

## 📄 License

Proyek ini berada di bawah lisensi [MIT](LICENSE).

---

<div align="center">
  Dibuat dengan ❤️ oleh <b>Husni Kusuma</b> untuk <b>Envoyou</b>
</div>
