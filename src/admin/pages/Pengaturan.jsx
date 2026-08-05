import React, { useState } from "react";
import { CheckCircle2, DatabaseBackup, Plus } from "lucide-react";
import { DataTable, Badge, Toggle, Modal, FormField } from "../components/ui";
import {
  ADMIN_ROLES, ADMIN_NOTIF_SETTINGS, ADMIN_JAM_OPERASIONAL,
  ADMIN_PAYMENT_SETTINGS, ADMIN_BACKUP_LOG,
} from "../adminData";
import { canManageUsers, canManageBackup } from "../scope";

function RoleUserSection() {
  const [rows, setRows] = useState(ADMIN_ROLES);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleAdd = () => {
    setRows((r) => [{ id: "r" + Date.now(), name: form.name || "Admin Baru", email: form.email || "-", role: form.role || "Admin Cabang", branch: form.branch || "-", status: "Aktif" }, ...r]);
    setForm({});
    setOpen(false);
  };

  const columns = [
    { key: "name", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "branch", label: "Cabang" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];

  return (
    <>
      <DataTable
        title="Role & Akses User Admin"
        addLabel="Tambah Admin"
        columns={columns}
        data={rows}
        searchKeys={["name", "email", "role"]}
        onAdd={() => setOpen(true)}
        onDelete={(row) => setRows((r) => r.filter((x) => x.id !== row.id))}
      />
      {open && (
        <Modal title="Tambah Admin" onClose={() => setOpen(false)}>
          <div className="adm-form-grid">
            <FormField label="Nama" placeholder="Nama lengkap" value={form.name || ""} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            <FormField label="Email" placeholder="nama@cartenz.id" value={form.email || ""} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
            <FormField label="Role" placeholder="Admin Cabang / Finance / Super Admin" value={form.role || ""} onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))} />
            <FormField label="Cabang" placeholder="Nama cabang atau Semua Cabang" value={form.branch || ""} onChange={(e) => setForm((s) => ({ ...s, branch: e.target.value }))} />
          </div>
          <div className="adm-modal-footer">
            <button className="adm-btn ghost" onClick={() => setOpen(false)}>Batal</button>
            <button className="adm-btn primary" onClick={handleAdd}>Simpan</button>
          </div>
        </Modal>
      )}
    </>
  );
}

function NotifikasiSection() {
  const [rows, setRows] = useState(ADMIN_NOTIF_SETTINGS);
  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div>
          <h3 className="adm-card-title">Preferensi Notifikasi</h3>
          <div className="adm-card-count">Atur notifikasi mana yang dikirim ke tim admin</div>
        </div>
      </div>
      <div className="adm-settings-list">
        {rows.map((n) => (
          <div key={n.id} className="adm-settings-row">
            <div>
              <div className="adm-settings-row-label">{n.label}</div>
              <div className="adm-settings-row-desc">{n.desc}</div>
            </div>
            <Toggle checked={n.enabled} onChange={(v) => setRows((r) => r.map((x) => (x.id === n.id ? { ...x, enabled: v } : x)))} />
          </div>
        ))}
      </div>
    </div>
  );
}

function JamOperasionalSection() {
  const [rows, setRows] = useState(ADMIN_JAM_OPERASIONAL);

  const update = (id, key, value) => setRows((r) => r.map((x) => (x.id === id ? { ...x, [key]: value } : x)));

  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div>
          <h3 className="adm-card-title">Jam Operasional per Cabang</h3>
          <div className="adm-card-count">Jam buka/tutup dipakai untuk membatasi slot booking customer</div>
        </div>
      </div>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Cabang</th><th>Jam Buka</th><th>Jam Tutup</th><th>Libur Mingguan</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.cabang}</td>
                <td><input className="adm-inline-input" type="time" value={r.buka} onChange={(e) => update(r.id, "buka", e.target.value)} /></td>
                <td><input className="adm-inline-input" type="time" value={r.tutup} onChange={(e) => update(r.id, "tutup", e.target.value)} /></td>
                <td><input className="adm-inline-input" placeholder="Cth: Tidak ada" value={r.liburMingguan} onChange={(e) => update(r.id, "liburMingguan", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentSection() {
  const [rows, setRows] = useState(ADMIN_PAYMENT_SETTINGS);
  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div>
          <h3 className="adm-card-title">Metode Pembayaran</h3>
          <div className="adm-card-count">Aktifkan / nonaktifkan metode pembayaran yang tersedia untuk customer</div>
        </div>
      </div>
      <div className="adm-settings-list">
        {rows.map((p) => (
          <div key={p.id} className="adm-settings-row">
            <div>
              <div className="adm-settings-row-label">{p.name}</div>
              <div className="adm-settings-row-desc">{p.desc}</div>
            </div>
            <Toggle checked={p.enabled} onChange={(v) => setRows((r) => r.map((x) => (x.id === p.id ? { ...x, enabled: v } : x)))} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BackupSection() {
  const [rows, setRows] = useState(ADMIN_BACKUP_LOG);
  const [running, setRunning] = useState(false);

  const runBackup = () => {
    setRunning(true);
    setTimeout(() => {
      setRows((r) => [{ id: "b" + Date.now(), waktu: "Baru saja", ukuran: "183 MB", status: "Berhasil" }, ...r]);
      setRunning(false);
    }, 1200);
  };

  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div>
          <h3 className="adm-card-title">Backup Database</h3>
          <div className="adm-card-count">Backup otomatis berjalan tiap hari pukul 03:00</div>
        </div>
        <button className="adm-btn primary" onClick={runBackup} disabled={running}>
          <DatabaseBackup size={14} /> {running ? "Sedang backup..." : "Backup Sekarang"}
        </button>
      </div>
      {!running && rows[0]?.waktu === "Baru saja" && (
        <div className="adm-export-toast"><CheckCircle2 size={15} /> Backup berhasil disimpan.</div>
      )}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Waktu</th><th>Ukuran</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <td>{b.waktu}</td>
                <td>{b.ukuran}</td>
                <td><Badge>{b.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Pengaturan({ page, user }) {
  const restricted = (page === "pengaturan-role" && !canManageUsers(user)) || (page === "pengaturan-backup" && !canManageBackup(user));
  if (restricted) {
    return (
      <div className="adm-page">
        <div className="adm-locked-note">Halaman ini khusus Super Admin. Kamu login sebagai {user.role} ({user.branch}).</div>
      </div>
    );
  }
  return (
    <div className="adm-page">
      {page === "pengaturan-role" && <RoleUserSection />}
      {page === "pengaturan-notifikasi" && <NotifikasiSection />}
      {page === "pengaturan-jam" && <JamOperasionalSection />}
      {page === "pengaturan-payment" && <PaymentSection />}
      {page === "pengaturan-backup" && <BackupSection />}
    </div>
  );
}
