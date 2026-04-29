import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Calendar, Phone, IdCard, BookOpen, LogIn } from "lucide-react";
import unipmaLogo from "../assets/images/unipma.png"; // sesuaikan path
import { useSearchParams } from "react-router-dom";

export default function Register() {
  const [activeTab, setActiveTab] = useState("s1d3");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const jenjang = searchParams.get("jenjang");
    if (jenjang) {
      setActiveTab(jenjang);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tglLahir: "",
    email: "",
    noHp: "",
    tahunLulus: "",
    programStudi: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });

  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const generateCaptcha = () => {
    const ops = ["+", "-", "*", "/"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;

    if (op === "/") a = a * b;

    const result = eval(`${a}${op}${b}`);
    setCaptchaQuestion(`${a} ${op} ${b} = ?`);
    setCaptchaAnswer(result.toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }
    if (formData.captcha.trim() !== captchaAnswer) {
      alert("Captcha salah! Coba lagi.");
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/register", { ...formData, jenjang: activeTab });
      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registrasi gagal");
    } finally {
      setIsLoading(false);
      generateCaptcha();
    }
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case "s1d3":
        return (
          <>
            <Input label="Nama Lengkap" name="nama" icon={<User />} type="text" onChange={handleChange} />
            <Input label="NIK" name="nik" icon={<IdCard />} type="text" onChange={handleChange} />
            <Input label="Tanggal Lahir" name="tglLahir" icon={<Calendar />} type="date" onChange={handleChange} />
            <Input label="Email" name="email" icon={<Mail />} type="email" onChange={handleChange} />
            <Input label="Nomor HP" name="noHp" icon={<Phone />} type="tel" onChange={handleChange} />
            <Input label="Tahun Lulus SMA/Sederajat" name="tahunLulus" icon={<Calendar />} type="number" onChange={handleChange} />
          </>
        );

      case "s2":
        return (
          <>
            <Select label="Program Studi" name="programStudi" onChange={handleChange}>
              <option value="">-- Pilih Program Studi --</option>
              <option value="Pendidikan Bahasa dan Sastra Indonesia">Pendidikan Bahasa dan Sastra Indonesia</option>
              <option value="Pendidikan Ilmu Pengetahuan Sosial">Pendidikan Ilmu Pengetahuan Sosial</option>
              <option value="Pendidikan Dasar">Pendidikan Dasar</option>
              <option value="Bimbingan dan Konseling">Bimbingan dan Konseling</option>
              <option value="RPL - Pendidikan Ilmu Pengetahuan Sosial">RPL - Pendidikan Ilmu Pengetahuan Sosial</option>
            </Select>
            <Input label="Nama Lengkap" name="nama" icon={<User />} type="text" onChange={handleChange} />
            <Input label="NIK" name="nik" icon={<IdCard />} type="text" onChange={handleChange} />
            <Input label="Email" name="email" icon={<Mail />} type="email" onChange={handleChange} />
            <Input label="Nomor HP" name="noHp" icon={<Phone />} type="tel" onChange={handleChange} />
            <Input label="Tahun Lulus Sarjana" name="tahunLulus" icon={<Calendar />} type="number" onChange={handleChange} />
          </>
        );

      case "s3":
        return (
          <>
            <Select label="Program Studi (Doktoral)" name="programStudi" onChange={handleChange}>
              <option value="">-- Pilih Program Studi --</option>
              <option value="Doktor Pendidikan Bahasa dan Sastra Indonesia">Doktor Pendidikan Bahasa dan Sastra Indonesia</option>
              <option value="Doktor Pendidikan Dasar">Doktor Pendidikan Dasar</option>
              <option value="Doktor Ilmu Pendidikan">Doktor Ilmu Pendidikan</option>
            </Select>

            <Input label="Nama Lengkap" name="nama" icon={<User />} type="text" onChange={handleChange} />
            <Input label="NIK" name="nik" icon={<IdCard />} type="text" onChange={handleChange} />
            <Input label="Email" name="email" icon={<Mail />} type="email" onChange={handleChange} />
            <Input label="Nomor HP" name="noHp" icon={<Phone />} type="tel" onChange={handleChange} />
            <Input label="Tahun Lulus Magister (S2)" name="tahunLulus" icon={<Calendar />} type="number" onChange={handleChange} />
          </>
        );

      case "international":
        return (
          <>
            <Select label="Program Studi" name="programStudi" onChange={handleChange}>
              <option value="">-- Select Study Program --</option>
              <option value="Education">Education</option>
              <option value="Educational Management">Educational Management</option>
              <option value="Indonesian Language Education">Indonesian Language Education</option>
            </Select>

            <Input label="Full Name" name="nama" icon={<User />} type="text" onChange={handleChange} />
            <Input label="Passport Number" name="passport" icon={<IdCard />} type="text" onChange={handleChange} />
            <Input label="Email" name="email" icon={<Mail />} type="email" onChange={handleChange} />
            <Input label="Phone Number" name="noHp" icon={<Phone />} type="tel" onChange={handleChange} />
            <Input label="Year of Graduation" name="tahunLulus" icon={<Calendar />} type="number" onChange={handleChange} />
          </>
        );

      case "rpl":
        return (
          <>
            <Input label="Nama Lengkap" name="nama" icon={<User />} type="text" onChange={handleChange} />
            <Input label="NIK" name="nik" icon={<IdCard />} type="text" onChange={handleChange} />
            <Input label="Tanggal Lahir" name="tglLahir" icon={<Calendar />} type="date" onChange={handleChange} />
            <Input label="Email" name="email" icon={<Mail />} type="email" onChange={handleChange} />
            <Input label="Nomor HP" name="noHp" icon={<Phone />} type="tel" onChange={handleChange} />
            <Input label="Tahun Lulus SMA/Sederajat" name="tahunLulus" icon={<Calendar />} type="number" onChange={handleChange} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side Info */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-cyan-400 to-blue-600 p-10 text-white flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Panduan Pendaftaran</h2>
          <p className="text-gray-100/90 mb-6">Silakan pilih jenis pendaftaran dan isi data sesuai jenjang studi yang Anda tuju.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-100/90">
            <li>Isi semua kolom data dengan benar.</li>
            <li>Gunakan email dan nomor HP aktif.</li>
            <li>Pastikan captcha diisi dengan benar.</li>
          </ul>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={unipmaLogo} alt="Logo UNIPMA" className="w-24 h-24 mx-auto mb-4" />
            <h1 className="text-3xl font-light text-gray-900">Pendaftaran Mahasiswa Baru</h1>
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full mt-3"></div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            <TabButton label="S1 & D3" active={activeTab === "s1d3"} onClick={() => setActiveTab("s1d3")} />
            <TabButton label="S2" active={activeTab === "s2"} onClick={() => setActiveTab("s2")} />
            <TabButton label="S3" active={activeTab === "s3"} onClick={() => setActiveTab("s3")} />
            <TabButton label="International Student" active={activeTab === "international"} onClick={() => setActiveTab("international")} />
            <TabButton label="RPL" active={activeTab === "rpl"} onClick={() => setActiveTab("rpl")} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {renderFormFields()}

            <Input label="Password" name="password" icon={<Lock />} type="password" onChange={handleChange} />
            <Input label="Konfirmasi Password" name="confirmPassword" icon={<Lock />} type="password" onChange={handleChange} />

            {/* Captcha */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Verifikasi (Captcha)</label>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-cyan-100 text-cyan-700 font-bold rounded-lg shadow-sm text-lg select-none">{captchaQuestion}</div>
                <input
                  name="captcha"
                  type="text"
                  placeholder="Jawaban"
                  onChange={handleChange}
                  className="flex-1 bg-gray-50/50 border border-gray-200 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50 outline-none transition-all"
                  required
                />
                <button type="button" onClick={generateCaptcha} className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                  ↻
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? "Memproses..." : "Simpan"}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-200/50 mt-6">
            <p className="text-sm text-gray-600 font-light">
              Sudah punya akun?{" "}
              <a href="/login" className="text-cyan-600 hover:underline font-semibold">
                Masuk sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Component Pendukung ==============
const Input = ({ label, name, icon, type, onChange }) => (
  <div className="group">
    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        name={name}
        type={type}
        onChange={onChange}
        className="w-full bg-gray-50/50 border border-gray-200 pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50 outline-none transition-all"
        required
      />
    </div>
  </div>
);

const Select = ({ label, name, onChange, children }) => (
  <div className="group">
    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{label}</label>
    <select
      name={name}
      onChange={onChange}
      className="w-full bg-gray-50/50 border border-gray-200 pl-4 pr-4 py-3 rounded-lg text-gray-900 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50 outline-none transition-all"
      required
    >
      {children}
    </select>
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button type="button" onClick={onClick} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${active ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg" : "bg-white/60 text-gray-700 hover:bg-cyan-100"}`}>
    {label}
  </button>
);
