import { Link, Outlet } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex'>
            <div className='h-full w-[300px] flex flex-col bg-gray-800 text-white p-4'>
                <Link to="/admin/users" className='py-2 px-4 hover:bg-gray-700 rounded'>Users</Link>
                <Link to="/admin/products" className='py-2 px-4 hover:bg-gray-700 rounded'>Products</Link>
                <Link to="/admin/orders" className='py-2 px-4 hover:bg-gray-700 rounded'>Orders</Link>
                <Link to="/admin/reviews" className='py-2 px-4 hover:bg-gray-700 rounded'>Reviews</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)] bg-red-400 p-8">
                <Outlet />
            </div>
        </div>
    )
}