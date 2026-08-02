/* Modern icon-card FAQ grid. */

import React, { useState } from "react";
import { ChevronRight, MessageSquare, Sparkles } from "lucide-react";
import { Reveal, Stagger } from "./Common";
import { FAQS, FAQ_CATEGORIES, FAQ_CATEGORY_ICON } from "../data/barbershop";

export function FaqSection({ go }) {
  const [cat, setCat] = useState("Semua");
  const [openQ, setOpenQ] = useState(FAQS[0].q);
  const list = cat === "Semua" ? FAQS : FAQS.filter((f) => f.category === cat);

  return (
    <div className="kc-faq2">
      <Reveal className="kc-faq2-head">
        <span className="kc-kicker">Bantuan</span>
        <h2 className="kc-h2">PERTANYAAN SEPUTAR CARTENZ</h2>
        <p className="kc-hero-sub" style={{ marginTop: 8, maxWidth: 480 }}>
          Belum ketemu jawabannya? Cek daftar pertanyaan yang paling sering ditanyakan pelanggan kami.
        </p>
      </Reveal>

      <Reveal className="kc-faq2-tabs">
        {FAQ_CATEGORIES.map((c) => (
          <button key={c} className={"kc-faq2-tab" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
      </Reveal>

      <div className="kc-faq2-grid">
        <Stagger>
          {list.map((f) => {
            const isOpen = openQ === f.q;
            const Icon = FAQ_CATEGORY_ICON[f.category] || Sparkles;
            return (
              <div key={f.q} className={"kc-faq2-card" + (isOpen ? " open" : "")}>
                <button className="kc-faq2-card-head" onClick={() => setOpenQ(isOpen ? null : f.q)}>
                  <span className="kc-faq2-icon"><Icon size={17} strokeWidth={1.8} /></span>
                  <span className="kc-faq2-q">{f.q}</span>
                  <span className="kc-faq2-toggle"><ChevronRight size={16} /></span>
                </button>
                <div className="kc-faq2-answer">
                  <div className="kc-faq2-answer-inner"><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </Stagger>
      </div>

      <Reveal className="kc-faq2-cta">
        <div className="kc-faq2-cta-copy">
          <div className="kc-faq2-cta-title">Masih ada pertanyaan?</div>
          <div className="kc-faq2-cta-sub">Tim kami siap bantu langsung lewat chat.</div>
        </div>
        <button className="kc-btn kc-btn-dark kc-btn-sm" onClick={() => go && go("home")}>
          <MessageSquare size={14} /> Hubungi Kami
        </button>
      </Reveal>
    </div>
  );
}

