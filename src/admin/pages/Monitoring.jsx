import React, { useMemo, useState } from "react";
import { Coins, ShieldOff, ShieldCheck as ShieldOn, Star, UserPlus } from "lucide-react";
import { DataTable, Badge, Modal, FormField } from "../components/ui";
import {
  MONITORING_BOOKINGS, MONITORING_CAPSTERS, MONITORING_CUSTOMERS, MONITORING_CABANG,
  ADMIN_LAYANAN, rupiah,
} from "../adminData";
import { scopeByBranch, isSuperScope } from "../scope";

const STATUS_OPTIONS = ["Menunggu", "Diproses", "Selesai", "Dibatalkan"];
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}`;

/* ---------------- Booking ---------------- */
function BookingMonitor({ user }) {
  const [rows, setRows] = useState(MONITORING_BOOKINGS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  const scopedRows = scopeByBranch(rows, user, ["branch"]);
  const branchOptions = isSuperScope(user) ? MONITORING_CABANG.map((b) => b.name) : [user.branch];
  const capsterOptions = MONITORING_CAPSTERS.filter((c) => !form.branch || c.branchName === form.branch);
  const serviceSelected = ADMIN_LAYANAN.find((s) => s.name === form.service);

  const updateStatus = (id, status) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  const updateCapster = (id, capster) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, capster } : r)));

  const handleAdd = () => {
    const branch = form.branch || branchOptions[0];
    const svc = ADMIN_LAYANAN.find((s) => s.name === form.service) || ADMIN_LAYANAN[0];
    setRows((r) => [{
      id: uid("WI"),
      customer: form.customer || "Customer Walk-in",
      service: svc.name,
      capster: form.capster || "-",
      branch,
      date: form.date || "Hari ini",
      time: form.time || "-",
      price: svc.price,
      status: "Selesai",
      walkIn: true,
    }, ...r]);
    setForm({});
    setOpen(false);
  };

  const columns = [
    { key: "id", label: "ID Booking", render: (r) => <span className="adm-mono">{r.id}{r.walkIn && <span className="adm-walkin-tag">walk-in</span>}</span> },
    { key: "customer", label: "Customer" },
    { key: "service", label: "Layanan" },
    {
      key: "capster", label: "Capster",
      render: (r) => {
        const opts = MONITORING_CAPSTERS.filter((c) => c.branchName === r.branch).map((c) => c.name);
        return (
          <select className="adm-status-select" value={r.capster} onChange={(e) => updateCapster(r.id, e.target.value)}>
            {!opts.includes(r.capster) && <option value={r.capster}>{r.capster}</option>}
            {opts.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        );
      },
    },
    { key: "branch", label: "Cabang" },
    { key: "date", label: "Jadwal", render: (r) => `${r.date}, ${r.time}` },
    { key: "price", label: "Harga", render: (r) => rupiah(r.price) },
    {
      key: "status", label: "Status",
      render: (r) => (
        <select className="adm-status-select" value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Semua Booking"
        addLabel="Booking Manual (Walk-in)"
        columns={columns}
        data={scopedRows}
        searchKeys={["id", "customer", "service", "capster", "branch", "status"]}
        onAdd={() => setOpen(true)}
      />
      {open && (
        <Modal title="Booking Manual (Walk-in)" onClose={() => setOpen(false)}>
          <p className="adm-modal-desc">Untuk customer yang datang langsung ke cabang tanpa booking lewat web.</p>
          <div className="adm-form-grid">
            <FormField label="Nama Customer" placeholder="Nama customer" value={form.customer || ""} onChange={(e) => setForm((s) => ({ ...s, customer: e.target.value }))} />
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
            <FormField label="Jam" placeholder="Cth: 14:30" value={form.time || ""} onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))} />
            <div className="adm-field"><span>Harga</span><div className="adm-form-static">{serviceSelected ? rupiah(serviceSelected.price) : "Pilih layanan dulu"}</div></div>
          </div>
          <div className="adm-modal-footer">
            <button className="adm-btn ghost" onClick={() => setOpen(false)}>Batal</button>
            <button className="adm-btn primary" onClick={handleAdd}><UserPlus size={14} /> Simpan Booking</button>
          </div>
        </Modal>
      )}
    </>
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
