import React from "react";
import { useNavigate } from "react-router-dom";

// Gambar UKM
// ===== SENI =====
import seniMusikImg from "../assets/ukm/seni-musik.jpeg";
import karawitanImg from "../assets/ukm/seni-karawitan.jpeg";
import dongkrekImg from "../assets/ukm/seni-dongkrek.jpeg";
import reogImg from "../assets/ukm/seni-reog.jpeg";
import tariImg from "../assets/ukm/seni-tari-tjandra-kirana.jpeg";
import shoutulImg from "../assets/ukm/seni-shoutul-muroby.jpeg";
import psmSadhutaImg from "../assets/ukm/psm-sadhuta-madusuara.jpeg";
import teaterImg from "../assets/ukm/teater-bissik.jpeg";

// ===== OLAHRAGA =====
import inkaiImg from "../assets/ukm/inkai.jpeg";
import climbingImg from "../assets/ukm/wall-climbing.jpeg";
import futsalImg from "../assets/ukm/futsal.jpeg";
import voliImg from "../assets/ukm/bola-voli.jpeg";
import badmintonImg from "../assets/ukm/badminton.jpeg";
import basketImg from "../assets/ukm/basket.jpeg";
import silatImg from "../assets/ukm/pencak-silat.jpeg";

// ===== AKADEMIK & ORGANISASI =====
import kimImg from "../assets/ukm/kim-cendekia.jpeg";
import menwaImg from "../assets/ukm/menwa.jpeg";
import pramukaImg from "../assets/ukm/pramuka.jpg";  
import ukkiImg from "../assets/ukm/ukki.jpeg";
import kopmaImg from "../assets/ukm/kopma-nirwasita.jpeg";
import persEdukasiImg from "../assets/ukm/pers-edukasi.jpeg";
import kependudukanImg from "../assets/ukm/kependudukan-cendekia.jpeg";
import wirausahaImg from "../assets/ukm/kewirausahaan.jpeg";
import immanuelImg from "../assets/ukm/immanuel.jpeg";

export default function Ukm() {
  const navigate = useNavigate();

  const ukmList = [
    { id: "seni-musik", nama: "UKM Seni Musik", gambar: seniMusikImg },
    { id: "seni-karawitan", nama: "UKM Seni Karawitan", gambar: karawitanImg },
    { id: "seni-dongkrek", nama: "UKM Seni Dongkrek", gambar: dongkrekImg },
    { id: "seni-reog", nama: "UKM Seni Reog", gambar: reogImg },
    { id: "seni-tari-tjandra-kirana", nama: "UKM Seni Tari Tjandra Kirana", gambar: tariImg },
    { id: "seni-shoutul-muroby", nama: "UKM Seni Shoutul Muroby", gambar: shoutulImg },
    { id: "psm-sadhuta-madusuara", nama: "UKM Paduan Suara Sadhuta Madusuara", gambar: psmSadhutaImg },
    { id: "teater-bissik", nama: "UKM Teater Bissik", gambar: teaterImg },

    // OLAHRAGA
    { id: "inkai", nama: "UKM Olahraga INKAI", gambar: inkaiImg },
    { id: "wall-climbing", nama: "UKM Wall Climbing", gambar: climbingImg },
    { id: "futsal", nama: "UKM Futsal", gambar: futsalImg },
    { id: "bola-voli", nama: "UKM Bola Voli", gambar: voliImg },
    { id: "badminton", nama: "UKM Badminton", gambar: badmintonImg },
    { id: "basket", nama: "UKM Basket", gambar: basketImg },
    { id: "pencak-silat", nama: "UKM Pencak Silat", gambar: silatImg },

    // AKADEMIK
    { id: "kim-cendekia", nama: "Kelompok Ilmiah Mahasiswa Cendekia", gambar: kimImg },
    { id: "menwa", nama: "Resimen Mahasiswa", gambar: menwaImg },
    { id: "pramuka", nama: "Pramuka Pangeran Timur Retno Djumilah", gambar: pramukaImg },
    { id: "ukki", nama: "UKKI At-Tarbiyah", gambar: ukkiImg },
    { id: "kopma-nirwasita", nama: "Kopma Nirwasita", gambar: kopmaImg },
    { id: "pers-edukasi", nama: "Pers Edukasi", gambar: persEdukasiImg },
    { id: "kependudukan-cendekia", nama: "Kependudukan Cendekia", gambar: kependudukanImg },
    { id: "kewirausahaan", nama: "UKM Kewirausahaan", gambar: wirausahaImg },
    { id: "immanuel", nama: "UKM Immanuel", gambar: immanuelImg },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/20 to-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">

      {/* Header */}
      <div className="relative text-center mb-16 space-y-4">
        <h1 className="text-3xl md:text-5xl font-light text-gray-900">
          Daftar <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">UKM UNIPMA</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto font-light">
          Tempat mahasiswa mengembangkan minat, bakat, dan potensi diri.
        </p>
      </div>

      {/* Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {ukmList.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/ukm/${item.id}`)}
            className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Gambar */}
            <div className="relative overflow-hidden h-64">
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Konten */}
            <div className="p-6 space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-all duration-300">
                {item.nama}
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <div className="text-sm text-gray-500">Organisasi aktif & kreatif</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
