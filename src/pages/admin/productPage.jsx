import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/products"
            );
            
            console.log("API Response:", response.data);
            
            if (Array.isArray(response.data)) {
                setProducts(response. data);
            } 
            else if (response.data. products && Array.isArray(response. data.products)) {
                setProducts(response.data.products);
            } 
            else if (response.data.data && Array.isArray(response. data.data)) {
                setProducts(response.data.data);
            } 
            else {
                console.error("Unexpected response format:", response.data);
                setProducts([]);
                toast.error("Unexpected data format from server");
            }
            
            setLoading(false);
            
        } catch (error) {
            console.error("Load products error:", error);
            toast.error("Failed to load products");
            setProducts([]);
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (! window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        try {
            console.log("🗑️ Deleting product with _id:", id);
            console.log("🌐 Delete URL:", import.meta.env.VITE_BACKEND_URL + "/api/products/" + id);
            
            await axios.delete(
                import. meta.env.VITE_BACKEND_URL + "/api/products/" + id,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );
            
            console.log("✅ Delete successful");
            toast.success("Product deleted successfully");
            loadProducts();
        } catch (error) {
            console.error("❌ Delete error:", error);
            console.error("❌ Error status:", error.response?.status);
            console.error("❌ Error data:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to delete product");
        }
    };

    return (
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold mb-6">Product Management</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">All Products</h2>
                    <Link 
                        to="/admin/add-product" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        + Add New Product
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p className="text-gray-600 mt-4">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No products found.</p>
                        <Link 
                            to="/admin/add-product"
                            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Create First Product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Product ID</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Labelled Price</th>
                                    <th className="px-4 py-2 text-left">Price</th>
                                    <th className="px-4 py-2 text-left">Stock</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id || index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{product. productId || index + 1}</td>
                                        <td className="px-4 py-2">{product. name || product.productName || 'N/A'}</td>
                                        
                                        <td className="px-4 py-2">
                                            {product.images && product.images[0] ? (
                                                <img 
                                                    src={product.images[0]} 
                                                    alt={product.name || 'Product'} 
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs">No image</span>
                                                </div>
                                            )}
                                        </td>
                                        
                                        <td className="px-4 py-2">${product.labelledPrice || '0'}</td>
                                        <td className="px-4 py-2 font-semibold text-green-600">${product.price || '0'}</td>
                                        
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                (product.stock || 0) > 50 ? 'bg-green-100 text-green-800' :
                                                (product.stock || 0) > 0 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {product.stock || '0'}
                                            </span>
                                        </td>
                                        
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                product.isAvailable 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.isAvailable ? '✓ Available' : '✗ Unavailable'}
                                            </span>
                                        </td>
                                        
                                        <td className="px-4 py-2">
                                            <div className="flex justify-center items-center gap-3">
                                                <button
                                                    onClick={() => navigate("/admin/edit-product", { state: product })}
                                                    className="text-blue-500 hover:text-blue-700 transition"
                                                    title="Edit product"
                                                >
                                                    <FaEdit className="text-[20px]" />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    title="Delete product"
                                                >
                                                    <FaTrash className="text-[20px]" />
                                                </button>
                                            </div>
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