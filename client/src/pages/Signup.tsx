import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  async function registerUser(event: React.FormEvent) {
    event.preventDefault();

    let valid = true;

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

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
      navigate("/projects");
    } else {
      alert("Incorrect Email or Password!");
    }
  }

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      navigate("/projects");
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
          className="input-style-1 mb-3"
          required
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
          className="input-style-1 mb-3"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="input-style-1 mb-3"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input-style-1 mb-3"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input-style-1 mb-3"
          required
        />
        {passwordError && (
          <p className="text-red-500 text-sm mb-4">{passwordError}</p>
        )}
        <input
          type="submit"
          value="Sign Up"
          className="rounded-[5px] p-1 hover:bg-neutral-900 mt-3"
        />
      </form>
    </div>
  );
};

export default Signup;
