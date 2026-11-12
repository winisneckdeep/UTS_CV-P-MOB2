# Personal CV & Academic Score App

Proyek UTS Pemrograman Mobile 2 untuk membuat aplikasi mobile CV mahasiswa dan informasi capaian akademik menggunakan React Native dan Expo.

Aplikasi ini menggunakan Expo dan React Native dengan data lokal. Tidak ada Google AI atau penyedia AI lain yang dikonfigurasi.

## Identitas Akademik

| Informasi | Data |
|---|---|
| Nama | Mochamad Adam Miftah Faridl |
| NIM | 242505001 |
| Fakultas | Komputer |
| Program Studi | Sistem Informasi (SI-R-5) |
| Mata Kuliah | Pemrograman Mobile 2 |
| Dosen | Iin, M.Kom |

Target proyek adalah Challenge Level 10. Level pada tantangan bersifat kumulatif; penilaian akhir tetap mengikuti verifikasi dosen dan kriteria pada dokumen UTS.

## Kesesuaian dengan Tantangan

- **Level 1–3 — Profil, layout, dan styling:** Beranda menampilkan nama, NIM, avatar representatif, profesi, dan deskripsi dengan layout yang menyesuaikan layar ponsel.
- **Level 4 — Interaksi:** Form kontak menerima nama, email, dan pesan; menangani perubahan input, memvalidasi isian, dan memberikan umpan balik.
- **Level 5–6 — Pemisahan data:** Profil, keterampilan, portofolio, kontak, dan data akademik disimpan terpisah di `data/` dalam JSON.
- **Level 7 — Konten dinamis:** Keterampilan dan proyek dirender dari data lokal.
- **Level 8 — My Score:** Menampilkan identitas akademik, nilai 89, grade A, 12.375 LP, serta progres Attendance 100%, Practice 87%, Quest 95%, dan Challenge 100%.
- **Level 9 — Multi-screen:** Expo Router menyediakan Beranda, Tentang, Skills, Portofolio, My Score, dan Kontak.
- **Level 10 — Pengalaman aplikasi:** Memiliki tampilan kosong untuk portofolio, validasi dan status formulir, navigasi konsisten, dokumentasi, dan langkah pemeriksaan fitur utama.

Nilai My Score merupakan data dummy lokal untuk kebutuhan UTS. Formulir kontak hanya mensimulasikan pemrosesan dan **tidak mengirim email atau menyimpan pesan ke server**. Integrasi API Academic War LMS tidak digunakan dan tidak diwajibkan untuk UTS.

## Gaya Antarmuka

Antarmuka menggunakan gaya ringkas dan terstruktur untuk aplikasi mobile: header navy, aksen biru, latar netral, kartu informasi, dan aksen warna lembut. Gambar referensi digunakan sebagai inspirasi visual saja; isi aplikasi tetap berfokus pada CV mahasiswa dan informasi akademik sesuai dokumen UTS.

## Struktur Proyek

```text
pmob2-project/
├── app/
│   ├── _layout.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── about.tsx
│       ├── skills.tsx
│       ├── portfolio.tsx
│       ├── score.tsx
│       └── contact.tsx
├── components/
│   ├── AcademicDashboard.jsx
│   ├── ContactForm.jsx
│   ├── PortfolioCard.jsx
│   ├── ProfileHeader.jsx
│   ├── ScreenHeader.jsx
│   └── SkillCard.jsx
├── constants/design.js
├── data/
│   ├── academicData.json
│   ├── portfolio.json
│   ├── profile.json
│   └── skills.json
├── app.json
└── package.json
```

## Menjalankan Aplikasi

Pastikan Node.js sudah terpasang, lalu jalankan dari direktori proyek:

```powershell
npm install
npx expo start
```

Setelah Expo Dev Tools berjalan, pindai kode QR dengan Expo Go di perangkat atau gunakan pintasan yang ditampilkan di terminal untuk menjalankan aplikasi di Android, iOS, atau web. Untuk memulai langsung di platform tertentu, gunakan:

```powershell
npm run android
npm run ios
npm run web
```

## Pemeriksaan Fitur Utama

1. Jalankan aplikasi dan pastikan nama, NIM, profesi, deskripsi, serta avatar terlihat di Beranda.
2. Buka setiap tab dan pastikan informasi profil, keterampilan, portofolio, dan My Score tampil.
3. Kirim formulir Kontak yang kosong untuk memeriksa validasi; isi nama, email valid, dan pesan untuk memeriksa status demo berhasil.
4. Kosongkan array proyek di `data/portfolio.json` sementara untuk memeriksa empty state, lalu pulihkan datanya.

## Referensi

Persyaratan fitur dan level mengikuti dokumen **UTS MOB2 - Iin, M.Kom - 20261 React Native**. Referensi CV yang disebut dalam dokumen: [kangsolihin.vercel.app](https://kangsolihin.vercel.app/).
