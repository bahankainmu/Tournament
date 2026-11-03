# RRQ Tournament

Landing page satu halaman (single-page) berisi katalog seluruh turnamen RRQ.
Tema hitam dengan aksen emas. Dibuat dengan HTML, CSS, dan JavaScript murni,
tanpa framework dan tanpa proses build.

## Isi halaman

- **Menu kanan atas:** About Us, Tournament, Social Media
- **Hero:** judul RRQ Tournament dan tombol menuju katalog
- **About Us:** cerita, statistik, dan tiga poin keunggulan
- **Tournament:** 9 kartu turnamen, klik untuk membuka popup detail
- **Social Media:** Instagram @rrq_tournament

## Struktur file

```
.
├── index.html     # struktur & teks halaman
├── style.css      # gaya, warna, font, responsif
├── script.js      # data turnamen, popup, animasi
├── README.md
└── assets/        # logo turnamen (9 file)
    ├── kok-goes-to-school.png
    ├── bni-king-of-school.png
    ├── promatch-kings.jpg
    ├── rrq-mabar-highschool.png
    ├── rrq-cup.png
    ├── rrq-cup-community.png
    ├── rrq-arena-highschool.png
    ├── popmie-mst.png
    └── rrq-school-championship.png
```

Folder `assets/` harus ada di samping `index.html`, dengan nama file persis seperti di atas.

## Menjalankan di komputer

Klik dua kali `index.html`, atau gunakan server lokal:

```bash
python -m http.server 8000
# lalu buka http://localhost:8000
```

## Deploy (publikasi online)

| Platform | Cara singkat |
|---|---|
| **GitHub Pages** | Upload semua file **dan folder `assets`** ke repo, lalu Settings > Pages > branch `main`, folder `/ (root)`. |
| **Netlify** | Buka app.netlify.com/drop, seret satu folder proyek ke halaman tersebut. |
| **Cloudflare Pages** | Create project > Upload assets > unggah folder. |
| **Vercel** | Import repo GitHub, preset "Other", tanpa build command. |

Setelah deploy, perubahan bisa butuh 1-2 menit untuk tampil. Jika belum berubah, tekan
`Ctrl + Shift + R` untuk menyegarkan tanpa cache.

## Kustomisasi

### 1. Menambah / mengubah turnamen
Buka `script.js`, edit daftar `TOURNAMENTS`. Satu blok = satu kartu + satu popup:

```js
{
  name: "Nama Turnamen",
  stat: "500+ Tim",                 // label kecil di kartu & popup
  img: "assets/nama-logo.png",      // file logo di folder assets
  desc: "Keterangan yang tampil di popup.",
  subs: ["Sub 1", "Sub 2"],         // opsional: daftar di popup
  bg: "#ffffff",                    // opsional: latar kotak logo (untuk logo berlatar solid)
  maxW: 300,                        // opsional: batas lebar logo (px) untuk logo beresolusi kecil
}
```

Urutan di daftar = urutan kartu di halaman.

### 2. Mengganti logo
Timpa file di `assets/` dengan nama yang sama. Logo transparan (PNG) paling cocok di
latar gelap. Untuk logo berlatar putih (JPG), isi `bg` dengan warna latar logonya.
Tiga logo (King of Kings, BNI, Promatch) beresolusi kecil, jadi bila punya versi lebih besar, gunakan itu.

### 3. Teks About Us, statistik, dan poin keunggulan
Edit langsung di `index.html`. Angka statistik diubah lewat atribut `data-count` dan
`data-suffix` pada elemen `.stat-num`.

### 4. Instagram
Ubah `CONFIG.instagram` di bagian atas `script.js`.

### 5. Warna
Edit variabel di blok `:root` pada `style.css`:

```css
--bg: #0a0a0a;      /* latar utama */
--bg-alt: #111111;  /* latar section selang-seling */
--card: #161616;    /* latar kartu */
--ink: #f4f1ea;     /* teks utama */
--muted: #9f9b92;   /* teks sekunder */
--gold: #f2a93b;    /* aksen emas */
```

### 6. Font
Font memakai Google Fonts (Barlow Condensed dan Inter). Untuk mengganti, ubah tautan
`<link>` di `<head>` pada `index.html`, lalu sesuaikan `--font-display` dan `--font-body`.

## Fitur

- Smooth scrolling dengan offset header
- Header yang berubah saat digulir, plus menu mobile
- Animasi muncul saat digulir dan penghitung angka
- Popup detail turnamen (tutup dengan X, klik area gelap, atau Esc)
- Menu aktif menyesuaikan section yang sedang dilihat
- Responsif penuh (desktop, tablet, ponsel)
- Menghormati pengaturan "reduce motion" pada perangkat pengguna
