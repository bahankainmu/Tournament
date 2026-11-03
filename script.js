/* =========================================================
   RRQ TOURNAMENT: Katalog Portofolio
   Isi: data turnamen, render kartu, popup, menu mobile,
   header, animasi gulir, penghitung angka, link aktif.
   ========================================================= */

/* ---------------------------------------------------------
   1. KONFIGURASI
   --------------------------------------------------------- */
const CONFIG = {
  instagram: {
    url: "https://www.instagram.com/rrq_tournament",
    handle: "@rrq_tournament",
  },
};

/* ---------------------------------------------------------
   2. DATA TURNAMEN (kartu & popup dibuat dari sini)
   Untuk menambah turnamen: salin satu blok { ... } lalu isi.
   - img     : file logo di folder assets/
   - bg      : (opsional) warna latar kotak logo, untuk logo berlatar solid (mis. JPG)
   - maxW    : (opsional) lebar maksimum logo dalam px, untuk logo beresolusi kecil
   - subs    : (opsional) daftar sub-turnamen yang tampil di popup
   --------------------------------------------------------- */
const TOURNAMENTS = [
  {
    name: "King of Kings Goes to School",
    stat: "1000+ Tim sekolah",
    img: "assets/kok-goes-to-school.png",
    maxW: 300,
    desc: "Tournament bergengsi antar SMA SMK Sederajat seluruh Indonesia dengan partisipan 1000+ Tim sekolah",
  },
  {
    name: "BNI King of School",
    stat: "2000+ Tim",
    img: "assets/bni-king-of-school.png",
    maxW: 240,
    desc: "Tournament antar pelajar SMA/SMK sederajat seluruh Indonesia dengan partisipan 2000+ Tim",
  },
  {
    name: "Promatch Kings Championship",
    stat: "500+ Tim",
    img: "assets/promatch-kings.jpg",
    bg: "#281445", maxW: 420,
    desc: "Tournament umum yang diselenggarakan oleh RRQ dan berkolaborasi dengan Promatch yang diikutsertakan 500+ Tim",
  },
  {
    name: "RRQ Mabar Highschool Tournament",
    stat: "1500+ Tim sekolah",
    img: "assets/rrq-mabar-highschool.png",
    desc: "Tournament Pelajar SMA/SMK Sederajat seluruh Indonesia dengan partisipan 1500+ Tim sekolah",
  },
  {
    name: "RRQ Cup",
    stat: "10.000+ Player",
    img: "assets/rrq-cup.png",
    desc: "Tournament RRQ dengan berbagai macam konsep serta diikutsertakan lebih dari 10.000+ Player",
    subs: ["RRQ Cup Battleground", "RRQ Cup Mix Your Team"],
  },
  {
    name: "RRQ Cup Community",
    stat: "Komunitas",
    img: "assets/rrq-cup-community.png",
    desc: "Tournament yang dikhususkan bagi komunitas yang suka mencari teman ataupun mencoba kemampuan dalam bidang kompetitif",
  },
  {
    name: "RRQ Arena Highschool Cup",
    stat: "80+ Tim sekolah",
    img: "assets/rrq-arena-highschool.png",
    desc: "Tournament khusus regional Bandung untuk pelajar SMA/SMK Sederajat yang diikutsertakan 80+ Tim sekolah daerah Bandung dan sekitarnya",
  },
  {
    name: "Popmie MLBB Student Tournament",
    stat: "100+ Sekolah",
    img: "assets/popmie-mst.png",
    desc: "Tournament Mobile Legends khusus pelajar seluruh Bandung dan sekitarnya. Sudah menjangkau lebih dari 100+ sekolah yang berpartisipasi dalam tournament",
  },
  {
    name: "RRQ School Championship",
    stat: "1800+ Tim sekolah",
    img: "assets/rrq-school-championship.png",
    desc: "Tournament bergengsi khusus SMA/SMK Sederajat seluruh Indonesia dengan total tim sekolah yang berpartisipasi 1800+ Tim Sekolah",
  },
];

/* ---------------------------------------------------------
   3. TERAPKAN KONFIGURASI KE HALAMAN
   --------------------------------------------------------- */
