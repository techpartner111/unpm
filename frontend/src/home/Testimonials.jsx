import React from "react";
import { Quote, Star, GraduationCap } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ahmad Rafi",
      program: "Pendidikan Informatika",
      message:
        "Kuliah di UNIPMA membuat saya berkembang tidak hanya akademik tetapi juga softskill. Lingkungannya juga sangat mendukung.",
    },
    {
      name: "Siti Lailatul",
      program: "Pendidikan Bahasa Inggris",
      message:
        "Dosen sangat suportif dan fasilitas kampus lengkap. Banyak peluang beasiswa untuk mahasiswa berprestasi.",
    },
    {
      name: "Dewi Saraswati",
      program: "PGSD",
      message:
        "Saya bangga menjadi bagian dari UNIPMA. Kegiatan kampusnya aktif dan banyak organisasi untuk mengembangkan diri.",
    },
  ];

  return (
    <div className="relative py-20 bg-gradient-to-b from-white via-blue-50/20 to-gray-50 overflow-hidden" id="testimoni">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium border border-cyan-200/50 shadow-sm">
            <Star className="w-4 h-4 fill-cyan-600" />
            Kata Mereka
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            Testimoni <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Mahasiswa</span>
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Dengarkan pengalaman langsung dari mahasiswa UNIPMA yang telah merasakan kualitas pendidikan kami
          </p>

          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-100 hover:border-cyan-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Quote Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Message */}
              <div className="relative mb-6">
                <p className="text-gray-700 leading-relaxed font-light italic">
                  "{item.message}"
                </p>
              </div>

              {/* Divider */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

              {/* Author Info */}
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center border-2 border-cyan-200 flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">{item.program}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="relative mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 rounded-2xl p-8">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">Ingin menjadi bagian dari keluarga UNIPMA?</p>
              <p className="text-gray-600 font-light">Bergabunglah dengan ribuan mahasiswa yang telah merasakan pengalaman belajar terbaik</p>
            </div>
            <a
              href="https://pmb.unipma.ac.id/portal/daftar"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Daftar Sekarang
              <GraduationCap className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}