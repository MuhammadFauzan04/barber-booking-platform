/* Reusable capster preview card used in grids/carousels. */

import React from "react";
import { ArrowRight, Calendar, Clock, Flame, Sparkles, Star, Users } from "lucide-react";

export function CapsterCard({ capster, onClick, featured = false }) {
  const initials = capster.name.split(" ").map((n) => n[0]).join("");
  const spec = capster.tags.slice(0, 2).join(" & ");
  const BadgeIcon = capster.badge === "TOP RATED" ? Star : capster.badge === "TERSEDIA HARI INI" ? Clock : Sparkles;
  return (
    <div className={"kc-capster-card2" + (featured ? " featured" : "")} onClick={onClick}>
      <div className="kc-capster-card2-photo">
        <span className="kc-capster-card2-initials">{initials}</span>
        {featured && <Sparkles size={20} className="kc-capster-card2-spark" />}
        <span className="kc-capster-card2-badge"><BadgeIcon size={11} /> {capster.badge}</span>
        <span className="kc-capster-card2-rating"><Star size={11} fill="var(--kc-brass)" strokeWidth={0} /> {capster.rating}</span>
      </div>
      <div className="kc-capster-card2-panel">
        <h3>{capster.name}</h3>
        <div className="kc-capster-card2-spec">Spesialis {spec}</div>
        <div className="kc-tag-row">{capster.tags.map((t) => <span key={t} className="kc-tag">{t}</span>)}</div>
        <div className="kc-capster-card2-stats">
          <div><Flame size={13} /><b>{capster.reviews}+</b><span>Booking</span></div>
          <div><Users size={13} /><b>{capster.reviews}</b><span>Ulasan</span></div>
          <div><Calendar size={13} /><b>{capster.years} Thn</b><span>Pengalaman</span></div>
        </div>
        <button className="kc-capster-card2-btn">Lihat Profil <ArrowRight size={14} /></button>
      </div>
    </div>
  );
}