function applyConfig() {
  const card = document.getElementById("instagramCard");
  if (card) card.href = CONFIG.instagram.url;
  const handle = document.getElementById("instagramHandle");
  if (handle) handle.textContent = CONFIG.instagram.handle;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   4. RENDER KARTU TURNAMEN
   Dibuat dengan DOM (bukan innerHTML) agar teks aman.
   --------------------------------------------------------- */
function renderCards() {
  const grid = document.getElementById("tournamentGrid");
  if (!grid) return;

  TOURNAMENTS.forEach((t, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card reveal";
    card.dataset.index = i;
    card.style.setProperty("--d", `${(i % 3) * 0.08}s`);
    card.setAttribute("aria-label", `Lihat detail ${t.name}`);

    // Kotak logo
    const tile = document.createElement("div");
    tile.className = "logo-tile";
    if (t.bg) tile.style.background = t.bg;
    const img = document.createElement("img");
    img.src = t.img;
    img.alt = t.name;
    img.loading = "lazy";
    if (t.maxW) img.style.maxWidth = `min(calc(100% - 52px), ${t.maxW}px)`;
    tile.appendChild(img);

    // Teks kartu
    const body = document.createElement("div");
    body.className = "card-body";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = t.stat;
    const title = document.createElement("h3");
    title.textContent = t.name;
    const link = document.createElement("span");
    link.className = "card-link";
    link.innerHTML = 'Lihat detail <span aria-hidden="true">&rarr;</span>';
    body.append(tag, title, link);

    card.append(tile, body);
    grid.appendChild(card);
  });
}

/* ---------------------------------------------------------
   5. HEADER: beri latar saat halaman digulir
   --------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------
   6. MENU MOBILE
   --------------------------------------------------------- */
function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------------------------------------------------------
   7. ANIMASI MUNCUL SAAT DIGULIR (.reveal)
   Harus dijalankan SETELAH kartu dirender.
   --------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // animasi sekali saja
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------
   8. PENGHITUNG ANGKA (.stat-num[data-count])
   --------------------------------------------------------- */
function initCounters() {
  const nums = document.querySelectorAll("[data-count]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = new Intl.NumberFormat("id-ID");

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = fmt.format(target) + suffix; return; }

    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      el.textContent = fmt.format(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------
   9. SOROT LINK NAVIGASI SESUAI SECTION YANG TERLIHAT
   --------------------------------------------------------- */
function initActiveNav() {
  if (!("IntersectionObserver" in window)) return;
  const links = document.querySelectorAll(".nav-link");
  const map = new Map();
  links.forEach((a) => map.set(a.getAttribute("href").slice(1), a));

  const io = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.remove("is-active"));
        const link = map.get(entry.target.id);
        if (link) link.classList.add("is-active");
      }
    }),
    { rootMargin: "-45% 0px -50% 0px" } // aktif saat section ada di tengah layar
  );
  map.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}

/* ---------------------------------------------------------
   10. POPUP TURNAMEN
   Klik kartu -> modal terbuka dengan detail dari TOURNAMENTS.
   Tutup: tombol X, klik area gelap, atau Esc. Fokus dijaga di dalam modal.
   --------------------------------------------------------- */
function initModal() {
  const modal = document.getElementById("tournamentModal");
  const dialog = modal.querySelector(".modal-dialog");
  const el = {
    media: document.getElementById("modalMedia"),
    img: document.getElementById("modalImg"),
    tag: document.getElementById("modalTag"),
    title: document.getElementById("modalTitle"),
    desc: document.getElementById("modalDesc"),
    subs: document.getElementById("modalSubs"),
    subsList: document.getElementById("modalSubsList"),
  };
  let lastFocus = null;

  const fill = (t) => {
    el.media.style.background = t.bg || "";
    el.img.src = t.img;
    el.img.alt = t.name;
    el.img.style.maxWidth = t.maxW ? `min(calc(100% - 48px), ${Math.round(t.maxW * 1.4)}px)` : "";

    el.tag.textContent = t.stat;
    el.title.textContent = t.name;
    el.desc.textContent = t.desc;

    // Sub-turnamen (hanya jika ada)
    el.subsList.innerHTML = "";
    if (t.subs && t.subs.length) {
      t.subs.forEach((s) => {
        const li = document.createElement("li");
        li.textContent = s;
        el.subsList.appendChild(li);
      });
      el.subs.hidden = false;
    } else {
      el.subs.hidden = true;
    }
    modal.querySelector(".modal-body").scrollTop = 0;
  };

  const open = (index) => {
    const t = TOURNAMENTS[index];
    if (!t) return;
    lastFocus = document.activeElement;
    fill(t);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    dialog.focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  };

  // Delegasi klik: satu listener untuk semua kartu
  document.getElementById("tournamentGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(Number(card.dataset.index));
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") { close(); return; }

    // Jaga fokus keyboard tetap di dalam modal
    if (e.key === "Tab") {
      const closeBtn = modal.querySelector(".modal-close");
      e.preventDefault();
      closeBtn.focus();
    }
  });
}

/* ---------------------------------------------------------
   11. JALANKAN SEMUA SETELAH DOM SIAP
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderCards();     // kartu dulu, baru animasi gulir
  initHeader();
  initMenu();
  initReveal();
  initCounters();
  initActiveNav();
  initModal();
});
