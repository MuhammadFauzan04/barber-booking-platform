import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Coins, ShieldOff, ShieldCheck as ShieldOn, Star, UserPlus, Eye, Pencil,
  MoreVertical, Printer, MapPin, CalendarDays, Phone, Mail, Trash2, Download,
  ChevronLeft, ChevronRight, Search, Plus, X, StickyNote,
} from "lucide-react";
import { DataTable, Badge, Modal, FormField, StatCard, Tabs } from "../components/ui";
import {
  MONITORING_BOOKINGS, MONITORING_CAPSTERS, MONITORING_CUSTOMERS, MONITORING_CABANG,
  ADMIN_LAYANAN, rupiah,
} from "../adminData";
import { scopeByBranch, isSuperScope } from "../scope";

const STATUS_OPTIONS = ["Menunggu", "Diproses", "Selesai", "Dibatalkan"];
const PAYMENT_OPTIONS = ["QRIS", "GoPay / OVO / DANA", "Kartu Debit / Kredit", "Bayar di Tempat"];
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}`;
const initials = (name = "") => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

/* ---------------- Mock enrichment for the booking detail card ---------------- */
/* Table rows only carry the columns needed for the list; a few extra
   presentational fields (contact info, durasi, metode pembayaran, catatan,
   rating) are filled in from the customer/layanan records where possible,
   and otherwise cycled from a small pool so every booking has something
   sensible to show in the detail panel. Walk-in bookings created from the
   form below carry their own real values instead of the cycled ones. */
const NOTES_CYCLE = [
  "Harap tidak terlalu pendek di samping.", "", "Tolong rapikan bagian belakang saja.", "",
  "Suka gaya kemarin, ulangi model yang sama.", "", "Kulit cukup sensitif, mohon pelan-pelan.", "",
];
const CREATED_CYCLE = [
  { date: "20 Jul 2026", time: "21:15" }, { date: "12 Jul 2026", time: "09:40" },
  { date: "27 Jun 2026", time: "18:05" }, { date: "8 Jun 2026", time: "14:22" },
  { date: "22 Mei 2026", time: "11:50" }, { date: "2 Mei 2026", time: "20:10" },
  { date: "3 Agu 2026", time: "08:15" }, { date: "3 Agu 2026", time: "16:40" },
];
const RATING_CYCLE = [
  { value: 5.0, text: "Sangat memuaskan! Hasilnya rapi dan sesuai request.", date: "20 Jul 2026, 22:30" },
  { value: 4.5, text: "Rapi, capsternya komunikatif dan ramah.", date: "15 Jul 2026, 09:10" },
  null,
  { value: 4.8, text: "Potongan pas, pasti booking lagi di sini.", date: "30 Jun 2026, 12:40" },
  { value: 4.0, text: "Cukup bagus, waktu tunggu agak lama.", date: "7 Mei 2026, 16:00" },
  null,
];

function enrichBookings(list) {
  return list.map((r, i) => ({
    ...r,
    phone: r.phone || MONITORING_CUSTOMERS.find((c) => c.name === r.customer)?.phone || "-",
    email: r.email || MONITORING_CUSTOMERS.find((c) => c.name === r.customer)?.email || "-",
    duration: r.duration || ADMIN_LAYANAN.find((s) => s.name === r.service)?.duration || "-",
    payment: r.payment || PAYMENT_OPTIONS[i % PAYMENT_OPTIONS.length],
    createdAt: r.createdAt || CREATED_CYCLE[i % CREATED_CYCLE.length],
    notes: r.notes ?? NOTES_CYCLE[i % NOTES_CYCLE.length],
    rating: r.status === "Selesai" ? (r.rating || RATING_CYCLE[i % RATING_CYCLE.length]) : null,
  }));
}

/* ---------------- Booking ---------------- */
function BookingMonitor({ user }) {
  const [rows, setRows] = useState(() => enrichBookings(MONITORING_BOOKINGS));
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({});

  const [q, setQ] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [activeTab, setActiveTab] = useState("semua");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [detailId, setDetailId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [menuRowId, setMenuRowId] = useState(null);
  const menuRef = useRef(null);

  const scopedRows = scopeByBranch(rows, user, ["branch"]);
  const branchOptions = isSuperScope(user) ? MONITORING_CABANG.map((b) => b.name) : [user.branch];
  const capsterOptions = MONITORING_CAPSTERS.filter((c) => !form.branch || c.branchName === form.branch);
  const serviceSelected = ADMIN_LAYANAN.find((s) => s.name === form.service);

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuRowId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  /* ---- stats ---- */
  const stats = useMemo(() => {
    const total = scopedRows.length;
    const selesai = scopedRows.filter((r) => r.status === "Selesai").length;
    const dibatalkan = scopedRows.filter((r) => r.status === "Dibatalkan").length;
    const pendapatan = scopedRows.filter((r) => r.status === "Selesai").reduce((s, r) => s + r.price, 0);
    const rated = scopedRows.map((r) => r.rating).filter(Boolean);
    const avgRating = rated.length ? rated.reduce((s, r) => s + r.value, 0) / rated.length : 0;
    return { total, selesai, dibatalkan, pendapatan, avgRating, ratedCount: rated.length };
  }, [scopedRows]);

  /* ---- tabs ---- */
  const tabCounts = useMemo(() => ({
    semua: scopedRows.length,
    Menunggu: scopedRows.filter((r) => r.status === "Menunggu").length,
    Diproses: scopedRows.filter((r) => r.status === "Diproses").length,
    Selesai: scopedRows.filter((r) => r.status === "Selesai").length,
    Dibatalkan: scopedRows.filter((r) => r.status === "Dibatalkan").length,
  }), [scopedRows]);

  const tabs = [
    { id: "semua", label: "Semua Booking", count: tabCounts.semua },
    { id: "Menunggu", label: "Menunggu", count: tabCounts.Menunggu },
    { id: "Diproses", label: "Diproses", count: tabCounts.Diproses },
    { id: "Selesai", label: "Selesai", count: tabCounts.Selesai },
    { id: "Dibatalkan", label: "Dibatalkan", count: tabCounts.Dibatalkan },
  ];

  /* ---- filtering ---- */
  const filteredRows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return scopedRows
      .filter((r) => activeTab === "semua" || r.status === activeTab)
      .filter((r) => !branchFilter || r.branch === branchFilter)
      .filter((r) => !statusFilter || r.status === statusFilter)
      .filter((r) => !serviceFilter || r.service === serviceFilter)
      .filter((r) => !needle || [r.id, r.customer, r.service, r.capster, r.branch, r.status]
        .some((v) => String(v).toLowerCase().includes(needle)));
  }, [scopedRows, activeTab, branchFilter, statusFilter, serviceFilter, q]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const rangeStart = filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, filteredRows.length);

  const resetToFirstPage = () => setPage(1);
  const resetFilters = () => { setBranchFilter(""); setStatusFilter(""); setServiceFilter(""); setQ(""); resetToFirstPage(); };

  /* ---- row mutations ---- */
  const updateRow = (id, patch) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const handleDelete = (row) => {
    if (!window.confirm(`Hapus booking ${row.id} milik ${row.customer}?`)) return;
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    setMenuRowId(null);
    if (detailId === row.id) setDetailId(null);
  };

  const handlePrint = () => { window.print(); setMenuRowId(null); };

  const handleExport = () => {
    const header = ["ID Booking", "Customer", "No. HP", "Layanan", "Capster", "Cabang", "Tanggal", "Jam", "Harga", "Status"];
    const lines = filteredRows.map((r) => [r.id, r.customer, r.phone, r.service, r.capster, r.branch, r.date, r.time, r.price, r.status]);
    const csv = [header, ...lines]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ---- detail drawer ---- */
  const detailRow = rows.find((r) => r.id === detailId) || null;

  const openDetail = (row, startEditing = false) => {
    setDetailId(row.id);
    setEditForm({ status: row.status, capster: row.capster, notes: row.notes || "" });
    setEditing(startEditing);
    setMenuRowId(null);
  };
  const closeDetail = () => { setDetailId(null); setEditing(false); };
  const saveEdit = () => {
    if (!detailRow) return;
    updateRow(detailRow.id, { status: editForm.status, capster: editForm.capster, notes: editForm.notes });
    setEditing(false);
  };

  /* ---- walk-in form ---- */
  const handleAdd = () => {
    const branch = form.branch || branchOptions[0];
    const svc = ADMIN_LAYANAN.find((s) => s.name === form.service) || ADMIN_LAYANAN[0];
    const now = new Date();
    const todayLabel = now.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    setRows((r) => [{
      id: uid("WI"),
      customer: form.customer || "Customer Walk-in",
      phone: form.phone || "-",
      email: "-",
      service: svc.name,
      capster: form.capster || "-",
      branch,
      date: form.date || todayLabel,
      time: form.time || "-",
      price: svc.price,
      duration: svc.duration || "-",
      payment: form.payment || "Bayar di Tempat",
      notes: form.notes || "",
      status: "Selesai",
      walkIn: true,
      createdAt: { date: todayLabel, time: now.toTimeString().slice(0, 5) },
      rating: null,
    }, ...r]);
    setForm({});
    setAddOpen(false);
  };

  return (
    <>
      <div className="adm-stat-grid">
        <StatCard label="Total Booking" value={stats.total} trend={`${scopedRows.length} tercatat`} tone="neutral" />
        <StatCard label="Selesai" value={stats.selesai} trend="Booking selesai dilayani" tone="up" />
        <StatCard label="Dibatalkan" value={stats.dibatalkan} trend="Dibatalkan customer/cabang" tone="down" />
        <StatCard label="Pendapatan" value={rupiah(stats.pendapatan)} trend="Dari booking selesai" tone="up" />
        <StatCard label="Rata-rata Rating" value={stats.avgRating ? stats.avgRating.toFixed(1) : "-"} trend={`${stats.ratedCount} ulasan`} tone="neutral" />
      </div>

      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title">Semua Booking</h3>
            <div className="adm-card-count">{filteredRows.length} dari {scopedRows.length} booking</div>
          </div>
          <div className="adm-card-actions">
            <div className="adm-search">
              <Search size={14} />
              <input placeholder="Cari ID, customer, capster..." value={q} onChange={(e) => { setQ(e.target.value); resetToFirstPage(); }} />
            </div>
            <button className="adm-btn ghost" onClick={handleExport}><Download size={14} /> Export</button>
            <button className="adm-btn primary" onClick={() => setAddOpen(true)}><Plus size={14} /> Booking Manual (Walk-in)</button>
          </div>
        </div>

        <div className="adm-filter-row">
          <select className="adm-filter-select" value={branchFilter} onChange={(e) => { setBranchFilter(e.target.value); resetToFirstPage(); }}>
            <option value="">Semua Cabang</option>
            {branchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className="adm-filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); resetToFirstPage(); }}>
            <option value="">Semua Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="adm-filter-select" value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); resetToFirstPage(); }}>
            <option value="">Semua Layanan</option>
            {ADMIN_LAYANAN.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          {(branchFilter || statusFilter || serviceFilter || q) && (
            <button className="adm-btn ghost" onClick={resetFilters}>Reset Filter</button>
          )}
        </div>

        <Tabs tabs={tabs} active={activeTab} onChange={(id) => { setActiveTab(id); resetToFirstPage(); }} />

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>ID Booking</th>
                <th>Customer</th>
                <th>Layanan</th>
                <th>Capster</th>
                <th>Cabang</th>
                <th>Jadwal</th>
                <th>Harga</th>
                <th>Status</th>
                <th className="adm-table-actioncol">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr><td colSpan={9} className="adm-table-empty">Tidak ada booking yang cocok dengan filter ini.</td></tr>
              )}
              {pageRows.map((r) => (
                <tr key={r.id}>
                  <td><span className="adm-mono">{r.id}</span>{r.walkIn && <span className="adm-walkin-tag">walk-in</span>}</td>
                  <td>
                    <div className="adm-cell-person">
                      <span className="adm-avatar-circle sm">{initials(r.customer)}</span>
                      <div>
                        <div className="adm-cell-main">{r.customer}</div>
                        <div className="adm-cell-sub">{r.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>{r.service}</td>
                  <td>
                    <div className="adm-cell-person">
                      <span className="adm-avatar-circle xs muted">{initials(r.capster)}</span>
                      <span className="adm-cell-main">{r.capster}</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-cell-icon-row"><MapPin size={13} /> {r.branch}</div>
                  </td>
                  <td>
                    <div className="adm-cell-icon-row"><CalendarDays size={13} /> {r.date}</div>
                    <div className="adm-cell-sub">{r.time}</div>
                  </td>
                  <td>{rupiah(r.price)}</td>
                  <td><Badge>{r.status}</Badge></td>
                  <td className="adm-table-actioncol">
                    <div className="adm-actions-cell" ref={menuRowId === r.id ? menuRef : null}>
                      <button className="adm-icon-btn" aria-label="Lihat detail" onClick={() => openDetail(r, false)}><Eye size={14} /></button>
                      <button className="adm-icon-btn" aria-label="Edit booking" onClick={() => openDetail(r, true)}><Pencil size={14} /></button>
                      <button className="adm-icon-btn" aria-label="Menu lainnya" onClick={() => setMenuRowId((id) => (id === r.id ? null : r.id))}><MoreVertical size={14} /></button>
                      {menuRowId === r.id && (
                        <div className="adm-action-menu">
                          <button onClick={() => { openDetail(r, false); }}><Eye size={13} /> Lihat Detail</button>
                          <button onClick={handlePrint}><Printer size={13} /> Cetak Struk</button>
                          <button className="danger" onClick={() => handleDelete(r)}><Trash2 size={13} /> Hapus Booking</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="adm-pagination">
          <div className="adm-pagination-info">
            {filteredRows.length === 0
              ? "Tidak ada data"
              : `Menampilkan ${rangeStart} - ${rangeEnd} dari ${filteredRows.length} booking`}
          </div>
          <div className="adm-pagination-controls">
            <button className="adm-icon-btn" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft size={14} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
              .reduce((acc, n) => {
                if (acc.length && n - acc[acc.length - 1] > 1) acc.push("...");
                acc.push(n);
                return acc;
              }, [])
              .map((n, i) => n === "..."
                ? <span key={`dots-${i}`} className="adm-pagination-dots">...</span>
                : <button key={n} className={"adm-pagination-page" + (n === currentPage ? " active" : "")} onClick={() => setPage(n)}>{n}</button>)}
            <button className="adm-icon-btn" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}><ChevronRight size={14} /></button>
          </div>
          <select className="adm-filter-select" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); resetToFirstPage(); }}>
            {[5, 8, 10, 20].map((n) => <option key={n} value={n}>{n} / halaman</option>)}
          </select>
        </div>
      </div>

      {addOpen && (
        <Modal title="Booking Manual (Walk-in)" onClose={() => setAddOpen(false)}>
          <p className="adm-modal-desc">Untuk customer yang datang langsung ke cabang tanpa booking lewat web.</p>
          <div className="adm-form-grid">
            <FormField label="Nama Customer" placeholder="Nama customer" value={form.customer || ""} onChange={(e) => setForm((s) => ({ ...s, customer: e.target.value }))} />
            <FormField label="No. HP Customer" placeholder="Cth: 0812-3456-7890" value={form.phone || ""} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
            <label className="adm-field">
              <span>Cabang</span>
              <select value={form.branch || branchOptions[0]} onChange={(e) => setForm((s) => ({ ...s, branch: e.target.value, capster: "" }))}>
                {branchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>
            <label className="adm-field">
              <span>Layanan</span>
              <select value={form.service || ""} onChange={(e) => setForm((s) => ({ ...s, service: e.target.value }))}>
                <option value="">Pilih layanan</option>
                {ADMIN_LAYANAN.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </label>
            <label className="adm-field">
              <span>Capster</span>
              <select value={form.capster || ""} onChange={(e) => setForm((s) => ({ ...s, capster: e.target.value }))}>
                <option value="">Pilih capster</option>
                {capsterOptions.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </label>
            <FormField label="Tanggal" placeholder="Cth: 5 Agu 2026" value={form.date || ""} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} />
            <FormField label="Jam" placeholder="Cth: 14:30" value={form.time || ""} onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))} />
            <label className="adm-field">
              <span>Metode Pembayaran</span>
              <select value={form.payment || ""} onChange={(e) => setForm((s) => ({ ...s, payment: e.target.value }))}>
                <option value="">Pilih metode</option>
                {PAYMENT_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <div className="adm-field"><span>Harga</span><div className="adm-form-static">{serviceSelected ? rupiah(serviceSelected.price) : "Pilih layanan dulu"}</div></div>
            <label className="adm-field adm-field-full">
              <span>Catatan Customer (opsional)</span>
              <textarea placeholder="Cth: tidak terlalu pendek di samping" value={form.notes || ""} onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))} />
            </label>
          </div>
          <div className="adm-modal-footer">
            <button className="adm-btn ghost" onClick={() => setAddOpen(false)}>Batal</button>
            <button className="adm-btn primary" onClick={handleAdd}><UserPlus size={14} /> Simpan Booking</button>
          </div>
        </Modal>
      )}

      {detailRow && (
        <BookingDetailDrawer
          row={detailRow}
          capsterOptions={MONITORING_CAPSTERS.filter((c) => c.branchName === detailRow.branch)}
          editing={editing}
          editForm={editForm}
          setEditForm={setEditForm}
          onClose={closeDetail}
          onStartEdit={() => setEditing(true)}
          onCancelEdit={() => { setEditing(false); setEditForm({ status: detailRow.status, capster: detailRow.capster, notes: detailRow.notes || "" }); }}
          onSave={saveEdit}
          onPrint={handlePrint}
        />
      )}
    </>
  );
}

/* ---------------- Booking detail drawer ---------------- */
function BookingDetailDrawer({ row, capsterOptions, editing, editForm, setEditForm, onClose, onStartEdit, onCancelEdit, onSave, onPrint }) {
  return (
    <div className="adm-drawer-overlay" onClick={onClose}>
      <div className="adm-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="adm-drawer-head">
          <h3>Detail Booking</h3>
          <button className="adm-icon-btn" onClick={onClose} aria-label="Tutup"><X size={16} /></button>
        </div>

        <div className="adm-drawer-body">
          <Badge>{row.status}</Badge>
          <div className="adm-drawer-id-label">ID Booking</div>
          <div className="adm-drawer-id">{row.id}</div>
          <div className="adm-drawer-meta">Dibuat pada {row.createdAt?.date}, {row.createdAt?.time}</div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Informasi Customer</div>
            <div className="adm-drawer-person">
              <span className="adm-avatar-circle md">{initials(row.customer)}</span>
              <div>
                <div className="adm-drawer-person-name">{row.customer}</div>
                <div className="adm-drawer-contact-row"><Phone size={12} /> {row.phone}</div>
                <div className="adm-drawer-contact-row"><Mail size={12} /> {row.email}</div>
              </div>
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Detail Booking</div>
            <div className="adm-drawer-kv"><span>Cabang</span><b>{row.branch}</b></div>
            <div className="adm-drawer-kv"><span>Layanan</span><b>{row.service}</b></div>
            <div className="adm-drawer-kv">
              <span>Capster</span>
              {editing ? (
                <select value={editForm.capster} onChange={(e) => setEditForm((s) => ({ ...s, capster: e.target.value }))}>
                  {!capsterOptions.some((c) => c.name === editForm.capster) && <option value={editForm.capster}>{editForm.capster}</option>}
                  {capsterOptions.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              ) : (
                <b className="adm-inline-icon"><span className="adm-avatar-circle xs muted">{initials(row.capster)}</span> {row.capster}</b>
              )}
            </div>
            <div className="adm-drawer-kv"><span>Jadwal</span><b>{row.date}, {row.time}</b></div>
            <div className="adm-drawer-kv"><span>Durasi</span><b>{row.duration}</b></div>
            <div className="adm-drawer-kv"><span>Harga</span><b>{rupiah(row.price)}</b></div>
            <div className="adm-drawer-kv"><span>Metode Pembayaran</span><b>{row.payment}</b></div>
            <div className="adm-drawer-kv">
              <span>Status</span>
              {editing ? (
                <select value={editForm.status} onChange={(e) => setEditForm((s) => ({ ...s, status: e.target.value }))}>
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : <b><Badge>{row.status}</Badge></b>}
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Informasi Tambahan</div>
            <div className="adm-drawer-note-label"><StickyNote size={12} /> Catatan Customer</div>
            {editing ? (
              <textarea className="adm-drawer-note-input" placeholder="Tidak ada catatan" value={editForm.notes} onChange={(e) => setEditForm((s) => ({ ...s, notes: e.target.value }))} />
            ) : (
              <div className="adm-drawer-note-box">{row.notes ? `"${row.notes}"` : "Tidak ada catatan."}</div>
            )}

            {row.rating && !editing && (
              <>
                <div className="adm-drawer-note-label" style={{ marginTop: 14 }}>Rating &amp; Ulasan</div>
                <div className="adm-drawer-rating">
                  <span className="adm-inline-icon"><Star size={14} fill="#C79A3E" stroke="#C79A3E" /> {row.rating.value.toFixed(1)}</span>
                  <span className="adm-drawer-rating-text">{row.rating.text}</span>
                  <span className="adm-cell-sub">{row.rating.date}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="adm-drawer-footer">
          {editing ? (
            <>
              <button className="adm-btn ghost" onClick={onCancelEdit}>Batal</button>
              <button className="adm-btn primary" onClick={onSave}>Simpan Perubahan</button>
            </>
          ) : (
            <>
              <button className="adm-btn ghost" onClick={onStartEdit}><Pencil size={14} /> Edit Booking</button>
              <button className="adm-btn primary" onClick={onPrint}><Printer size={14} /> Cetak Struk</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Capster ---------------- */
function CapsterMonitor({ user }) {
  const scoped = scopeByBranch(MONITORING_CAPSTERS, user, ["branchName"]);
  const columns = [
    { key: "name", label: "Nama Capster" },
    { key: "branchName", label: "Cabang" },
    { key: "rating", label: "Rating", render: (r) => <span className="adm-inline-icon"><Star size={13} fill="#C79A3E" stroke="#C79A3E" /> {r.rating}</span> },
    { key: "reviews", label: "Ulasan" },
    { key: "bookingHariIni", label: "Booking Hari Ini" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];
  return <DataTable title="Semua Capster" columns={columns} data={scoped} searchKeys={["name", "branchName", "status"]} />;
}

/* ---------------- Customer (+ detail & poin) ---------------- */
function CustomerMonitor({ user }) {
  const [rows, setRows] = useState(MONITORING_CUSTOMERS);
  const [detail, setDetail] = useState(null);
  const [pointForm, setPointForm] = useState({ amount: "", reason: "" });

  const scoped = scopeByBranch(rows, user, ["branch"]);
  const detailBookings = detail ? MONITORING_BOOKINGS.filter((b) => b.customer === detail.name) : [];

  const applyPoints = (delta) => {
    if (!detail) return;
    const amount = Number(pointForm.amount) || 0;
    if (!amount) return;
    setRows((r) => r.map((x) => (x.id === detail.id ? { ...x, points: Math.max(0, x.points + delta * amount) } : x)));
    setDetail((d) => ({ ...d, points: Math.max(0, d.points + delta * amount) }));
    setPointForm({ amount: "", reason: "" });
  };

  const toggleStatus = () => {
    if (!detail) return;
    const next = detail.status === "Aktif" ? "Nonaktif" : "Aktif";
    setRows((r) => r.map((x) => (x.id === detail.id ? { ...x, status: next } : x)));
    setDetail((d) => ({ ...d, status: next }));
  };

  const columns = [
    { key: "name", label: "Nama", render: (r) => <button className="adm-link-btn" onClick={() => setDetail(r)}>{r.name}</button> },
    { key: "phone", label: "No. HP" },
    { key: "branch", label: "Cabang Utama" },
    { key: "tier", label: "Tier", render: (r) => <Badge>{r.tier}</Badge> },
    { key: "points", label: "Poin" },
    { key: "totalSpend", label: "Total Belanja", render: (r) => rupiah(r.totalSpend) },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];

  return (
    <>
      <DataTable title="Semua Customer" columns={columns} data={scoped} searchKeys={["name", "phone", "email", "tier", "branch"]} />
      {detail && (
        <Modal title={detail.name} onClose={() => setDetail(null)}>
          <div className="adm-detail-grid">
            <div><span>Telepon</span><b>{detail.phone}</b></div>
            <div><span>Email</span><b>{detail.email}</b></div>
            <div><span>Cabang Utama</span><b>{detail.branch}</b></div>
            <div><span>Bergabung</span><b>{detail.joined}</b></div>
            <div><span>Tier</span><b><Badge>{detail.tier}</Badge></b></div>
            <div><span>Status Akun</span><b><Badge>{detail.status}</Badge></b></div>
          </div>

          <div className="adm-detail-section">
            <div className="adm-detail-section-head">
              <h4>Poin Loyalitas</h4>
              <span className="adm-detail-points"><Coins size={15} /> {detail.points} poin</span>
            </div>
            <div className="adm-point-form">
              <input type="number" placeholder="Jumlah poin" value={pointForm.amount} onChange={(e) => setPointForm((s) => ({ ...s, amount: e.target.value }))} />
              <input placeholder="Alasan (cth: kompensasi komplain)" value={pointForm.reason} onChange={(e) => setPointForm((s) => ({ ...s, reason: e.target.value }))} />
              <button className="adm-btn ghost" onClick={() => applyPoints(-1)}>Kurangi</button>
              <button className="adm-btn primary" onClick={() => applyPoints(1)}>Tambah</button>
            </div>
          </div>

          <div className="adm-detail-section">
            <h4>Riwayat Booking ({detailBookings.length})</h4>
            <div className="adm-table-wrap" style={{ margin: 0, padding: 0 }}>
              <table className="adm-table">
                <thead><tr><th>Layanan</th><th>Cabang</th><th>Jadwal</th><th>Status</th></tr></thead>
                <tbody>
                  {detailBookings.length === 0 && <tr><td colSpan={4} className="adm-table-empty">Belum ada riwayat booking.</td></tr>}
                  {detailBookings.map((b) => (
                    <tr key={b.id}><td>{b.service}</td><td>{b.branch}</td><td>{b.date}, {b.time}</td><td><Badge>{b.status}</Badge></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="adm-modal-footer">
            <button className={"adm-btn " + (detail.status === "Aktif" ? "danger" : "primary")} onClick={toggleStatus}>
              {detail.status === "Aktif" ? <><ShieldOff size={14} /> Nonaktifkan Akun</> : <><ShieldOn size={14} /> Aktifkan Akun</>}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ---------------- Cabang ---------------- */
function CabangMonitor({ user }) {
  const scoped = scopeByBranch(MONITORING_CABANG, user, ["name"]);
  const columns = [
    { key: "name", label: "Nama Cabang" },
    { key: "city", label: "Kota" },
    { key: "address", label: "Alamat" },
    { key: "phone", label: "Telepon" },
    { key: "capsterCount", label: "Jml Capster" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];
  return <DataTable title="Semua Cabang" columns={columns} data={scoped} searchKeys={["name", "city"]} />;
}

export function Monitoring({ page, user }) {
  return (
    <div className="adm-page">
      {page === "monitoring-booking" && <BookingMonitor user={user} />}
      {page === "monitoring-capster" && <CapsterMonitor user={user} />}
      {page === "monitoring-customer" && <CustomerMonitor user={user} />}
      {page === "monitoring-cabang" && <CabangMonitor user={user} />}
    </div>
  );
}