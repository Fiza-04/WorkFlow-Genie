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

  return <div>Dashboard</div>;
};

export default Dashboard;
