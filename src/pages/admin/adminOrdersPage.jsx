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
                    const data = res.data;
                    if (Array.isArray(data)) {
                        setOrders(data);
                    } else if (Array.isArray(data.orders)) {
                        setOrders(data.orders);
                    } else if (Array.isArray(data.data)) {
                        setOrders(data.data);
                    } else {
                        // fallback to empty array
                        setOrders([]);
                    }
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
        <div className="w-full h-full max-h-full overflow-y-scroll">
            {isLoading ? (
                <Loading />
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border border-gray-300">Order ID</th>
                            <th className="p-4 border border-gray-300">Name</th>
                            <th className="p-4 border border-gray-300">Email</th>
                            <th className="p-4 border border-gray-300">Address</th>
                            <th className="p-4 border border-gray-300">Phone</th>
                            <th className="p-4 border border-gray-300">Total</th>
                            <th className="p-4 border border-gray-300">Date</th>
                            <th className="p-4 border border-gray-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="p-4 text-center text-gray-600">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={order._id || index} className="text-center">
                                    <td className="p-4 border border-gray-300">{order._id}</td>
                                    <td className="p-4 border border-gray-300">{order.name}</td>
                                    <td className="p-4 border border-gray-300">{order.email}</td>
                                    <td className="p-4 border border-gray-300">{order.address}</td>
                                    <td className="p-4 border border-gray-300">{order.phone}</td>
                                    <td className="p-4 border border-gray-300">${(Number(order.total) || 0).toFixed(2)}</td>
                                    <td className="p-4 border border-gray-300">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}</td>
                                    <td className="p-4 border border-gray-300">{order.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}