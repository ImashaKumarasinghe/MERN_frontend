import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    console.log(email);
    console.log(password);
    
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password
      });
      
      toast.success("Login Successful! 🎉");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      
      
    } catch (error) {
      toast.error("Invalid credentials! ❌");  // ✅ Fixed: toast.error not toast.log
      console.log("Login error:", error.response?.data);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/up4.jpg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
      <div className="w-[50%] h-full"></div>
      
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
          <input 
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px] px-4" 
          />
          <input 
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password" 
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] mb-[20px] px-4" 
          />
          <button 
            onClick={handleLogin}  
            className="w-[300px] cursor-pointer h-[50px] bg-[#7b9c92] rounded-[20px] my-[20px] text-[20px] font-bold text-white hover:bg-[#6a8b81] transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}