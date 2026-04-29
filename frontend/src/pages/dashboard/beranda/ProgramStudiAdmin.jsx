import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function ProgramStudiAdmin() {
  const [data, setData] = useState([]);

  const [jenjang, setJenjang] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [prodi, setProdi] = useState("");

  const [selectedJenjang, setSelectedJenjang] = useState("");
  const [selectedFakultas, setSelectedFakultas] = useState("");

  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState("");
  const [editNama, setEditNama] = useState("");

  // ================= GET DATA =================
  const fetchData = async () => {
    const res = await api.get("/program-studi-admin");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CREATE =================
  const addJenjang = async () => {
    if (!jenjang) return alert("Isi jenjang");
    await api.post("/program-studi-admin", { type: "jenjang", nama: jenjang });
    setJenjang("");
    fetchData();
  };

  const addFakultas = async () => {
    if (!fakultas || !selectedJenjang) return alert("Lengkapi data");
    await api.post("/program-studi-admin", { type: "fakultas", nama: fakultas, jenjang_id: selectedJenjang });
    setFakultas("");
    fetchData();
  };

  const addProdi = async () => {
    if (!prodi || !selectedFakultas) return alert("Lengkapi data");
    await api.post("/program-studi-admin", { type: "prodi", nama: prodi, fakultas_id: selectedFakultas });
    setProdi("");
    fetchData();
  };

  // ================= UPDATE =================
  const startEdit = (id, type, nama) => {
    setEditId(id);
    setEditType(type);
    setEditNama(nama);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditType("");
    setEditNama("");
  };

  const saveEdit = async () => {
    await api.put(`/program-studi-admin/${editId}`, { type: editType, nama: editNama });
    cancelEdit();
    fetchData();
  };

  // ================= DELETE =================
  const deleteData = async (id, type) => {
    if (!confirm("Yakin hapus?")) return;
    await api.delete(`/program-studi-admin/${id}?type=${type}`);
    fetchData();
  };

  // ================= SHARED CLASSES =================
  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300";

  const selectClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition";

  const btnPrimary =
    "inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-4 py-2 rounded-lg shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150";

  const btnEdit =
    "inline-flex items-center gap-1 border border-blue-400 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-150";

  const btnDelete =
    "inline-flex items-center gap-1 border border-red-300 text-red-500 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-150";

  const btnSave =
    "inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all duration-150";

  const btnCancel =
    "inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all duration-150";

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-600 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Akademik</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Program Studi</h1>
        </div>
      </div>

      {/* ── Form Section ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Tambah Jenjang */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Tambah Jenjang</h2>
          </div>
          <div className="flex flex-col gap-3">
            <input
              value={jenjang}
              onChange={(e) => setJenjang(e.target.value)}
              placeholder="Nama jenjang..."
              className={inputClass + " w-full"}
            />
            <button onClick={addJenjang} className={btnPrimary}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Tambah Jenjang
            </button>
          </div>
        </div>

        {/* Tambah Fakultas */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Tambah Fakultas</h2>
          </div>
          <div className="flex flex-col gap-3">
            <select onChange={(e) => setSelectedJenjang(e.target.value)} className={selectClass + " w-full"}>
              <option value="">Pilih Jenjang</option>
              {data.map((j) => (
                <option key={j.id} value={j.id}>{j.nama}</option>
              ))}
            </select>
            <input
              value={fakultas}
              onChange={(e) => setFakultas(e.target.value)}
              placeholder="Nama fakultas..."
              className={inputClass + " w-full"}
            />
            <button onClick={addFakultas} className={btnPrimary}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Tambah Fakultas
            </button>
          </div>
        </div>

        {/* Tambah Prodi */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-300" />
            <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Tambah Prodi</h2>
          </div>
          <div className="flex flex-col gap-3">
            <select onChange={(e) => setSelectedFakultas(e.target.value)} className={selectClass + " w-full"}>
              <option value="">Pilih Fakultas</option>
              {data.map((j) =>
                j.fakultas?.map((f) => (
                  <option key={f.id} value={f.id}>{j.nama} — {f.nama}</option>
                ))
              )}
            </select>
            <input
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              placeholder="Nama prodi..."
              className={inputClass + " w-full"}
            />
            <button onClick={addProdi} className={btnPrimary}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Tambah Prodi
            </button>
          </div>
        </div>

      </div>

      {/* ── List Section ── */}
      <div className="space-y-4">
        {data.map((j) => (
          <div key={j.id} className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">

            {/* JENJANG ROW */}
            <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-blue-900 to-blue-700">
              {editId === j.id && editType === "jenjang" ? (
                <div className="flex items-center gap-3 w-full">
                  <input
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/30 text-white placeholder-white/50 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button onClick={saveEdit} className={btnSave}>Simpan</button>
                  <button onClick={cancelEdit} className={btnCancel}>Batal</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">Jenjang</span>
                    <h3 className="font-bold text-white text-base tracking-wide">{j.nama}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(j.id, "jenjang", j.nama)} className="border border-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all duration-150">
                      Edit
                    </button>
                    <button onClick={() => deleteData(j.id, "jenjang")} className="border border-red-400/50 text-red-300 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150">
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* FAKULTAS */}
            <div className="divide-y divide-blue-50">
              {j.fakultas?.map((f) => (
                <div key={f.id} className="px-5 py-3">

                  {/* Fakultas Row */}
                  <div className="flex justify-between items-center mb-2">
                    {editId === f.id && editType === "fakultas" ? (
                      <div className="flex items-center gap-3 w-full">
                        <input
                          value={editNama}
                          onChange={(e) => setEditNama(e.target.value)}
                          className={inputClass + " flex-1"}
                        />
                        <button onClick={saveEdit} className={btnSave}>Simpan</button>
                        <button onClick={cancelEdit} className={btnCancel}>Batal</button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-5 rounded-full bg-yellow-400 flex-shrink-0" />
                          <p className="font-semibold text-blue-800 text-sm">{f.nama}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(f.id, "fakultas", f.nama)} className={btnEdit}>Edit</button>
                          <button onClick={() => deleteData(f.id, "fakultas")} className={btnDelete}>Hapus</button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* PRODI List */}
                  <ul className="ml-5 space-y-1.5">
                    {f.prodis?.map((p) => (
                      <li key={p.id} className="flex justify-between items-center bg-blue-50/60 rounded-lg px-3 py-2">
                        {editId === p.id && editType === "prodi" ? (
                          <div className="flex items-center gap-3 w-full">
                            <input
                              value={editNama}
                              onChange={(e) => setEditNama(e.target.value)}
                              className={inputClass + " flex-1"}
                            />
                            <button onClick={saveEdit} className={btnSave}>Simpan</button>
                            <button onClick={cancelEdit} className={btnCancel}>Batal</button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                              <span className="text-blue-700 text-sm">{p.nama}</span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => startEdit(p.id, "prodi", p.nama)} className={btnEdit}>Edit</button>
                              <button onClick={() => deleteData(p.id, "prodi")} className={btnDelete}>Hapus</button>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}