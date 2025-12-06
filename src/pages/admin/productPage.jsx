import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";



export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
     

    useEffect(() => { loadProducts(); }, []);

    const loadProducts = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
            setProducts(res.data?.products || res.data || []);
        } catch {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm("Delete this product?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });

            toast.success("Product deleted");
            loadProducts();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="w-full font-[Poppins]">

            {/* Header Section */}
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-[#EDD9E3]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-[Playfair] text-[#7A4669] tracking-wide">
                         Product Management
                    </h2>

                    <Link
                        to="/admin/add-product"
                        className="bg-[#E4A6B7] px-6 py-3 text-[#2A1E28] text-lg font-semibold rounded-xl shadow hover:opacity-90 transition-all"
                    >
                        + Add New Product
                    </Link>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="h-12 w-12 border-4 border-[#E4A6B7] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-[#7A4669] mt-4 text-lg">Loading products…</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                          
                        <table className="w-full text-[17px] border-separate border-spacing-y-2">

                            {/* Table Header */}
                            <thead>
                                <tr className="bg-[#F9E6ED] text-[#7A4669] text-lg">
                                    <th className="p-4 rounded-l-xl">Product ID</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Labelled Price</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 rounded-r-xl text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Rows */}
                            <tbody>
                                {products.map((product, index) => (
                                    <tr
                                       
                                        key={product._id || index}
                                        className="bg-white shadow-md rounded-xl"
                                    >
                                        <td className="p-4 font-semibold text-[#2A1E28]">
                                            {product.productId || index + 1}
                                        </td>

                                        <td className="p-4 font-semibold text-[#7A4669]">
                                            {product.name || product.productName || "N/A"}
                                        </td>

                                        <td className="p-4">
                                            {product.images?.[0] ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt="Product"
                                                    className="w-14 h-14 rounded-lg object-cover border border-[#EBD3DB]"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </td>

                                        <td className="p-4 text-[#7A4669] font-semibold">
                                            ${product.labelledPrice || "0"}
                                        </td>

                                        <td className="p-4 text-[#2A1E28] font-bold">
                                            ${product.price || "0"}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                                    product.stock > 50
                                                        ? "bg-green-100 text-green-700"
                                                        : product.stock > 0
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                                    product.isAvailable
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {product.isAvailable ? "Available" : "Unavailable"}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-4">
                                                {/* Edit */}
                                                <button
                                                    onClick={() =>
                                                        navigate("/admin/edit-product", { state: product })
                                                    }
                                                    className="text-[#E4A6B7] hover:text-[#7A4669] transition text-[22px]"
                                                >
                                                    <FaEdit />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="text-[#E45A68] hover:text-red-800 transition text-[22px]"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        <p className="mt-6 text-[#7A4669] text-lg font-semibold">
                            Total Products: {products.length}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
