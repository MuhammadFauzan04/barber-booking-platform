/* Promotions listing page. */

import React from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { PROMOS } from "../data/barbershop";

export function PromoPage({ go }) {
  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Promo</span><h2 className="kc-h2">PROMO & VOUCHER AKTIF</h2></div>
      <div className="kc-promo-grid">
        <Stagger>
          {PROMOS.map((p) => (
            <div key={p.id} className="kc-promo-card">
              <Sparkles size={20} />
              <div className="kc-product-name" style={{ marginTop: 10 }}>{p.title}</div>
              <p className="kc-capster-meta" style={{ margin: "6px 0 12px" }}>{p.desc}</p>
              <div className="kc-promo-code">{p.code}</div>
            </div>
          ))}
        </Stagger>
      </div>
      <button className="kc-btn kc-btn-dark" style={{ marginTop: 24 }} onClick={() => go("capsters")}>
        Booking & Pakai Promo <ChevronRight size={16} />
      </button>
    </Page>
  );
}

