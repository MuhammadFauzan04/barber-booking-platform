/* Small shared building blocks reused across every admin page:
   stat cards, tab bars, a generic searchable/editable data table,
   toggle switches, and status badges. */

import React, { useMemo, useState } from "react";
import { ChevronDown, Pencil, Plus, Search, Trash2, X } from "lucide-react";

/* ---------------- Stat card ---------------- */
export function StatCard({ label, value, trend, tone = "neutral" }) {
  return (
    <div className="adm-stat-card">
      <div className="adm-stat-label">{label}</div>
      <div className="adm-stat-value">{value}</div>
      {trend && <div className={"adm-stat-trend " + tone}>{trend}</div>}
    </div>
  );
}

/* ---------------- Tabs ---------------- */
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="adm-tabs">
      {tabs.map((t) => (
        <button key={t.id} className={"adm-tab" + (active === t.id ? " active" : "")} onClick={() => onChange(t.id)}>
          {t.label}
          {t.count !== undefined && <span className="adm-tab-count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Badge ---------------- */
const BADGE_TONE = {
  "aktif": "green", "selesai": "green", "berhasil": "green", "ditampilkan": "green",
  "menunggu": "amber", "diproses": "amber",
  "nonaktif": "gray", "cuti": "gray",
  "dibatalkan": "red", "gagal": "red",
  "gold": "gold", "silver": "gray", "bronze": "bronze", "platinum": "dark",
};
export function Badge({ children }) {
  const tone = BADGE_TONE[String(children).toLowerCase()] || "gray";
  return <span className={"adm-badge tone-" + tone}>{children}</span>;
}

/* ---------------- Toggle ---------------- */
export function Toggle({ checked, onChange }) {
  return (
    <button
      className={"adm-toggle" + (checked ? " on" : "")}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      type="button"
    >
      <span className="adm-toggle-knob" />
    </button>
  );
}

/* ---------------- Generic Data Table ---------------- */
/**
 * columns: [{ key, label, render?(row) }]
 * data: array of row objects (must include `id`)
 * onAdd/onEdit/onDelete: optional handlers; when provided, action buttons render
 * searchKeys: which fields free-text search matches against
 */
export function DataTable({ title, columns, data, searchKeys, onAdd, onDelete, addLabel = "Tambah Data" }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return data;
    const needle = q.toLowerCase();
    return data.filter((row) =>
      (searchKeys || columns.map((c) => c.key)).some((k) => String(row[k] ?? "").toLowerCase().includes(needle))
    );
  }, [q, data, columns, searchKeys]);

  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div>
          {title && <h3 className="adm-card-title">{title}</h3>}
          <div className="adm-card-count">{filtered.length} data</div>
        </div>
        <div className="adm-card-actions">
          <div className="adm-search">
            <Search size={14} />
            <input placeholder="Cari data..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {onAdd && (
            <button className="adm-btn primary" onClick={onAdd}>
              <Plus size={14} /> {addLabel}
            </button>
          )}
        </div>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              {onDelete && <th className="adm-table-actioncol">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length + (onDelete ? 1 : 0)} className="adm-table-empty">Tidak ada data yang cocok.</td></tr>
            )}
            {filtered.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
                ))}
                {onDelete && (
                  <td className="adm-table-actioncol">
                    <button className="adm-icon-btn" onClick={() => onDelete(row)} aria-label="Hapus">
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Simple modal (used for "add" forms) ---------------- */
export function Modal({ title, onClose, children }) {
  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-head">
          <h3>{title}</h3>
          <button className="adm-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="adm-modal-body">{children}</div>
      </div>
    </div>
  );
}

export function FormField({ label, ...props }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}
