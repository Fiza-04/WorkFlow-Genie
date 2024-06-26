import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.user && data.status === "ok") {
        Cookies.set("token", data.user, { expires: 1 });
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Incorrect Email or Password!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="absolute m-6 top-[30%] left-[10%] text-white flex flex-col">
      <div className="title_container mb-5">
        <span className="text-style">Login</span>
      </div>
      <form onSubmit={loginUser} className="flex flex-col">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input-style-1"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input-style-1"
        />
        <input
          type="submit"
          value="Log In"
          className="rounded-[5px] p-1 hover:bg-neutral-900 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
