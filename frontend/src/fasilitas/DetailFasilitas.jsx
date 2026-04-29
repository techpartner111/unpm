import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DetailFasilitas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    try {
      const res = await api.get(`/fasilitas/${id}`);
      console.log("DATA:", res.data); // 🔍 debug
      setData(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // 🔥 helper untuk path gambar (anti error)
  const getImageUrl = (gambar) => {
    if (!gambar) return "";

    // kalau sudah full url
    if (gambar.startsWith("http")) return gambar;

    // kalau sudah ada folder
    if (gambar.includes("galeri-fasilitas")) {
      return `http://127.0.0.1:8000/storage/${gambar}`;
    }

    // default
    return `http://127.0.0.1:8000/storage/galeri-fasilitas/${gambar}`;
  };

  if (!data) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const galeri = data.galeri || [];

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === galeri.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === 0 ? galeri.length - 1 : prev - 1
    );
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">

      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
      >
        ← Kembali
      </button>

      {/* Judul */}
      <h1 className="text-3xl font-bold text-cyan-700 mb-4">
        {data.nama}
      </h1>

      {/* Deskripsi */}
      <p className="text-gray-700 mb-8">{data.deskripsi}</p>

      {/* Galeri */}
      {galeri.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galeri.map((g, i) => (
            <img
              key={i}
              src={getImageUrl(g.gambar)}
              alt={`galeri-${i}`}
              onClick={() => setSelectedIndex(i)}
              className="rounded-xl shadow-md object-cover w-full h-64 cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Tidak ada gambar</p>
      )}

      {/* Modal */}
      {selectedIndex !== null && galeri.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Tombol Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-6 text-white text-5xl"
          >
            ‹
          </button>

          {/* Gambar */}
          <img
            src={getImageUrl(galeri[selectedIndex].gambar)}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />

          {/* Tombol Next */}
          <button
            onClick={handleNext}
            className="absolute right-6 text-white text-5xl"
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}