/* Hairstyle inspiration gallery — searchable, filterable, Pinterest-style
   masonry grid of style cards (gradient tiles stand in for real photos,
   consistent with the gradient/initials treatment used elsewhere in the
   app for capsters and services). */

import React, { useMemo, useState } from "react";
import { Bookmark, ChevronDown, Filter, RotateCcw, Search, User } from "lucide-react";
import { Page, Stagger } from "../components/Common";
import { HAIR_COLORS, HAIR_LENGTHS, HAIR_STYLE_TYPES, HAIR_TEXTURES, INSPIRATIONS, INSPIRATION_CATEGORIES } from "../data/barbershop";

const SIZE_HEIGHT = { sm: 220, md: 270, lg: 330, xl: 390 };

export function InspirationPage({ go }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("Semua");
  const [length, setLength] = useState("Semua Panjang");
  const [styleTypes, setStyleTypes] = useState([]);
  const [textures, setTextures] = useState([]);
  const [color, setColor] = useState(null);
  const [saved, setSaved] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggle = (list, setList, value) => setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const toggleSaved = (id, e) => { e.stopPropagation(); setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]); };

  const resetFilters = () => {
    setQuery(""); setTag("Semua"); setLength("Semua Panjang"); setStyleTypes([]); setTextures([]); setColor(null);
  };

  const filtered = useMemo(() => INSPIRATIONS.filter((it) => {
    if (tag !== "Semua" && it.tag !== tag) return false;
    if (length !== "Semua Panjang" && it.length !== length) return false;
    if (styleTypes.length && !styleTypes.includes(it.styleType)) return false;
    if (textures.length && !textures.includes(it.texture)) return false;
    if (color && it.color !== color) return false;
    if (query.trim() && !(it.name.toLowerCase().includes(query.toLowerCase()) || it.tag.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  }), [tag, length, styleTypes, textures, color, query]);

  return (
    <Page className="kc-section">
      <div className="kc-insp-top">
        <div className="kc-section-head" style={{ marginBottom: 0 }}>
          <span className="kc-kicker">Inspirasi Rambut</span>
          <h2 className="kc-h2">TEMUKAN GAYA TERBAIKMU</h2>
          <p className="kc-hero-sub">Jelajahi berbagai inspirasi gaya rambut pria dan temukan yang paling cocok untukmu.</p>
        </div>
        <div className="kc-insp-search-row">
          <div className="kc-insp-search">
            <Search size={16} />
            <input className="kc-insp-search-input" placeholder="Cari gaya rambut, contoh: fade, mullet, curly" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="kc-btn kc-btn-dark" onClick={() => setFilterOpen((v) => !v)}><Filter size={15} /> Filter</button>
        </div>
      </div>

      <div className="kc-branch-pills" style={{ marginTop: 18 }}>
        {INSPIRATION_CATEGORIES.map((c) => (
          <button key={c} className={"kc-pill dark" + (tag === c ? " active" : "")} onClick={() => setTag(c)}>{c}</button>
        ))}
        <button className="kc-pill dark kc-insp-more">···</button>
      </div>

      <div className="kc-insp-layout">
        <aside className={"kc-insp-sidebar" + (filterOpen ? " open" : "")}>
          <div className="kc-filter-group">
            <div className="kc-kicker" style={{ marginBottom: 10 }}>Panjang Rambut</div>
            {HAIR_LENGTHS.map((l) => (
              <label key={l} className="kc-radio-row">
                <input type="radio" name="length" checked={length === l} onChange={() => setLength(l)} />
                <span className="kc-radio-dot" /> {l}
              </label>
            ))}
          </div>

          <div className="kc-filter-group">
            <div className="kc-kicker" style={{ marginBottom: 10 }}>Tipe Gaya</div>
            {HAIR_STYLE_TYPES.map((s) => (
              <label key={s} className="kc-check-row">
                <input type="checkbox" checked={styleTypes.includes(s)} onChange={() => toggle(styleTypes, setStyleTypes, s)} />
                <span className="kc-check-box" /> {s}
              </label>
            ))}
          </div>

          <div className="kc-filter-group">
            <div className="kc-kicker" style={{ marginBottom: 10 }}>Tekstur Rambut</div>
            {HAIR_TEXTURES.map((t) => (
              <label key={t} className="kc-check-row">
                <input type="checkbox" checked={textures.includes(t)} onChange={() => toggle(textures, setTextures, t)} />
                <span className="kc-check-box" /> {t}
              </label>
            ))}
          </div>

          <div className="kc-filter-group">
            <div className="kc-kicker" style={{ marginBottom: 10 }}>Warna Rambut</div>
            <div className="kc-color-row">
              {HAIR_COLORS.map((c) => (
                <button key={c.id} className={"kc-color-swatch" + (color === c.id ? " active" : "")} style={{ background: c.hex }} onClick={() => setColor(color === c.id ? null : c.id)} />
              ))}
            </div>
          </div>

          <button className="kc-btn kc-btn-outline kc-btn-block" onClick={resetFilters}><RotateCcw size={14} /> Reset Filter</button>
        </aside>

        <div className="kc-insp-main">
          <div className="kc-insp-count">{filtered.length}+ Inspirasi ditemukan</div>
          <div className="kc-insp-grid">
            <Stagger>
              {filtered.map((it) => {
                const Icon = it.icon;
                const isSaved = saved.includes(it.id);
                return (
                  <div key={it.id} className="kc-insp-card" onClick={() => go("capsters")}>
                    <div className="kc-insp-photo" style={{ height: SIZE_HEIGHT[it.size] || 260 }}>
                      <span className="kc-insp-tag">{it.tag}</span>
                      <button className={"kc-insp-bookmark" + (isSaved ? " active" : "")} onClick={(e) => toggleSaved(it.id, e)}>
                        <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                      </button>
                      <Icon size={40} strokeWidth={1.3} className="kc-insp-icon" />
                    </div>
                    <div className="kc-insp-foot">
                      <div className="kc-insp-name">{it.name}</div>
                      <div className="kc-insp-capster"><span className="kc-insp-avatar"><User size={11} /></span>{it.capster}</div>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>

          {filtered.length === 0 && <p className="kc-hero-sub" style={{ marginTop: 20 }}>Tidak ada gaya yang cocok dengan filter ini. Coba reset filter.</p>}

          {filtered.length > 0 && (
            <button className="kc-btn kc-btn-dark" style={{ margin: "26px auto 0", display: "flex" }}>
              Muat Lebih Banyak <ChevronDown size={16} />
            </button>
          )}
        </div>
      </div>
    </Page>
  );
}
