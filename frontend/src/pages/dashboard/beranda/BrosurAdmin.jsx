import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function BrosurAdmin() {
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/brosur");
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("File belum dipilih!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log("FILE:", file);
    console.log([...formData.entries()]);

    try {
      await api.post("/brosur", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Upload berhasil");
      setFile(null);
      fetchData();
    } catch (err) {
      console.log("ERROR BACKEND:", err.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/brosur/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Konten</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Kelola Brosur</h1>
        </div>
      </div>

      {/* ── Upload Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8 max-w-xl">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Upload Brosur</h2>
        </div>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          {/* File Input Area */}
          <label className="relative flex items-center gap-4 border-2 border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 rounded-xl px-5 py-4 cursor-pointer group">
            <input
              type="file"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                console.log("Dipilih:", selectedFile);
                setFile(selectedFile);
              }}
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
              <p className="text-sm font-medium text-blue-700 group-hover:text-blue-800">
                {file ? file.name : <><span className="text-blue-500 font-semibold">Pilih file</span> atau drag &amp; drop</>}
              </p>
              <p className="text-xs text-blue-400 mt-0.5">PDF, JPG, PNG didukung</p>
            </div>
            {file && (
              <span className="ml-auto bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Siap
              </span>
            )}
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150 self-start"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Brosur
          </button>
        </form>
      </div>

      {/* ── Grid List ── */}
      {list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <p className="text-blue-300 text-sm font-medium">Belum ada brosur</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
            >
              {/* Thumbnail */}
              {item.file.endsWith(".pdf") ? (
                <div className="h-40 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </div>
                  <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">PDF</span>
                </div>
              ) : (
                <div className="h-40 overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.image}`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="brosur"
                  />
                </div>
              )}

              {/* Footer */}
              <div className="p-4 flex items-center justify-between gap-3">
                <a
                  href={`http://127.0.0.1:8000/storage/${item.file}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-semibold hover:text-blue-800 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Lihat File
                </a>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex items-center gap-1.5 border border-red-200 text-red-500 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  </svg>
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}