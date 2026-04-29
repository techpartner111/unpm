import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Download, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [pita, setPita] = useState(null);
  const [video, setVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [brosurList, setBrosurList] = useState([]);
  const [statistik, setStatistik] = useState([]);

  // ✅ ambil data dari API
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await api.get("/sliders");

        const imageUrls = res.data.map((item) => `http://127.0.0.1:8000/storage/${item.image}`);

        setImages(imageUrls);
      } catch (err) {
        console.error("Gagal ambil slider:", err);
      }
    };

    fetchSliders();
  }, []);

  // ✅ slideshow jalan setelah data ada
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const fetchPita = async () => {
      try {
        const res = await api.get("/pita");
        setPita(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPita();
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get("/video");
        setVideo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
  }, []);

  useEffect(() => {
    const fetchBrosur = async () => {
      try {
        const res = await api.get("/brosur");
        setBrosurList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrosur();
  }, []);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const res = await api.get("/statistik1");
        setStatistik(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatistik();
  }, []);

  return (
    <div style={{ marginTop: "-80.1px" }}>
      <div className="relative w-full overflow-hidden bg-white">
        {/* Gambar hero slideshow */}
        <div className="relative w-full flex justify-center items-center bg-black overflow-hidden">
          {/* Slideshow */}
          <div className="relative w-full flex justify-center items-center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className={`w-full h-auto transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0 absolute inset-0"}`}
                style={{
                  objectFit: "contain",
                  display: index === currentImage ? "block" : "none",
                }}
              />
            ))}
          </div>

          {/* === Pita Akreditasi === */}
          {pita && (
            <a href="https://akreditasi.unipma.ac.id/" target="_blank" rel="noopener noreferrer" className="absolute top-0 right-4 sm:right-8 flex flex-col items-center cursor-pointer group">
              <img
                src={`http://127.0.0.1:8000/storage/${pita.image}`}
                alt="Pita Akreditasi"
                className="
        w-[30px]
        sm:w-[90px]
        md:w-[110px]
        lg:w-[130px]
        h-auto
        drop-shadow-xl
        transition-transform
        duration-300
        group-hover:scale-105
      "
              />
            </a>
          )}

          {/* Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button key={index} onClick={() => setCurrentImage(index)} className={`h-2 rounded-full transition-all duration-300 ${currentImage === index ? "w-8 bg-white shadow-lg" : "w-2 bg-white/50 hover:bg-white/75"}`} />
            ))}
          </div>
        </div>

        {/* 🎥 Video Profil UNIPMA */}
        <div className="w-full flex justify-center bg-gray-100 py-8">
          <div className="relative w-full max-w-5xl flex flex-col items-center px-4">
            {video && <video src={`http://127.0.0.1:8000/storage/${video.file}`} controls className="w-full h-auto rounded-xl shadow-lg" />}
            <p className="mt-4 text-gray-600 text-center text-sm sm:text-base">Video Profil Universitas PGRI Madiun</p>
          </div>
        </div>

        {/* Konten bawah hero */}
        <div className="max-w-6xl mx-auto px-6 py-12 text-center space-y-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href="https://pmb.unipma.ac.id/portal/daftar"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 border-2 border-cyan-200 bg-white/50 text-cyan-700 px-8 py-3.5 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold"
            >
              <Download className="w-5 h-5" />
              Download Brosur
            </button>
          </div>

          {/* informasi */}
          <div className="flex justify-center gap-12 pt-8 border-t border-gray-200/50">
            <div className="flex justify-center gap-12 pt-8 border-t border-gray-200/50">
              {statistik.map((item, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">{item.value}</p>
                  <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pilih Brosur</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            {/* List Brosur */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {brosurList.map((item, index) => (
                <div key={index} className="cursor-pointer group">
                  <img src={`http://127.0.0.1:8000/storage/${item.image}`} className="w-full h-40 object-cover rounded-lg shadow group-hover:scale-105 transition" />

                  <a href={`http://127.0.0.1:8000/storage/${item.file}`} download className="block text-center mt-2 text-sm text-blue-600 hover:underline">
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
