/* Single capster profile page. */

import React from "react";
import { ChevronLeft, ChevronRight, MapPin, Scissors, Star } from "lucide-react";
import { Page, PortfolioTile, Stagger } from "../components/Common";
import { BRANCHES } from "../data/barbershop";

export function CapsterDetail({ capster, go }) {
  const branchObj = BRANCHES.find((b) => b.id === capster.branch);
  return (
    <Page className="kc-section">
      <button className="kc-back" onClick={() => go("capsters")}><ChevronLeft size={16} /> Kembali</button>
      <div className="kc-detail-head">
        <div className="kc-capster-photo big"><Scissors size={34} strokeWidth={1.3} /><span className="kc-initials">{capster.name.split(" ").map((n) => n[0]).join("")}</span></div>
        <div>
          <h2 className="kc-h2">{capster.name.toUpperCase()}</h2>
          <div className="kc-rating" style={{ marginTop: 6 }}><Star size={14} fill="var(--kc-brass)" strokeWidth={0} /> {capster.rating} · {capster.reviews} ulasan</div>
          <div className="kc-capster-meta" style={{ marginTop: 4 }}><MapPin size={13} style={{ verticalAlign: -2 }} /> {branchObj.name}, {branchObj.city} · {capster.years} thn pengalaman</div>
          <div className="kc-tag-row" style={{ marginTop: 10 }}>{capster.tags.map((t) => <span key={t} className="kc-tag">{t}</span>)}</div>
          <p className="kc-hero-sub" style={{ marginTop: 12, maxWidth: 480 }}>{capster.bio}</p>
          <button className="kc-btn kc-btn-dark" style={{ marginTop: 16 }} onClick={() => go("dateTime", { capster })}>
            Pilih Capster Ini <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="kc-kicker" style={{ margin: "34px 0 12px" }}>Portfolio</div>
      <div className="kc-portfolio-grid">
        <Stagger>{["Fade", "Beard Sculpt", "Pompadour", "Mullet", "Perm", "Buzz Cut"].map((t, i) => <PortfolioTile key={t} seed={i + capster.id.length} label={t} />)}</Stagger>
      </div>
    </Page>
  );
}

/* ================================================================== */
/* TICKET STUB (signature element)                                     */
/* ================================================================== */

