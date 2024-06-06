import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const user = jwtDecode(token);
      if (!user) {
        Cookies.remove("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove("token");
      navigate("/login");
    }
  }, [navigate]);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status === "ok") {
        Cookies.remove("token");
        navigate("/login");
      } else {
        console.error("Failed to log out:", data.message);
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  return (
    <div>
      <a href="#" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
};

export default Dashboard;
