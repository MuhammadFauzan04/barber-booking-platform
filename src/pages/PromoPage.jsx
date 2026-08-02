/* Promotions & voucher listing page — hero with a claimable voucher-code
   box, category filter pills, featured promo cards, a browsable grid of
   all promos, and a sidebar with expiring promos + member benefits. */

import React, { useState } from "react";
import {
  BadgeCheck, ChevronDown, Clock, Copy, Gift, Sparkles,
} from "lucide-react";
import { Page, Stagger } from "../components/Common";
import {
  ALL_PROMOS, EXPIRING_PROMOS, FEATURED_PROMOS, MEMBER_BENEFITS, PROMO_CATEGORIES,
} from "../data/barbershop";

const PAGE_SIZE = 4;

export function PromoPage({ go }) {
  const [cat, setCat] = useState("semua");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const list = ALL_PROMOS.filter((p) => cat === "semua" || p.category === cat);
  const allCodes = [...FEATURED_PROMOS, ...ALL_PROMOS].map((p) => p.code);

  const applyCode = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    if (allCodes.includes(trimmed)) setMsg({ ok: true, text: "Kode voucher berhasil diterapkan!" });
    else setMsg({ ok: false, text: "Kode tidak ditemukan, coba kode lain." });
  };

  const copyCode = (c) => {
    if (navigator.clipboard) navigator.clipboard.writeText(c).catch(() => {});
  };

  return (
    <Page className="kc-section kc-section-tight">
      <div className="kc-pr-hero">
        <div>
          <span className="kc-kicker">Promo</span>
          <h2 className="kc-h2">PROMO & VOUCHER AKTIF</h2>
          <p className="kc-hero-sub" style={{ marginTop: 6 }}>Nikmati berbagai penawaran menarik untuk setiap gaya terbaikmu.</p>
        </div>

        <div className="kc-pr-hero-gift" aria-hidden="true">
          <div className="kc-pr-gift-box" />
          <div className="kc-pr-gift-ribbon-v" />
          <div className="kc-pr-gift-ribbon-h" />
          <div className="kc-pr-gift-bow" />
          <div className="kc-pr-gift-tag">%</div>
          <Sparkles size={16} className="kc-pr-gift-sparkle" style={{ top: 6, right: 10 }} />
          <Sparkles size={12} className="kc-pr-gift-sparkle" style={{ bottom: 20, left: 0 }} />
          <div className="kc-pr-gift-coin" style={{ top: 30, left: 4 }} />
          <div className="kc-pr-gift-coin" style={{ bottom: 40, right: 6 }} />
          <div className="kc-pr-gift-coin" style={{ top: 60, right: 24, width: 9, height: 9 }} />
        </div>

        <div className="kc-pr-code-card">
          <div className="kc-pr-code-title">Punya Kode Voucher?</div>
          <div className="kc-pr-code-sub">Masukkan kode voucher untuk klaim diskon</div>
          <div className="kc-pr-code-row">
            <input
              className="kc-input"
              placeholder="Contoh: NEWMEMBER10"
              value={code}
              onChange={(e) => { setCode(e.target.value); setMsg(null); }}
              onKeyDown={(e) => e.key === "Enter" && applyCode()}
            />
            <button className="kc-btn kc-btn-dark" onClick={applyCode}>Terapkan</button>
          </div>
          {msg && <div className={"kc-pr-code-msg " + (msg.ok ? "ok" : "err")}>{msg.text}</div>}
        </div>
      </div>

      <div className="kc-pr-cat-row">
        {PROMO_CATEGORIES.map((c) => (
          <button key={c.id} className={"kc-pill dark kc-pr-cat-pill" + (cat === c.id ? " active" : "")} onClick={() => { setCat(c.id); setVisible(PAGE_SIZE); }}>
            <c.icon size={14} /> {c.label}
          </button>
        ))}
      </div>

      <div className="kc-pr-layout">
        <div>
          <div className="kc-pr-section-head"><Sparkles size={16} color="var(--kc-accent-dark)" /><span className="kc-pr-section-title">Promo Unggulan</span></div>
          <p className="kc-pr-section-sub">Promo terbaik yang sayang untuk dilewatkan!</p>

          <div className="kc-pr-featured-grid">
            <Stagger>
              {FEATURED_PROMOS.map((p) => (
                <div key={p.id} className="kc-pr-feature-card" style={{ backgroundImage: `url(${p.image})` }}>
                  <span className="kc-pr-feature-badge"><p.badgeIcon size={11} /> {p.badge}</span>
                  <div className="kc-pr-feature-content">
                    <div className="kc-pr-feature-title">{p.title}<br />{p.titleLine2}</div>
                    {p.big && (
                      <div className="kc-pr-feature-big">
                        {p.big}{p.bigSuffix && <span className="kc-pr-feature-big-suffix">{p.bigSuffix}</span>}
                      </div>
                    )}
                    <div className="kc-pr-feature-desc">{p.desc}{p.note && <><br />{p.note}</>}</div>
                    {p.progress && (
                      <div className="kc-pr-feature-dots">
                        {Array.from({ length: p.progressTotal }).map((_, i) => (
                          i === p.progressTotal - 1
                            ? <span key={i} className="kc-pr-feature-dot gift"><Gift size={12} /></span>
                            : <span key={i} className={"kc-pr-feature-dot" + (i < p.progress ? " filled" : "")} />
                        ))}
                      </div>
                    )}
                    {p.code && (
                      <button className="kc-pr-feature-code" onClick={() => copyCode(p.code)}>KODE: {p.code} <Copy size={12} /></button>
                    )}
                    <div className="kc-pr-feature-foot"><Clock size={11} /> {p.expiry}</div>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>

          <div className="kc-pr-section-head" style={{ marginTop: 34 }}><Sparkles size={16} color="var(--kc-accent-dark)" /><span className="kc-pr-section-title">Semua Promo</span></div>
          <p className="kc-pr-section-sub">Temukan semua penawaran menarik untukmu</p>

          {list.length === 0 ? (
            <p className="kc-capster-meta">Belum ada promo untuk kategori ini.</p>
          ) : (
            <div className="kc-pr-all-grid">
              <Stagger>
                {list.slice(0, visible).map((p) => (
                  <div key={p.id} className="kc-pr-card">
                    <div className={"kc-pr-card-icon " + p.tone}><p.icon size={19} /></div>
                    <div className="kc-pr-card-title">{p.title}</div>
                    <div className="kc-pr-card-desc">{p.desc}</div>
                    <div className="kc-pr-card-foot">
                      <span className="kc-pr-card-code">KODE: {p.code}</span>
                      <span className="kc-pr-card-date">{p.expiry}</span>
                    </div>
                  </div>
                ))}
              </Stagger>
            </div>
          )}

          {visible < list.length && (
            <button className="kc-btn kc-btn-outline kc-pr-loadmore" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Muat Lebih Banyak <ChevronDown size={16} />
            </button>
          )}
        </div>

        <div>
          <div className="kc-pr-side-card">
            <div className="kc-pr-side-head">
              <span className="kc-pr-side-title">Promo Akan Berakhir</span>
              <button className="kc-pr-side-link" onClick={() => setCat("berakhir")}>Lihat Semua</button>
            </div>
            {EXPIRING_PROMOS.map((e) => (
              <div key={e.id} className="kc-pr-expiry-row">
                <div className="kc-pr-expiry-icon"><e.icon size={17} /></div>
                <div className="kc-pr-expiry-body">
                  <div className="kc-pr-expiry-title">{e.title}</div>
                  <div className="kc-pr-expiry-code">{e.desc || `KODE: ${e.code}`}</div>
                </div>
                <div className="kc-pr-expiry-countdown">
                  <div className="kc-pr-expiry-label">Berakhir dalam</div>
                  <div className="kc-pr-expiry-nums">
                    <div className="kc-pr-expiry-num"><b>{e.days}</b><span>Hari</span></div>
                    <div className="kc-pr-expiry-num"><b>{e.hours}</b><span>Jam</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="kc-pr-side-card">
            <div className="kc-pr-side-head">
              <span className="kc-pr-side-title">Manfaat Member</span>
              <button className="kc-pr-side-link" onClick={() => go("points")}>Lihat Benefit</button>
            </div>
            <div className="kc-pr-member-tier">
              <div className="kc-pr-member-tier-icon"><BadgeCheck size={16} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--kc-ink)" }}>Gold Member</div>
              </div>
              <span className="kc-pr-member-status">Aktif</span>
            </div>
            <div className="kc-pr-member-copy">Kamu butuh 180 poin lagi untuk naik ke Platinum</div>
            <div className="kc-pr-member-track"><div className="kc-pr-member-fill" style={{ width: "64%" }} /></div>
            <div className="kc-pr-member-count">320 / 500 poin</div>

            <div className="kc-pr-benefit-grid">
              {MEMBER_BENEFITS.map((b) => (
                <div key={b.id} className="kc-pr-benefit-chip">
                  <div className="kc-pr-benefit-icon"><b.icon size={15} /></div>
                  <div className="kc-pr-benefit-label">{b.label}</div>
                  <div className="kc-pr-benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="kc-btn kc-btn-dark" style={{ marginTop: 30 }} onClick={() => go("capsters")}>
        Booking & Pakai Promo
      </button>
    </Page>
  );
}
