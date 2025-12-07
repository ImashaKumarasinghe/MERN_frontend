import { Link, useNavigate } from "react-router-dom";
import UserData from "./userData";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="w-full h-[80px] shadow-2xl flex justify-center items-center relative px-4">
      <GiHamburgerMenu className ="h-full mx-2 text-3xl md:hidden absolute left-4" />

      <img 
        src="/logo.png" 
        alt="Logo" 
        className="w-[80px] h-[80px] object-cover cursor-pointer absolute left-4" 
        onClick={() => navigate("/")}
      />
      
      <div className="w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center">
        <Link to="/" className="text-[20px] font-bold mx-2 hover:text-blue-600 transition">
          Home
        </Link>
        <Link to="/products" className="text-[20px] font-bold mx-2 hover:text-blue-600 transition">
          Products
        </Link>
        <Link to="/about" className="text-[20px] font-bold mx-2 hover:text-blue-600 transition">
          About
        </Link>
        <Link to="/contact" className="text-[20px] font-bold mx-2 hover:text-blue-600 transition">
          Contact
        </Link>
        <Link to="/search" className="text-[20px] font-bold mx-2 hover:text-blue-600 transition">
          Search
        </Link>
      </div>

      <div className="w-[80px] h-full hidden md:flex justify-center items-center absolute right-4">
        <Link to="/cart" className="text-[20px] font-bold mx-2 hover:text-blue-600 transition">
        <BsCart3 />
        </Link>
       
      </div>
    </header>
  );
}