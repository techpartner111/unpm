import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function GaleriFasilitasAdmin() {
  const [galeri, setGaleri] = useState([]);
  const [fasilitasList, setFasilitasList] = useState([]);
  const [form, setForm] = useState({ fasilitas_id: "" });
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // ================= GET FASILITAS =================
  const getFasilitas = async () => {
    try {
      const res = await api.get("/fasilitas");
      setFasilitasList(res.data);
    } catch (err) {
      console.error("Error get fasilitas:", err);
    }
  };

  // ================= GET GALERI =================
  const getData = async () => {
    if (!form.fasilitas_id) return;
    try {
      setLoadingData(true);
      const res = await api.get(`/galeri-fasilitas/${form.fasilitas_id}`);
      setGaleri(res.data);
    } catch (err) {
      console.error("Error get galeri:", err.response?.data);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { getFasilitas(); }, []);

  useEffect(() => {
    if (form.fasilitas_id) getData();
  }, [form.fasilitas_id]);

  // ================= HANDLE SELECT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= HANDLE FILE =================
  const handleFile = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.fasilitas_id) { alert("Pilih fasilitas dulu!"); return; }
    if (!gambar) { alert("Pilih gambar dulu!"); return; }

    const formData = new FormData();
    formData.append("fasilitas_id", form.fasilitas_id);
    formData.append("gambar", gambar);

    try {
      setLoadingUpload(true);
      await api.post("/galeri-fasilitas", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setGambar(null);
      setPreview(null);
      await getData();
      alert("Upload berhasil!");
    } catch (err) {
      console.error("Upload error:", err.response?.data);
      if (err.response?.data?.errors) {
        alert(Object.values(err.response.data.errors).join("\n"));
      } else {
        alert("Upload gagal!");
      }
    } finally {
      setLoadingUpload(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Hapus gambar?")) return;
    try {
      await api.delete(`/galeri-fasilitas/${id}`);
      getData();
    } catch (err) {
      console.error("Delete error:", err.response?.data);
    }
  };

  const labelClass = "block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5";
  const selectClass = "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition w-full disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Konten</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Galeri Fasilitas</h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8 max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Upload Gambar</h2>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Select Fasilitas */}
          <div>
            <label className={labelClass}>Pilih Fasilitas</label>
            <select
              name="fasilitas_id"
              value={form.fasilitas_id}
              onChange={handleChange}
              disabled={loadingData}
              required
              className={selectClass}
            >
              <option value="">-- Pilih Fasilitas --</option>
              {fasilitasList.map((f) => (
                <option key={f.id} value={f.id}>{f.nama}</option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className={labelClass}>Gambar</label>
            <div className="flex items-start gap-4">
              <label className="relative flex-1 flex items-center gap-4 border-2 border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 rounded-xl px-5 py-4 cursor-pointer group">
                <input
                  type="file"
                  onChange={handleFile}
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
                    {gambar
                      ? gambar.name
                      : <><span className="text-blue-500 font-semibold">Pilih file</span> atau drag &amp; drop</>}
                  </p>
                  <p className="text-xs text-blue-400 mt-0.5">JPG, PNG, WEBP didukung</p>
                </div>
              </label>

              {/* Preview */}
              {preview && (
                <div className="flex-shrink-0 relative">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-xl border-2 border-blue-100 shadow-sm"
                  />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                    ✓
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-blue-50">
            <button
              type="submit"
              disabled={loadingUpload}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
            >
              {loadingUpload ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Gambar
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Gallery Section ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-blue-50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Galeri Gambar</h2>
          {!loadingData && (
            <span className="ml-auto bg-blue-50 text-blue-500 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {galeri.length} gambar
            </span>
          )}
        </div>

        <div className="p-6">
          {/* Loading State */}
          {loadingData && (
            <div className="flex items-center justify-center gap-3 py-12">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              <span className="text-blue-300 text-sm font-medium">Memuat gambar...</span>
            </div>
          )}

          {/* Empty State */}
          {!loadingData && galeri.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p className="text-blue-300 text-sm font-medium">
                {form.fasilitas_id ? "Belum ada gambar untuk fasilitas ini" : "Pilih fasilitas untuk melihat galeri"}
              </p>
            </div>
          )}

          {/* Grid */}
          {!loadingData && galeri.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galeri.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden border-2 border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
                  <img
                    src={item.gambar}
                    alt="galeri"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-all duration-200" />
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-150 shadow-md"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    </svg>
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}