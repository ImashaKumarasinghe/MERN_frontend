import { useState } from "react";
import axios from "axios";
export default function LoginPage() {

   const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleLogin(){
    console.log(email)
    console.log(password)
    try{
        const response = await axios.post("http://localhost:5000/users/login",{
            email:email,
            password:password
        })
        console.log(response.data)
    }catch (error) {
        console.log("Login error:", error.response.data);
    }
  }
  return (
    <div className="w-full h-screen bg-[url('/up4.jpg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
       <div className="w-[50%] h-full ">

          </div>
          <div className="w-[50%] h-full flex justify-center items-center">
            <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
              <input 
                
                    onChange={
                        (e)=>{
                            setEmail(e.target.value)                        
                        }
                    }

                    value={email}
                
                className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]" />
                <input 
                    onChange={
                        (e)=>{
                            setPassword(e.target.value)                        
                        }
                    }
                    value={password}
                type="password" className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] mb-[20px]" />
                 <button onClick={handleLogin}  className="w-[300px] cursor-pointer h-[50px] bg-[#7b9c92] rounded-[20px] my-[20px] text-[20px] font-bold text-white">Login</button>
            </div>
          </div>
     
    </div>
  );
}