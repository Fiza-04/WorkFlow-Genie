import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user && data.status === "ok") {
      Cookies.set("token", data.user, { expires: 1 });
      alert("Signup Successful");
      navigate("/dashboard");
    } else {
      alert("Incorrect Email or Password!");
    }
  }

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="absolute m-6 top-[20%] left-[5%] text-white flex flex-col">
      <div className="title_container mb-3">
        <span className="text-style">SignUp</span>
      </div>
      <form onSubmit={registerUser} className="flex flex-col">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
          className="input-style-1"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
          className="input-style-1"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="input-style-1"
        />
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="input-style-1"
        />
        <input
          type="submit"
          value="Sign Up"
          className="rounded-[5px] p-1 hover:bg-neutral-900"
        />
      </form>
    </div>
  );
};

export default Signup;
