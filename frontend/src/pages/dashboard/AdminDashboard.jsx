import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/register", { ...form, role: "admin" });
      alert("Admin berhasil dibuat!");
      setForm({ name: "", email: "", password: "", password_confirmation: "" });
      getUsers();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).join(", "));
      } else {
        setError(err.response?.data?.message || "Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= GET USERS =================
  const getUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session habis, silakan login lagi");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  // ================= CEK TOKEN =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login dulu!");
      navigate("/login");
    } else {
      getUsers();
    }
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const myUser = JSON.parse(localStorage.getItem("user"));
    if (id === myUser?.id) {
      alert("Tidak bisa menghapus akun sendiri!");
      return;
    }
    if (!confirm("Yakin hapus user?")) return;
    try {
      await api.delete(`/users/${id}`);
      alert("User dihapus");
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await api.put(`/users/${editUser.id}`, editUser);
      alert("User berhasil diupdate");
      setEditUser(null);
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300 w-full";

  const labelClass =
    "block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5";

  const roleBadge = (role) =>
    role === "admin"
      ? "inline-block bg-yellow-50 text-yellow-800 border border-yellow-200 text-xs font-bold px-2.5 py-0.5 rounded-full"
      : "inline-block bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full";

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Sistem</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Kelola Admin & Users</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* ── Register Form Card ── */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-blue-100 shadow-sm p-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Tambah Admin</h2>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Nama</label>
              <input type="text" name="name" placeholder="Nama lengkap" value={form.name} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" placeholder="email@domain.com" value={form.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Konfirmasi Password</label>
              <input type="password" name="password_confirmation" placeholder="••••••••" value={form.password_confirmation} onChange={handleChange} required className={inputClass} />
            </div>

            <div className="pt-2 border-t border-blue-50">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                    </svg>
                    Tambah Admin
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── Users Table Card ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-blue-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Daftar Users</h2>
            <span className="ml-auto bg-blue-50 text-blue-500 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {users.length} user
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900 to-blue-700">
                  {["Nama", "Email", "Role", "Aksi"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-blue-300 text-sm font-medium">
                      Belum ada data user
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-blue-50/50 transition-colors duration-100">
                      <td className="px-5 py-3.5 font-semibold text-blue-900">{u.name}</td>
                      <td className="px-5 py-3.5 text-blue-500 text-xs">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={roleBadge(u.role)}>{u.role}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditUser(u)}
                            className="inline-flex items-center gap-1 border border-blue-300 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="inline-flex items-center gap-1 border border-red-200 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Edit User Modal Card ── */}
      {editUser && (
        <div className="fixed inset-0 bg-blue-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <h3 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Edit User</h3>
              <span className="ml-auto bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Mode Edit
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Nama</label>
                <input
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition w-full"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-blue-50">
              <button
                onClick={handleUpdate}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Update User
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}