import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from "axios";                   
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
     const [status, setStatus] = useState("loading");//for auth check


     useEffect(() => {
        const token = localStorage.getItem("token");

        // No token → redirect to login
        if (!token) {
            setStatus("unauthenticated");
            navigate("/login");
            return;
        }

        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                // If user is not admin → redirect home
                if (response.data.role !== "admin") {
                    setStatus("unauthorized");
                    toast.error("You are not authorized to access admin panel");
                    navigate("/");
                } else {
                    setStatus("authenticated");
                }
            })
            .catch((error) => {
                console.error(error);
                setStatus("unauthenticated");
                toast.error("Session expired. Please login again.");
                navigate("/login");
            });
    }, []);

    const isActive = (route) =>
        pathname.includes(route)
            ? "bg-[#F8D4E2] text-[#4B2A3A] font-semibold shadow-md"
            : "text-white/80";

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="w-full h-screen flex font-[Poppins] bg-[#F9F5F7] text-[#3D2A34]">

            {/* Sidebar */}
            <aside className="
                w-[320px]  /* Reduced width */
                bg-gradient-to-b from-[#8E4A72] to-[#2D1A25]
                p-5         /* Slightly reduced padding */
                shadow-2xl 
                flex flex-col 
                rounded-r-3xl
            ">
                <h1 className="
                    text-3xl 
                    font-[Playfair] 
                    text-[#F9DCE5]
                    mb-10 
                    text-center 
                    tracking-wide 
                    drop-shadow-md
                ">
                    Admin Panel
                </h1>

                <nav className="flex flex-col gap-3 text-lg">
                    <Link
                        to="/admin/products"
                        className={`
                            px-4 py-2 rounded-xl
                            transition-all duration-300
                            hover:bg-[#F8D4E2] hover:text-[#4B2A3A] hover:shadow-md
                            ${isActive("products")}
                        `}
                    >
                        📦 Manage Products
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`
                            px-4 py-2 rounded-xl
                            transition-all duration-300
                            hover:bg-[#F8D4E2] hover:text-[#4B2A3A] hover:shadow-md
                            ${isActive("users")}
                        `}
                    >
                        👥 Users
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={`
                            px-4 py-2 rounded-xl
                            transition-all duration-300
                            hover:bg-[#F8D4E2] hover:text-[#4B2A3A] hover:shadow-md
                            ${isActive("orders")}
                        `}
                    >
                        🛒 Orders
                    </Link>

                    <Link
                        to="/admin/reviews"
                        className={`
                            px-4 py-2 rounded-xl
                            transition-all duration-300
                            hover:bg-[#F8D4E2] hover:text-[#4B2A3A] hover:shadow-md
                            ${isActive("reviews")}
                        `}
                    >
                        ⭐ Reviews
                    </Link>
                </nav>

                <button
                    onClick={logout}
                    className="
                        mt-auto 
                        bg-red-500 
                        text-white 
                        w-full py-3 
                        rounded-xl 
                        hover:bg-red-600 
                        transition-all 
                        duration-300 
                        text-lg 
                        shadow-md
                    "
                >
                    🚪 Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <div className="bg-white shadow-xl rounded-3xl p-10 min-h-[88vh]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
