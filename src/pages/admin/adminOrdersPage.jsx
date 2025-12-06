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
        <div className="w-full font-[var(--font-main)] p-6">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#92487A] leading-tight">Orders</h1>
                        <p className="text-sm md:text-base text-gray-500 mt-1">Overview of recent orders placed on the store</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs md:text-sm text-gray-500">Total Orders</div>
                        <div className="mt-1 text-2xl md:text-3xl font-bold text-[#432323]">{orders.length}</div>
                    </div>
                </div>

                <div className="bg-white border border-[#EDD9E3] rounded-2xl shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="p-8">
                            <Loading />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-[#F9E6ED] text-[#7A4669]">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-base md:text-lg font-medium">Order ID</th>
                                        <th className="text-left px-6 py-4 text-base md:text-lg font-medium">Name</th>
                                        <th className="text-left px-6 py-4 text-base md:text-lg font-medium">Email</th>
                                        <th className="text-left px-6 py-4 text-base md:text-lg font-medium">Address</th>
                                        <th className="text-left px-6 py-4 text-base md:text-lg font-medium">Phone</th>
                                        <th className="text-right px-6 py-4 text-base md:text-lg font-medium">Total</th>
                                        <th className="text-left px-6 py-4 text-base md:text-lg font-medium">Date</th>
                                        <th className="text-center px-6 py-4 text-base md:text-lg font-medium">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-10 text-center text-gray-500 text-base">
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order, index) => (
                                            <tr key={order._id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="px-6 py-4 text-base md:text-sm text-[#432323]">{order._id}</td>
                                                <td className="px-6 py-4 text-base md:text-sm text-gray-700">{order.name}</td>
                                                <td className="px-6 py-4 text-base md:text-sm text-gray-600">{order.email}</td>
                                                <td className="px-6 py-4 text-base md:text-sm text-gray-700">{order.address}</td>
                                                <td className="px-6 py-4 text-base md:text-sm text-gray-700">{order.phone}</td>
                                                <td className="px-6 py-4 text-base md:text-sm text-right text-[#432323]">${(Number(order.total) || 0).toFixed(2)}</td>
                                                <td className="px-6 py-4 text-base md:text-sm text-gray-600">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-sm md:text-base font-semibold ${
                                                        order.status === "completed"
                                                            ? "bg-green-100 text-green-800"
                                                            : order.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}>
                                                        {order.status ?? "—"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}