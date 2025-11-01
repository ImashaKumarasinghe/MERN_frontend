import { Link } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex '>
            <div className='h-full w-[300px] flex flex-col'>
                <Link to="/admin/users" >User </Link>
                <Link to="/admin/products" >Product </Link>
                <Link to="/admin/orders" >Order </Link>
                <Link to="/admin/reviews" >Review </Link>
            </div>
            <div className="h-full w-[calc(100%-300px)] bg-amber-400">
                <Routes path="/*">
                <Route path="/products" element={<h1>Products</h1>} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/orders" element={<h1>Orders</h1>} />
                <Route path="/reviews" element={<h1>Reviews</h1>} />

                </Routes>
            </div>

        </div>
    )
}