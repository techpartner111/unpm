import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function FasilitasAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: "", deskripsi: "", thumbnail: null });
  const [editId, setEditId] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await api.get("/fasilitas-admin");
    setData(res.data);
  };

  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      setForm({ ...form, thumbnail: file });
      if (file) setFilePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("deskripsi", form.deskripsi);
    if (form.thumbnail) formData.append("thumbnail", form.thumbnail);
    try {
      if (editId) {
        await api.post(`/fasilitas-admin/${editId}?_method=PUT`, formData);
      } else {
        await api.post("/fasilitas-admin", formData);
      }
      resetForm();
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setForm({ nama: item.nama, deskripsi: item.deskripsi, thumbnail: null });
    setFilePreview(item.thumbnail ? `http://127.0.0.1:8000/storage/${item.thumbnail}` : null);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus?")) {
      await api.delete(`/fasilitas-admin/${id}`);
      getData();
    }
  };

  const resetForm = () => {
    setForm({ nama: "", deskripsi: "", thumbnail: null });
    setFilePreview(null);
    setEditId(null);
  };

  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300 w-full";

  const labelClass =
    "block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Konten</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Admin Fasilitas</h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">
            {editId ? "Edit Fasilitas" : "Tambah Fasilitas"}
          </h2>
          {editId && (
            <span className="ml-auto bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Mode Edit
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Nama Fasilitas</label>
            <input
              type="text"
              name="nama"
              placeholder="contoh: Laboratorium Komputer"
              value={form.nama}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea
              name="deskripsi"
              placeholder="Tulis deskripsi fasilitas..."
              value={form.deskripsi}
              onChange={handleChange}
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className={labelClass}>Thumbnail</label>
            <div className="flex items-start gap-4">
              <label className="relative flex-1 flex items-center gap-4 border-2 border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 rounded-xl px-5 py-4 cursor-pointer group">
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    {form.thumbnail
                      ? form.thumbnail.name
                      : <><span className="text-blue-500 font-semibold">Pilih file</span> atau drag &amp; drop</>}
                  </p>
                  <p className="text-xs text-blue-400 mt-0.5">JPG, PNG, WEBP didukung</p>
                </div>
              </label>

              {filePreview && (
                <div className="flex-shrink-0">
                  <img
                    src={filePreview}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-xl border-2 border-blue-100 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-blue-50">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150"
            >
              {editId ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Update Fasilitas
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Tambah Fasilitas
                </>
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-blue-50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Daftar Fasilitas</h2>
          <span className="ml-auto bg-blue-50 text-blue-500 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {data.length} fasilitas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900 to-blue-700">
                <th className="px-5 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70">Gambar</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70">Nama</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70 whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-12 text-center text-blue-300 text-sm font-medium">
                    Belum ada data fasilitas
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-100">
                    <td className="px-5 py-3.5">
                      {item.thumbnail ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${item.thumbnail}`}
                          alt={item.nama}
                          className="w-16 h-16 object-cover rounded-xl border-2 border-blue-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl border-2 border-dashed border-blue-100 bg-blue-50 flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-blue-900">{item.nama}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-1 border border-blue-300 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-1 border border-red-200 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}