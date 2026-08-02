/* Landing page: hero, capster match experience, moments bento grid,
   feedback wall, FAQ, and supporting sections. */

import React, { useState } from "react";
import { BadgeCheck, ChevronRight, Clock, CreditCard, Gift, Instagram, MapPinned, Mountain, PlayCircle, Scissors, Sparkles } from "lucide-react";
import { CapsterCard } from "../components/CapsterCard";
import { CapsterMatchExperience } from "../components/CapsterMatchExperience";
import { Marquee, Page, Reveal, Stagger } from "../components/Common";
import { FaqSection } from "../components/FaqSection";
import { FeedbackWall } from "../components/FeedbackWall";
import { BRANCHES, CAPSTERS, HERO_GALLERY_DOWN, HERO_GALLERY_UP, INSTAGRAM_STATS, MOMENTS, SERVICES, STYLE_TAGS } from "../data/barbershop";
import { useMagnetic } from "../hooks/useMagnetic";
import { rupiah } from "../utils/format";

export function Home({ branch, go, points }) {
  const branchObj = BRANCHES.find((b) => b.id === branch);
  const allCapstersByRating = [...CAPSTERS].sort((a, b) => b.rating - a.rating);
  const spotlightItems = allCapstersByRating.slice(0, 5);
  const [popularTag, setPopularTag] = useState("Semua");
  const popularList = (popularTag === "Semua" ? CAPSTERS : CAPSTERS.filter((c) => c.tags.includes(popularTag))).slice(0, 4);

  const QUICK = [
    { id: "services", label: "Lihat Layanan", desc: "Daftar harga & durasi" },
    { id: "capsters", label: "Lihat Capster", desc: "Pilih & lihat portfolio" },
    { id: "promo", label: "Promo", desc: "Diskon & voucher aktif" },
    { id: "inspiration", label: "Inspirasi Rambut", desc: "Referensi gaya terbaru" },
  ];

  const magBook = useMagnetic(14);

  return (
    <Page>
      {/* ---------- HERO ---------- */}
      {/* Signature device: a two-lane photo wall that never stops moving — the left
          lane climbs, the right lane descends, forever — set against plain white so
          nothing competes with it or the headline. */}
      <section className="kc-hero4">
        <div className="kc-hero4-grid">
          <div className="kc-hero4-copy">
            <h1 className="kc-hero4-title">
              Potong Rambut,<br />
              Gaya Baru,<br />
              Percaya Diri Baru.
            </h1>
            <p className="kc-hero4-desc">
              Ceritakan gaya yang kamu inginkan, dan capster bersertifikat kami wujudkan jadi
              potongan rambut terbaik yang pernah kamu punya.
            </p>
            <div className="kc-hero4-actions">
              <button ref={magBook} className="kc-hero4-btn-primary kc-magnetic" onClick={() => go("capsters")}>
                Booking Sekarang
              </button>
              <button className="kc-hero4-btn-outline" onClick={() => go("inspiration")}>
                Lihat Galeri
              </button>
            </div>
            <div className="kc-hero4-proof">
              <div className="kc-avatar-stack">
                {spotlightItems.slice(0, 4).map((c) => (
                  <div className="kc-avatar-chip" key={c.id}>{c.name.split(" ").map((n) => n[0]).join("")}</div>
                ))}
              </div>
              <p className="kc-hero4-proof-text">
                Bergabung dengan <strong>13.800+ Pengguna</strong> dan mulai transformasi gaya sekarang
              </p>
            </div>
          </div>

          <div className="kc-hero4-visual">
            <div className="kc-hero4-col-wrap">
              <div className="kc-hero4-col kc-hero4-col-up">
                {[...HERO_GALLERY_UP, ...HERO_GALLERY_UP].map((src, i) => (
                  <div className="kc-hero4-tile" key={i}><img src={src} alt="" loading="lazy" /></div>
                ))}
              </div>
            </div>
            <div className="kc-hero4-col-wrap offset">
              <div className="kc-hero4-col kc-hero4-col-down">
                {[...HERO_GALLERY_DOWN, ...HERO_GALLERY_DOWN].map((src, i) => (
                  <div className="kc-hero4-tile" key={i}><img src={src} alt="" loading="lazy" /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- AUTO-MOVING MARQUEE ---------- */}
      <Marquee items={["SKIN FADE", "MULLET REVIVAL", "PERM CROP", "POMPADOUR", "BEARD SCULPT", "CLASSIC TAPER", "BUZZ CUT"]} />

      <section className="kc-strip">
        {[{ i: MapPinned, t: "5 Cabang Besar" }, { i: BadgeCheck, t: "Capster Bersertifikat" }, { i: Gift, t: "Poin Tiap Booking" }, { i: CreditCard, t: "Bayar Fleksibel" }].map((f, i) => (
          <div className="kc-strip-item" key={i}><f.i size={18} />{f.t}</div>
        ))}
      </section>

      {/* ---------- NEW BRANCH ANNOUNCEMENT (mirrors @cartenzbarbershop IG post) ---------- */}
      <section className="kc-section">
        <Reveal className="kc-newbranch">
          <div className="kc-newbranch-tag"><Sparkles size={13} /> Cabang Baru</div>
          <h2 className="kc-h1 kc-newbranch-h1">NEW BRANCH.<br />NEW ROOM.<br />CUTS THAT KEEP THE PACE.</h2>
          <p className="kc-hero-sub" style={{ color: "rgba(251,248,241,0.72)", margin: "14px 0 22px" }}>
            Cabang terbaru kami resmi buka di Centre Point of Indonesia, Makassar — ruang baru, kursi baru, standar Cartenz yang sama.
          </p>
          <button className="kc-btn kc-btn-brass" onClick={() => go("capsters")}>Booking di Cabang Makassar</button>
        </Reveal>
      </section>

      {/* ---------- QUICK ACTIONS ---------- */}
      <section className="kc-section">
        <Reveal className="kc-section-head" as="div"><span className="kc-kicker">Mulai Dari Sini</span></Reveal>
        <div className="kc-quick-grid">
          <Stagger>
            {QUICK.map((q) => (
              <button key={q.id} className="kc-quick-card" onClick={() => go(q.id)}>
                <div className="kc-quick-title">{q.label}</div>
                <div className="kc-quick-desc">{q.desc}</div>
                <ChevronRight size={16} />
              </button>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- STEAMED MIRROR SERVICE REVEAL (unique, non-card interaction) ---------- */}
      <CapsterMatchExperience go={go} />

      {/* ---------- LAYANAN MARQUEE (continuously scrolling, pauses on hover) ---------- */}
      <section className="kc-section">
        <Reveal className="kc-section-head">
          <span className="kc-kicker">Layanan</span>
          <h2 className="kc-h2">LAYANAN UNGGULAN KAMI</h2>
        </Reveal>
        <div className="kc-hmarquee">
          <div className="kc-hmarquee-track" style={{ animationDuration: "48s" }}>
            {[...SERVICES, ...SERVICES].map((s, i) => (
              <div className="kc-product-card kc-hmarquee-item" key={i} onClick={() => go("services")}>
                <div className="kc-product-photo"><Scissors size={30} strokeWidth={1.3} /></div>
                <div className="kc-product-body">
                  <div className="kc-product-name">{s.name}</div>
                  <div className="kc-capster-meta"><Clock size={12} style={{ verticalAlign: -2 }} /> {s.duration}</div>
                  <div className="kc-product-price">{rupiah(s.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BIG EDITORIAL SPLIT (Spring/Summer style statement) ---------- */}
      <section className="kc-section">
        <Reveal className="kc-editorial">
          <div className="kc-editorial-text">
            <h2 className="kc-h1 kc-editorial-h1">GAYA BARU.<br />PERCAYA DIRI<br />BARU.</h2>
            <p className="kc-hero-sub" style={{ margin: "16px 0 20px" }}>
              Setiap capster kami melewati internal training class rutin bersama SEA Barber Education —
              dari skin fade presisi sampai perm bertekstur. Booking sekarang, tentukan gayamu sendiri.
            </p>
            <button className="kc-btn kc-btn-dark" onClick={() => go("capsters")}>Booking Sekarang</button>
          </div>
          <div className="kc-editorial-visual">
            <Mountain size={110} strokeWidth={0.7} />
          </div>
        </Reveal>
      </section>

      {/* ---------- POPULAR (filter tabs, mirrors reference "POPULAR" grid) ---------- */}
      <section className="kc-section">
        <Reveal className="kc-section-head">
          <span className="kc-kicker">Trending</span>
          <h2 className="kc-h2">POPULER MINGGU INI</h2>
        </Reveal>
        <div className="kc-branch-pills">
          {STYLE_TAGS.map((t) => (
            <button key={t} className={"kc-pill dark" + (popularTag === t ? " active" : "")} onClick={() => setPopularTag(t)}>{t}</button>
          ))}
        </div>
        <div className="kc-capster-grid">
          <Stagger>
            {popularList.map((c, i) => <CapsterCard key={c.id} capster={c} featured={i === 0} onClick={() => go("capsterDetail", { capster: c })} />)}
          </Stagger>
        </div>
      </section>

      {/* ---------- MOMENTS GALLERY — bento grid (mirrors the @cartenzbarbershop IG feed) ---------- */}
      <section className="kc-section">
        <Reveal className="kc-section-head">
          <span className="kc-kicker">Di Balik Layar</span>
          <h2 className="kc-h2">MOMEN DI CARTENZ</h2>
        </Reveal>
        {/*
          Bento layout: instead of a uniform grid (or the old horizontal
          marquee), tile sizes are varied via nth-child rules in CSS —
          the first moment gets a big 2x2 "hero" cell, a couple of tiles
          run wide, and the rest fill in as regular squares. This mirrors
          the asymmetric "bento box" grids common in modern portfolio /
          gallery sections instead of a plain uniform photo grid.
        */}
        <div className="kc-moments-bento">
          {MOMENTS.map((m) => (
            <div className="kc-moment-tile" key={m.id}>
              <PlayCircle size={16} className="kc-moment-play" />
              <div className="kc-moment-text">
                <div className="kc-moment-caption">{m.caption}</div>
                <div className="kc-moment-sub">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <Reveal className="kc-ig-follow">
          <div className="kc-ig-avatar"><Mountain size={22} /></div>
          <div className="kc-ig-info">
            <div className="kc-ig-handle">{INSTAGRAM_STATS.handle}</div>
            <div className="kc-ig-meta">{INSTAGRAM_STATS.posts} kiriman · {INSTAGRAM_STATS.followers} pengikut · {INSTAGRAM_STATS.following} diikuti</div>
          </div>
          <button className="kc-btn kc-btn-outline kc-btn-sm" onClick={() => go("home")}><Instagram size={14} /> Ikuti Kami</button>
        </Reveal>
      </section>

      {/* ---------- CUSTOMER FEEDBACK — animated, staggered wall ---------- */}
      <section className="kc-section" style={{ paddingBottom: 20 }}>
        <Reveal className="kc-section-head">
          <span className="kc-kicker">Kata Pelanggan</span>
          <h2 className="kc-h2">CERITA DARI KURSI CUKUR</h2>
        </Reveal>
        <Reveal><FeedbackWall /></Reveal>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="kc-section" style={{ paddingTop: 20 }}>
        <FaqSection go={go} />
      </section>
    </Page>
  );
}

/* ================================================================== */
/* SERVICES / CAPSTERS / PROMO / INSPIRATION (browse pages)            */
/* ================================================================== */

