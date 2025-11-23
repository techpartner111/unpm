// src/pages/DetailFasilitas.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import asrama1 from "../assets/fasilitas/asrama/p1.jpg";
import asrama2 from "../assets/fasilitas/asrama/1p.jpg";
import asrama3 from "../assets/fasilitas/asrama/2p.jpg";
import asrama4 from "../assets/fasilitas/asrama/3p.jpg";
import asrama5 from "../assets/fasilitas/asrama/4.jpg";

import lab1 from "../assets/fasilitas/lab/1.jpg";
import lab2 from "../assets/fasilitas/lab/2.jpg";
import lab3 from "../assets/fasilitas/lab/3.jpg";
import lab4 from "../assets/fasilitas/lab/4.jpg";
import lab5 from "../assets/fasilitas/lab/5.jpg";
import lab6 from "../assets/fasilitas/lab/6.jpg";
import lab7 from "../assets/fasilitas/lab/7.jpg";
import lab8 from "../assets/fasilitas/lab/8.jpg";
import lab9 from "../assets/fasilitas/lab/9.jpg";
import lab10 from "../assets/fasilitas/lab/10.jpg";
import lab11 from "../assets/fasilitas/lab/11.jpg";
import lab12 from "../assets/fasilitas/lab/12.jpg";

import perpustakaan1 from "../assets/fasilitas/perpustakaan/1.jpg";
import perpustakaan2 from "../assets/fasilitas/perpustakaan/2.jpg";
import perpustakaan3 from "../assets/fasilitas/perpustakaan/3.jpg";
import perpustakaan4 from "../assets/fasilitas/perpustakaan/4.jpg";
import perpustakaan5 from "../assets/fasilitas/perpustakaan/5.jpg";
import perpustakaan6 from "../assets/fasilitas/perpustakaan/6.jpg";
import perpustakaan7 from "../assets/fasilitas/perpustakaan/7.jpg";
import perpustakaan8 from "../assets/fasilitas/perpustakaan/8.jpg";
import perpustakaan9 from "../assets/fasilitas/perpustakaan/9.jpg";
import perpustakaan10 from "../assets/fasilitas/perpustakaan/10.jpg";

import gor1 from "../assets/fasilitas/gor/1.jpg";
import gor2 from "../assets/fasilitas/gor/2.jpg";
import gor3 from "../assets/fasilitas/gor/3.jpg";
import gor4 from "../assets/fasilitas/gor/4.jpg";
import gor5 from "../assets/fasilitas/gor/5.jpg";
import gor6 from "../assets/fasilitas/gor/6.jpg";
import gor7 from "../assets/fasilitas/gor/7.jpg";
import gor8 from "../assets/fasilitas/gor/8.jpg";
import gor9 from "../assets/fasilitas/gor/9.jpg";
import gor10 from "../assets/fasilitas/gor/10.jpg";

import graha1 from "../assets/fasilitas/graha/1.jpg";
import graha2 from "../assets/fasilitas/graha/2.jpg";
import graha3 from "../assets/fasilitas/graha/4.jpg";
import graha4 from "../assets/fasilitas/graha/5.jpg";
import graha5 from "../assets/fasilitas/graha/6.jpg";
import graha6 from "../assets/fasilitas/graha/7.jpg";
import graha7 from "../assets/fasilitas/graha/8.jpg";
import graha8 from "../assets/fasilitas/graha/9.jpg";
import graha9 from "../assets/fasilitas/graha/10.jpg";
import graha10 from "../assets/fasilitas/graha/11.jpg";
import graha11 from "../assets/fasilitas/graha/12.jpg";
import graha12 from "../assets/fasilitas/graha/3.jpg";

import lt1 from "../assets/fasilitas/lt/1.jpg";
import lt2 from "../assets/fasilitas/lt/2.jpg";
import lt3 from "../assets/fasilitas/lt/3.jpg";
import lt4 from "../assets/fasilitas/lt/4.jpg";
import lt5 from "../assets/fasilitas/lt/5.jpg";

export default function DetailFasilitas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const dataFasilitas = {
    asrama: {
      nama: "Asrama Mahasiswa",
      deskripsi:
        "Asrama UNIPMA menyediakan tempat tinggal nyaman dengan fasilitas lengkap untuk mendukung kehidupan mahasiswa selama studi.",
      galeri: [asrama1, asrama2, asrama3, asrama4,  asrama5],
    },
    lab: {
      nama: "Laboratorium",
      deskripsi:
        "Laboratorium UNIPMA dilengkapi dengan peralatan modern untuk mendukung kegiatan praktikum dan riset mahasiswa.",
      galeri: [lab1, lab2, lab3, lab4, lab5, lab6, lab7, lab8, lab9, lab10, lab11, lab12],
    },
    perpustakaan: {
      nama: "Perpustakaan",
      deskripsi:
        "Perpustakaan digital dan fisik UNIPMA menyediakan berbagai koleksi buku, jurnal, dan literatur akademik.",
      galeri: [perpustakaan1, perpustakaan2, perpustakaan3,perpustakaan4,perpustakaan5,perpustakaan6,perpustakaan7,perpustakaan8,perpustakaan9,perpustakaan10],
    },
    gor: {
      nama: "GOR Cendekia",
      deskripsi:
        "Gedung Olahraga Cendekia menjadi tempat utama kegiatan olahraga dan event kampus.",
      galeri: [gor1, gor2, gor3,gor4,gor5,gor6,gor7,gor8,gor9,gor10],
    },
    graha: {
      nama: "Graha Cendekia",
      deskripsi:
        "Graha Cendekia digunakan sebagai aula serbaguna untuk seminar, wisuda, dan kegiatan besar kampus.",
      galeri: [graha1, graha2, graha3, graha4, graha5, graha6, graha7, graha8, graha9, graha10, graha11, graha12],
    },
    lt: {
      nama: "Lab Teknik",
      deskripsi:
        "Laboratorium UNIPMA dilengkapi dengan peralatan modern untuk mendukung kegiatan praktikum dan riset mahasiswa.",
      galeri: [lt1,lt2,,lt3,lt4,lt5],
    },
  };

  const data = dataFasilitas[id];
  if (!data) return <p className="p-10 text-center">Data fasilitas tidak ditemukan.</p>;

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % data.galeri.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === 0 ? data.galeri.length - 1 : prev - 1
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

      {/* Judul dan Deskripsi */}
      <h1 className="text-3xl font-bold text-cyan-700 mb-4">{data.nama}</h1>
      <p className="text-gray-700 leading-relaxed mb-8">{data.deskripsi}</p>

      {/* Galeri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.galeri.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${data.nama} - ${i + 1}`}
            onClick={() => setSelectedIndex(i)}
            className="rounded-xl shadow-md object-cover w-full h-64 cursor-pointer hover:scale-105 transition-transform duration-500"
          />
        ))}
      </div>

      {/* Modal Fullscreen */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={handlePrev}
            className="absolute left-6 text-white text-5xl font-bold hover:text-cyan-400 select-none"
          >
            ‹
          </button>

          <img
            src={data.galeri[selectedIndex]}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg object-contain"
          />

          <button
            onClick={handleNext}
            className="absolute right-6 text-white text-5xl font-bold hover:text-cyan-400 select-none"
          >
            ›
          </button>

          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
