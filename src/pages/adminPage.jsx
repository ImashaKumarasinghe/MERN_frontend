import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className='w-full h-screen flex'>
            {/* Sidebar */}
            <div className='h-full w-[300px] flex flex-col bg-gray-800 text-white p-4'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Admin Panel</h2>
                
                <Link to="/admin/products" className='py-2 px-4 hover:bg-gray-700 rounded mb-2'>
                    📦 Products
                </Link>
                <Link to="/admin/users" className='py-2 px-4 hover:bg-gray-700 rounded mb-2'>
                    👥 Users
                </Link>
                <Link to="/admin/orders" className='py-2 px-4 hover:bg-gray-700 rounded mb-2'>
                    🛒 Orders
                </Link>
                <Link to="/admin/reviews" className='py-2 px-4 hover:bg-gray-700 rounded mb-2'>
                    ⭐ Reviews
                </Link>
                
                <div className="mt-auto">
                    <button 
                        onClick={handleLogout}
                        className='w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded'
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="h-full w-[calc(100%-300px)] bg-gray-100 p-8 overflow-y-auto">
                <Outlet />  {/* ✅ This renders child routes */}
            </div>
        </div>
    );
}