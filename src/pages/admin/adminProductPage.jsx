import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/products"
            );
            
            console.log("API Response:", response.data);  // ✅ Debug log
            
            // ✅ Check if response.data is an array
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } 
            // ✅ Check if response.data has a products property
            else if (response.data.products && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } 
            // ✅ Check if response.data has a data property
            else if (response.data.data && Array.isArray(response.data.data)) {
                setProducts(response.data.data);
            } 
            else {
                console.error("Unexpected response format:", response.data);
                setProducts([]);  // Set empty array as fallback
                toast.error("Unexpected data format from server");
            }
            
            setLoading(false);
            toast.success("Products loaded successfully!");
            
        } catch (error) {
            console.error("Load products error:", error);
            toast.error("Failed to load products");
            setProducts([]);  // ✅ Set empty array on error
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">All Products</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        + Add New Product
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No products found.</p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Create First Product
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Product id</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Labelled Price</th>
                                     <th className="px-4 py-2 text-left">Price</th>

                                    <th className="px-4 py-2 text-left">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id || index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{product.name || product.productName || 'N/A'}</td>
                                        <td className="px-4 py-2">
                                            ${product.price || product.productPrice || '0'}
                                        </td>
                                        <td className="px-4 py-2">{product.stock || product.quantity || '0'}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 text-sm">
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 text-gray-600">
                            <p>Total Products: <span className="font-bold">{products.length}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}