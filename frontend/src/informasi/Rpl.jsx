import React, { useEffect, useState } from "react";
import { Award, CheckCircle, FileText, Download, DollarSign, Calendar, Sparkles } from "lucide-react";
import api from "../api/axios";

export default function RPLPage() {
  const [biayaData, setBiayaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rpl, setRpl] = useState([]);

  useEffect(() => {
    api
      .get("/rpl-section")
      .then((res) => setRpl(res.data))
      .catch((err) => console.log(err));
  }, []);

  const header = rpl.find((item) => item.type === "header");
  const skema = rpl.find((item) => item.type === "skema");
  const tahapan = rpl.filter((item) => item.type === "tahapan");
  const sk = rpl.find((item) => item.type === "sk");
  const persyaratan = rpl.filter((item) => item.type === "persyaratan");

  useEffect(() => {
    const fetchBiaya = async () => {
      try {
        const res = await api.get("/biaya-rpl");
        setBiayaData(res.data);
      } catch (err) {
        console.error("Gagal ambil data biaya:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBiaya();
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-blue-50/20 to-white min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full">
            <Award className="w-4 h-4" />
            {header?.extra}
          </div>

          <h1 className="text-3xl md:text-5xl font-light">{header?.title}</h1>

          <p className="text-gray-600">{header?.content}</p>
        </div>

        {/* SKEMA */}
        <h2>{skema?.title}</h2>
        <p>{skema?.content}</p>

        {skema?.extra && <img src={`http://localhost:8000/storage/${skema.extra}`} className="rounded-xl" />}

        {/* TAHAPAN */}
        {tahapan.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}

        {/* SK RPL */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Surat Keputusan Pengelola RPL</h2>
          </div>

          <p className="text-gray-600 mb-6 font-light">Berikut adalah Surat Keputusan Pemimpin Perguruan Tinggi mengenai pengangkatan Pengelola RPL.</p>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* BUTTON DOWNLOAD */}
            {sk?.extra && (
              <a
                href={`http://localhost:8000/storage/${sk.extra}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
              >
                <Download className="w-5 h-5" />
                Lihat / Download PDF
              </a>
            )}

            {/* PREVIEW PDF */}
            <div className="w-full md:flex-1 h-80 md:h-96 backdrop-blur-sm bg-white/30 border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
              {sk?.extra && <iframe src={`http://localhost:8000/storage/${sk.extra}`} className="w-full h-full" />}
            </div>
          </div>
        </section>

        {/* PERSYARATAN */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Persyaratan Umum</h2>
          </div>

          <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-gray-100 shadow-lg">
            <ul>
              {persyaratan.map((item, index) => (
                <li key={index}>{item.content}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pembiayaan */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Pembiayaan</h2>
          </div>

          <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-4 mb-6">
            <p className="text-gray-700 font-medium text-sm">
              <Sparkles className="w-4 h-4 inline mr-2 text-cyan-600" />
              Keterangan: Biaya semester termasuk SKS, SPP, Hereg, Penunjang, PPL, KKN, Skripsi, Ujian Skripsi, Praktikum.
            </p>
          </div>

          <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                    <th className="px-4 py-4 border-b border-white/20 text-left text-sm font-semibold uppercase tracking-wide">NO</th>
                    <th className="px-4 py-4 border-b border-white/20 text-left text-sm font-semibold uppercase tracking-wide">PROGRAM STUDI</th>
                    <th className="px-4 py-4 border-b border-white/20 text-center text-sm font-semibold uppercase tracking-wide">BIAYA SEMESTER</th>
                    <th className="px-4 py-4 border-b border-white/20 text-center text-sm font-semibold uppercase tracking-wide">PKKMB</th>
                    <th className="px-4 py-4 border-b border-white/20 text-center text-sm font-semibold uppercase tracking-wide">BPI GEL I</th>
                    <th className="px-4 py-4 border-b border-white/20 text-center text-sm font-semibold uppercase tracking-wide">BPI GEL II</th>
                    <th className="px-4 py-4 border-b border-white/20 text-center text-sm font-semibold uppercase tracking-wide">BPI GEL III</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {biayaData.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                      <td className="px-4 py-3">{item.program_studi}</td>
                      <td className="px-4 py-3 text-center">{item.biaya_semester}</td>
                      <td className="px-4 py-3 text-center">{item.pkkmb}</td>
                      <td className="px-4 py-3 text-center">{item.bpi_gel_1}</td>
                      <td className="px-4 py-3 text-center">{item.bpi_gel_2}</td>
                      <td className="px-4 py-3 text-center">{item.bpi_gel_3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Keterangan:</strong> Biaya semester termasuk (SKS, SPP, Hereg, Penunjang, PPL, KKN, Skripsi, Ujian Skripsi, Praktikum)
              </p>
            </div>
            <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Menghitung Biaya Total:</strong> Biaya Total = (Biaya Semester) + (BPI sesuai Gelombang) + (PKKMB / Ospek)
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 rounded-2xl p-8 inline-block">
            <p className="text-gray-900 font-semibold mb-4 text-lg">Siap mendaftar melalui jalur RPL?</p>
            <a
              href="https://pmb.unipma.ac.id/portal/daftar_RPL"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Calendar className="w-5 h-5" />
              Daftar Sekarang
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
