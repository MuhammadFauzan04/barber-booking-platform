/* Full services catalogue — mirrors the card design used in the booking
   flow's "Pilih Layanan" step (icon tile + name + desc + duration/price)
   so the standalone catalogue and the booking step read as the same
   design language. */

import React, { useState } from "react";
import { ChevronRight, Clock, Scissors, Star } from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { SERVICES, SERVICE_CATEGORIES } from "../data/barbershop";
import { rupiah } from "../utils/format";

export function ServicesPage({ go }) {
  const [cat, setCat] = useState("Semua");
  const list = SERVICES.filter((s) => cat === "Semua" || s.category === cat);
  return (
    <Page className="kc-section">
      <div className="kc-section-head">
        <span className="kc-kicker">Layanan</span>
        <h2 className="kc-h2">DAFTAR LAYANAN</h2>
        <p className="kc-hero-sub">Semua layanan potong rambut & grooming yang tersedia di setiap cabang Cartenz.</p>
      </div>
      <div className="kc-branch-pills">
        {SERVICE_CATEGORIES.map((c) => (
          <button key={c} className={"kc-pill dark" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="kc-service-grid" style={{ marginTop: 18 }}>
        <Stagger>
          {list.map((s) => {
            const Icon = s.icon || Scissors;
            return (
              <div key={s.id} className="kc-service-card" onClick={() => go("capsters")}>
                <div className="kc-service-card-thumb">
                  <Icon size={26} />
                  {s.popular && <span className="kc-service-card-pop"><Star size={10} fill="currentColor" strokeWidth={0} /> Populer</span>}
                </div>
                <div className="kc-service-card-body">
                  <div className="kc-service-card-name">{s.name}</div>
                  <div className="kc-service-card-desc">{s.desc || "Layanan grooming berkualitas dari capster terlatih."}</div>
                  <div className="kc-service-card-foot">
                    <span><Clock size={12} style={{ verticalAlign: -2 }} /> {s.duration}</span>
                    <span className="kc-service-card-price">{rupiah(s.price)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Stagger>
      </div>
      <button className="kc-btn kc-btn-dark" style={{ marginTop: 24 }} onClick={() => go("capsters")}>
        Booking Sekarang <ChevronRight size={16} />
      </button>
    </Page>
  );
}
