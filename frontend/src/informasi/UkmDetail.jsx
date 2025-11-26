import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  MapPin,
  ChevronLeft,
} from "lucide-react";

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


export default function UkmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ukmData = {
    // ===== SENI =====
    "seni-musik": {
      nama: "UKM Seni Musik",
      gambar: seniMusikImg,
      deskripsi:
        "UKM Seni Musik adalah wadah bagi mahasiswa yang berbakat di bidang musik, baik vokal maupun instrumen.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Selasa, 16.00 - 18.00",
      lokasi: "Ruang Seni Musik UNIPMA",
      galeri: [seniMusikImg, seniMusikImg],
    },

    "seni-karawitan": {
      nama: "UKM Seni Karawitan",
      gambar: karawitanImg,
      deskripsi:
        "UKM Seni Karawitan berfokus pada pelestarian musik tradisional Jawa melalui gamelan dan seni suara.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Rabu, 15.00 - 17.00",
      lokasi: "Ruang Karawitan UNIPMA",
      galeri: [karawitanImg, karawitanImg],
    },

    "seni-dongkrek": {
      nama: "UKM Seni Dongkrek",
      gambar: dongkrekImg,
      deskripsi:
        "UKM Dongkrek melestarikan kesenian tradisional khas Madiun melalui tarian, musik, dan budaya.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Jumat, 16.00 - 18.00",
      lokasi: "Ruang Seni Tradisi UNIPMA",
      galeri: [dongkrekImg, dongkrekImg],
    },

    "seni-reog": {
      nama: "UKM Seni Reog",
      gambar: reogImg,
      deskripsi:
        "UKM Reog aktif dalam pertunjukan khas Ponorogo, meliputi tarian, musik, dan budaya tradisional.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Minggu, 08.00",
      lokasi: "Lapangan Budaya UNIPMA",
      galeri: [reogImg, reogImg],
    },

    "seni-tari-tjandra-kirana": {
      nama: "UKM Seni Tari Tjandra Kirana",
      gambar: tariImg,
      deskripsi:
        "UKM Tari Tjandra Kirana mengembangkan kreativitas mahasiswa melalui tari tradisional dan modern.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Senin, 15.00",
      lokasi: "Studio Tari UNIPMA",
      galeri: [tariImg, tariImg],
    },

    "seni-shoutul-muroby": {
      nama: "UKM Seni Shoutul Muroby",
      gambar: shoutulImg,
      deskripsi: "UKM ini fokus pada nasyid, shalawat, dan seni islami.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Kamis, 16.00",
      lokasi: "Ruang UKM Seni Islami",
      galeri: [shoutulImg, shoutulImg],
    },

    "psm-sadhuta-madusuara": {
      nama: "UKM Paduan Suara Sadhuta Madusuara",
      gambar: psmSadhutaImg,
      deskripsi:
        "UKM PSM Sadhuta Madusuara adalah wadah paduan suara resmi UNIPMA.",
      ketua: "Nama Ketua",
      jadwal: "Selasa & Kamis, 16.00",
      lokasi: "Graha Seni UNIPMA",
      galeri: [psmSadhutaImg, psmSadhutaImg],
    },

    "teater-bissik": {
      nama: "UKM Teater Bissik",
      gambar: teaterImg,
      deskripsi:
        "UKM Teater Bissik aktif dalam seni peran, drama panggung, dan pertunjukan teater modern.",
      ketua: "Nama Ketua",
      jadwal: "Jumat, 18.00",
      lokasi: "Teater Mini UNIPMA",
      galeri: [teaterImg, teaterImg],
    },

    // ===== OLAHRAGA =====
    inkai: {
      nama: "UKM Olahraga INKAI",
      gambar: inkaiImg,
      deskripsi:
        "UKM INKAI adalah wadah pembinaan karate untuk mahasiswa UNIPMA.",
      ketua: "Nama Ketua",
      jadwal: "Senin & Kamis, 18.00",
      lokasi: "GOR Cendekia",
      galeri: [inkaiImg, inkaiImg],
    },

    "wall-climbing": {
      nama: "UKM Wall Climbing",
      gambar: climbingImg,
      deskripsi:
        "UKM Wall Climbing berfokus pada olahraga panjat tebing dan pelatihan teknik survival.",
      ketua: "Nama Ketua",
      jadwal: "Sabtu, 08.00",
      lokasi: "Wall Climbing Area UNIPMA",
      galeri: [climbingImg, climbingImg],
    },

    futsal: {
      nama: "UKM Futsal",
      gambar: futsalImg,
      deskripsi:
        "UKM Futsal aktif mengikuti kompetisi internal maupun eksternal kampus.",
      ketua: "Nama Ketua",
      jadwal: "Rabu, 16.00",
      lokasi: "Lapangan Futsal UNIPMA",
      galeri: [futsalImg, futsalImg],
    },

    "bola-voli": {
      nama: "UKM Bola Voli",
      gambar: voliImg,
      deskripsi:
        "UKM Bola Voli menaungi mahasiswa berbakat di bidang voli indoor maupun voli pasir.",
      ketua: "Nama Ketua",
      jadwal: "Selasa & Jumat, 16.00",
      lokasi: "Lapangan Voli UNIPMA",
      galeri: [voliImg, voliImg],
    },

    badminton: {
      nama: "UKM Badminton",
      gambar: badmintonImg,
      deskripsi:
        "UKM Badminton aktif dalam latihan rutin serta mengikuti event kejuaraan.",
      ketua: "Nama Ketua",
      jadwal: "Senin & Rabu, 17.00",
      lokasi: "GOR Badminton UNIPMA",
      galeri: [badmintonImg, badmintonImg],
    },

    basket: {
      nama: "UKM Basket",
      gambar: basketImg,
      deskripsi:
        "UKM Basket adalah wadah pengembangan minat dan bakat mahasiswa di bidang bola basket.",
      ketua: "Nama Ketua",
      jadwal: "Selasa, 17.00",
      lokasi: "Lapangan Basket UNIPMA",
      galeri: [basketImg, basketImg],
    },

    "pencak-silat": {
      nama: "UKM Pencak Silat",
      gambar: silatImg,
      deskripsi:
        "UKM Pencak Silat membina mahasiswa dalam seni bela diri tradisional Indonesia.",
      ketua: "Nama Ketua",
      jadwal: "Kamis, 19.00",
      lokasi: "Ruang Silat UNIPMA",
      galeri: [silatImg, silatImg],
    },

    // ===== AKADEMIK / ORGANISASI =====
    "kim-cendekia": {
      nama: "Kelompok Ilmiah Mahasiswa Cendekia",
      gambar: kimImg,
      deskripsi:
        "KIM Cendekia adalah UKM berbasis riset, penalaran, dan karya ilmiah.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Sabtu, 09.00",
      lokasi: "Ruang KIM UNIPMA",
      galeri: [kimImg, kimImg],
    },

    menwa: {
      nama: "Resimen Mahasiswa",
      gambar: menwaImg,
      deskripsi:
        "Menwa UNIPMA adalah organisasi semi-militer yang membina kedisiplinan dan bela negara.",
      ketua: "Nama Ketua",
      jadwal: "Jumat, 14.00",
      lokasi: "Markas Menwa UNIPMA",
      galeri: [menwaImg, menwaImg],
    },

    pramuka: {
      nama: "Pramuka Pangeran Timur Retno Djumilah",
      gambar: pramukaImg,
      deskripsi:
        "Unit Pramuka resmi UNIPMA yang aktif dalam kegiatan sosial, pelatihan, dan event nasional.",
      ketua: "Nama Ketua",
      jadwal: "Sabtu, 15.00",
      lokasi: "Lapangan Upacara",
      galeri: [pramukaImg, pramukaImg],
    },

    ukki: {
      nama: "UKKI At-Tarbiyah",
      gambar: ukkiImg,
      deskripsi:
        "Unit kegiatan mahasiswa Islam yang fokus pada pembinaan akhlak, kajian, dan dakwah.",
      ketua: "Nama Ketua",
      jadwal: "Minggu, 09.00",
      lokasi: "Ruang UKKI",
      galeri: [ukkiImg, ukkiImg],
    },

    "kopma-nirwasita": {
      nama: "Kopma Nirwasita",
      gambar: kopmaImg,
      deskripsi:
        "Koperasi Mahasiswa UNIPMA yang bergerak dalam bidang kewirausahaan dan bisnis.",
      ketua: "Nama Ketua",
      jadwal: "Setiap Hari",
      lokasi: "Gedung Kopma",
      galeri: [kopmaImg, kopmaImg],
    },

    "pers-edukasi": {
      nama: "Pers Edukasi",
      gambar: persEdukasiImg,
      deskripsi:
        "UKM yang bergerak di bidang jurnalistik, liputan, penulisan, dan dunia media kampus.",
      ketua: "Nama Ketua",
      jadwal: "Senin, 16.00",
      lokasi: "Ruang Pers Edukasi",
      galeri: [persEdukasiImg, persEdukasiImg],
    },

    "kependudukan-cendekia": {
      nama: "Kependudukan Cendekia",
      gambar: kependudukanImg,
      deskripsi:
        "UKM bidang riset dan kajian demografi, sosial, dan kependudukan.",
      ketua: "Nama Ketua",
      jadwal: "Sabtu, 10.00",
      lokasi: "Ruang Diskusi UNIPMA",
      galeri: [kependudukanImg, kependudukanImg],
    },

    kewirausahaan: {
      nama: "UKM Kewirausahaan",
      gambar: wirausahaImg,
      deskripsi:
        "UKM yang membina mahasiswa dalam bisnis, UMKM, dan pelatihan wirausaha.",
      ketua: "Nama Ketua",
      jadwal: "Jumat, 16.00",
      lokasi: "Ruang Kewirausahaan",
      galeri: [wirausahaImg, wirausahaImg],
    },

    immanuel: {
      nama: "UKM Immanuel",
      gambar: immanuelImg,
      deskripsi:
        "UKM kerohanian Kristen yang fokus pada ibadah, pelayanan, dan pengembangan spiritual.",
      ketua: "Nama Ketua",
      jadwal: "Minggu, 18.00",
      lokasi: "Ruang Ibadah UNIPMA",
      galeri: [immanuelImg, immanuelImg],
    },
  };

  const detail = ukmData[id];

  if (!detail) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">UKM tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pb-20">
      
      {/* Header Image */}
      <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
        
        <img
          src={detail.gambar}
          alt={detail.nama}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">{detail.nama}</h1>
        </div>
      </div>

      {/* Detail Card */}
      <div className="max-w-5xl mx-auto mt-12 px-6 md:px-0">
        <div className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-6">

          <p className="text-gray-700 leading-relaxed text-lg">
            {detail.deskripsi}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">



            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <Calendar className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Jadwal Latihan</h4>
                <p className="text-gray-600 text-sm">{detail.jadwal}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <MapPin className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Lokasi</h4>
                <p className="text-gray-600 text-sm">{detail.lokasi}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
