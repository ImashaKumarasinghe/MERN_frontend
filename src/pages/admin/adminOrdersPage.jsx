import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../../components/loading";



export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    useEffect(() => {
		if (isLoading) {
			const token = localStorage.getItem("token");
			if (!token) {
				alert("Please login first");
				return;
			}
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					setOrders(res.data);
					setIsLoading(false);
				})
				.catch((e) => {
					alert(
						"Error fetching orders: " +
							(e.response?.data?.message || "Unknown error")
					);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

    return (
        
        <div className="w-full h-full max-full overflow-y-scroll">
            {
                isLoading ? <Loading /> :
                <table>
                    <thead>
                        <tr>
                            <th className="p-4 border border-gray-300">Order ID</th>
                            <th className="p-4 border border-gray-300">Name</th>
                             <th className="p-4 border border-gray-300">Email</th>
                            <th className="p-4 border border-gray-300">Address</th>
                            <th className="p-4 border border-gray-300">Phone</th>
                            <th className="p-4 border border-gray-300">Total </th>
                             <th className="p-4 border border-gray-300">date</th>
                            <th className="p-4 border border-gray-300">Status</th>
                        </tr>
                    </thead>
                </table>
            }

            
               
           
        </div>
    )
}