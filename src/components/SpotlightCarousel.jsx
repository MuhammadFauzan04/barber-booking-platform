/* Auto-advancing capster spotlight carousel. */

import React, { useState, useEffect } from "react";
import { ChevronRight, Scissors, Star } from "lucide-react";
import { BRANCHES } from "../data/barbershop";

export function SpotlightCarousel({ items, go }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4200);
    return () => clearInterval(id);
  }, [paused, items.length]);
  const c = items[index];
  const branchObj = BRANCHES.find((b) => b.id === c.branch);

  return (
    <div className="kc-spotlight" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="kc-spotlight-visual" key={c.id}>
        <Scissors size={70} strokeWidth={0.9} />
        <span className="kc-spotlight-initials">{c.name.split(" ").map((n) => n[0]).join("")}</span>
      </div>
      <div className="kc-spotlight-body" key={c.id + "-body"}>
        <span className="kc-badge dark">{c.badge}</span>
        <h3 className="kc-h2" style={{ margin: "10px 0 6px" }}>{c.name.toUpperCase()}</h3>
        <div className="kc-rating" style={{ marginBottom: 8 }}><Star size={13} fill="var(--kc-brass)" strokeWidth={0} /> {c.rating} · {c.reviews} ulasan</div>
        <p className="kc-capster-meta">{branchObj.name}, {branchObj.city}</p>
        <div className="kc-tag-row" style={{ margin: "10px 0" }}>{c.tags.map((t) => <span key={t} className="kc-tag">{t}</span>)}</div>
        <button className="kc-btn kc-btn-dark" onClick={() => go("capsterDetail", { capster: c })}>
          Lihat Portfolio <ChevronRight size={16} />
        </button>
      </div>
      <div className="kc-spotlight-dots">
        {items.map((_, i) => (
          <button key={i} className={"kc-spotlight-dot" + (i === index ? " active" : "")} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* TOP PROMO BAR (animated countdown, echoes reference's shipping bar) */
/* ================================================================== */

