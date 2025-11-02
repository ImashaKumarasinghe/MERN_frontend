import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    console.log(email, firstname, lastname, password);

    // Validation
    if (!email || !firstname || !lastname || !password || !confirmPassword) {
      toast.error("Please fill in all fields! ⚠️");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match! ❌");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters! 🔒");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/register", {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      });

      toast.success("Registration Successful! 🎉");
     navigate("/login")

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed! ❌");
      }
      console.log("Registration error:", error.response?.data);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/up4.jpg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] h-[700px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
          
          <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-4"
          />

          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-4"
          />

          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-4"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-4"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-4"
          />

          <button
            onClick={handleRegister}
            className="w-[300px] cursor-pointer h-[50px] bg-[#7b9c92] rounded-[20px] my-[10px] text-[20px] font-bold text-white hover:bg-[#6a8b81] transition"
          >
            Register
          </button>

          <p className="text-white mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#c3efe9] cursor-pointer hover:underline font-semibold"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}