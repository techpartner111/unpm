import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import api from "../api/axios";

export default function ScheduleTable() {
  const [schedules, setSchedules] = useState([]);

  // 🔥 FETCH API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/schedules");
        setSchedules(res.data);
      } catch (err) {
        console.error("Error fetch jadwal:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative py-20 bg-gradient-to-b from-gray-50 via-blue-50/30 to-white overflow-hidden" id="jadwal">

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Jadwal{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              PMB UNIPMA
            </span>
          </h2>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:block">
          <div className="bg-white/80 rounded-2xl shadow-2xl border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  <th className="py-4 px-6 text-left">Gelombang</th>
                  <th className="py-4 px-6 text-left">Pendaftaran</th>
                  <th className="py-4 px-6 text-left">Jalur</th>
                  <th className="py-4 px-6 text-left">Daftar Ulang</th>
                </tr>
              </thead>

              <tbody>
                {schedules.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-semibold">{item.gelombang}</td>
                    <td className="py-4 px-6">{item.pendaftaran}</td>

                    {/* ✅ JALUR ARRAY */}
                    <td className="py-4 px-6">
                      {item.jalur?.map((j, i) => (
                        <div key={i}>{j}</div>
                      ))}
                    </td>

                    <td className="py-4 px-6">{item.daftar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden space-y-4">
          {schedules.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 shadow">
              
              <h3 className="font-semibold text-blue-600 mb-3">
                {item.gelombang}
              </h3>

              <p className="text-sm">
                <b>Pendaftaran:</b> {item.pendaftaran}
              </p>

              <p className="text-sm mt-2">
                <b>Jalur:</b>
                {item.jalur?.map((j, i) => (
                  <div key={i}>{j}</div>
                ))}
              </p>

              <p className="text-sm mt-2">
                <b>Daftar Ulang:</b> {item.daftar || "-"}
              </p>
            </div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-12 text-center">
          <a
            href="https://pmb.unipma.ac.id/portal/daftar"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
          >
            Daftar Sekarang
          </a>
        </div>

      </div>
    </div>
  );
}