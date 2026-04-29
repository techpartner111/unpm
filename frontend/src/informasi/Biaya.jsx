import React, { useState, useEffect } from "react";
import api from "../api/axios";
import pmbImage from "../assets/images/pmb.jpeg";

export default function Biaya() {
  const [dataBiaya, setDataBiaya] = useState([]);

  useEffect(() => {
    getBiaya();
  }, []);

  const getBiaya = async () => {
    try {
      const res = await api.get("/biaya");
      setDataBiaya(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      
      {/* ================= SECTION ATAS ================= */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        {/* === KIRI: TABEL BIAYA === */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Rincian Biaya Kuliah
          </h1>

          <p className="text-gray-600 mb-6">
            Berikut rincian biaya kuliah, PKKMB, dan BPI tiap program studi.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm md:text-base">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2 text-left">Program Studi</th>
                  <th className="border px-3 py-2">Per Bulan</th>
                  <th className="border px-3 py-2">Per Semester</th>
                  <th className="border px-3 py-2">BPI</th>
                  <th className="border px-3 py-2">PKKMB</th>
                  <th className="border px-3 py-2">Tipe A</th>
                  <th className="border px-3 py-2">Tipe B</th>
                </tr>
              </thead>

              <tbody>
                {dataBiaya.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-400">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  dataBiaya.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border px-3 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border px-3 py-2">{item.prodi}</td>
                      <td className="border px-3 py-2 text-center">
                        {item.per_bulan}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.per_semester}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.bpi}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.pkkmb}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.daftar_ulang_a}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.daftar_ulang_b}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Keterangan */}
          <p className="mt-6 text-sm text-gray-700">
            <strong>Keterangan:</strong> Biaya semester termasuk (SKS, SPP, Hereg, PPL, KKN, Skripsi, dll).
            <br />
            <strong>Total Biaya =</strong> Semester + BPI + PKKMB
          </p>
        </div>

        {/* === KANAN: KONTAK KAMPUS === */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Informasi Kontak
          </h2>

          <p className="text-gray-700 mb-2">
            <strong>Kampus Universitas PGRI Madiun</strong>
          </p>

          <p className="text-gray-600 mb-4">
            Jl. Setia Budi No.85, Kanigoro, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63118
          </p>

          <p className="text-gray-700">
            <strong>Telepon:</strong> (0351) 462986
          </p>

          <p className="text-gray-700">
            <strong>WhatsApp:</strong> 0812-3456-7890
          </p>

          <p className="text-gray-700">
            <strong>Email:</strong> info@unipma.ac.id
          </p>

          <p className="text-gray-700 mb-6">
            <strong>Website:</strong> www.unipma.ac.id
          </p>

          <img
            src={pmbImage}
            alt="PMB UNIPMA"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* ================= SECTION BAWAH ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-white shadow-md rounded-xl p-8">

          {/* Persyaratan */}
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Persyaratan Pendaftaran
          </h2>

          <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
            <li>Fotokopi ijazah terakhir yang telah dilegalisir (2 lembar).</li>
            <li>Fotokopi nilai rapor semester I–V.</li>
            <li>Fotokopi KK dan KTP.</li>
            <li>Pas foto 3x4 (2 lembar).</li>
            <li>Bukti pembayaran pendaftaran.</li>
          </ul>

          {/* Prosedur */}
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Prosedur Pendaftaran
          </h2>

          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Mengisi formulir pendaftaran online.</li>
            <li>Upload dokumen persyaratan.</li>
            <li>Verifikasi & pembayaran.</li>
            <li>Konfirmasi via email / WhatsApp.</li>
            <li>Daftar ulang sesuai jadwal.</li>
          </ol>

        </div>
      </div>

    </div>
  );
}