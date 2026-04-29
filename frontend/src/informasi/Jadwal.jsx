import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileCheck, Sparkles } from "lucide-react";
import api from "../api/axios";

export default function Jadwal() {
  const [gelombangs, setGelombangs] = useState([]);
  const [jadwalImg, setJadwalImg] = useState(null);
  useEffect(() => {
    fetchSchedules();
    fetchImage();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedules");

      // mapping data backend -> frontend
      const mapped = res.data.map((item) => ({
        title: item.gelombang,
        data: (item.jalur || []).map((j) => ({
          jalur: j,
          pendaftaran: item.pendaftaran,
          daftarUlang: item.daftar,
        })),
      }));

      setGelombangs(mapped);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchImage = async () => {
    try {
      const res = await api.get("/schedule-image");
      setJadwalImg(res.data.image);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-blue-50/20 to-white min-h-screen py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Page Header */}
      <div className="relative max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium border border-cyan-200/50 shadow-sm">
          <Calendar className="w-4 h-4" />
          Timeline Lengkap
        </div>

        <h1 className="text-3xl md:text-5xl font-light text-gray-900">
          Jadwal <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">PMB UNIPMA</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto font-light">Pantau jadwal pendaftaran setiap gelombang dan jangan lewatkan kesempatan untuk bergabung bersama UNIPMA</p>

        <div className="flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
        </div>
      </div>

      {/* Hero Image - Full Responsive Width */}
      <div className="relative w-full mb-16 overflow-hidden">
        {/* Gambar Utama Full Width & Responsive */}
        <img src={jadwalImg || "/fallback.png"} alt="Jadwal PMB UNIPMA" className="w-full h-auto max-w-full object-contain md:object-cover rounded-none shadow-lg" />
        <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-orange-400 text-blue-900 px-5 py-2 rounded-lg shadow-lg font-semibold text-sm md:text-base hover:scale-105 transition-transform flex items-center gap-2">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
          Tahun {new Date().getFullYear()}
        </div>
      </div>

      {/* Tables */}
      <div className="relative max-w-7xl mx-auto px-6 space-y-8">
        {gelombangs.map((gel, idx) => (
          <div key={idx} className="group backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-cyan-200 transition-all duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">{gel.title}</h3>
              </div>
              <div className="hidden md:block text-cyan-100 text-sm font-medium">Jalur Tanpa Tes</div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-cyan-600" />
                        Jalur Tanpa Tes
                      </div>
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        Pendaftaran
                      </div>
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        Daftar Ulang
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gel.data.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-6 py-4 font-medium text-gray-800">{row.jalur}</td>
                      <td className="px-6 py-4 text-gray-700">{row.pendaftaran}</td>
                      <td className="px-6 py-4 text-gray-700">{row.daftarUlang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 mt-16">
        <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-900">Siap mendaftar?</p>
              <p className="text-gray-600 font-light">Pilih gelombang yang sesuai dan segera daftarkan diri Anda</p>
            </div>
          </div>
          <a
            href="/register"
            className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Daftar Sekarang
            <FileCheck className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div className="relative max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">{gelombangs.length} Gelombang</h4>
          </div>
          <p className="text-sm text-gray-600 font-light">Pilih gelombang sesuai kesiapan Anda</p>
        </div>

        <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">Jalur Tanpa Tes</h4>
          </div>
          <p className="text-sm text-gray-600 font-light">Zonasi dan Prestasi Akademik tersedia</p>
        </div>

        <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">Proses Cepat</h4>
          </div>
          <p className="text-sm text-gray-600 font-light">Pendaftaran hingga daftar ulang efisien</p>
        </div>
      </div>
    </div>
  );
}
