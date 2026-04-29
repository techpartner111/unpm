import AdminDashboard from "./AdminDashboard";


export default function Dashboard() {
  // Nanti ganti ini dengan data dari backend atau localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Anda belum login</h1>
      </div>
    );
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;

    default:
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Role tidak dikenal</h1>
        </div>
      );
  }
}
