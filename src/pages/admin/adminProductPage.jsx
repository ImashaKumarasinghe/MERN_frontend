import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";  // ✅ Added import

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
                    {/* ✅ Changed button to Link component */}
                    <Link 
                        to="/admin/add-product" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        + Add New Product
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No products found.</p>
                        {/* ✅ Changed button to Link component */}
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
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr key={product._id || index} className="border-b hover:bg-gray-50">
                    {/* Product ID */}
                    <td className="px-4 py-2">{product.productId || index + 1}</td>
                    
                    {/* Name */}
                    <td className="px-4 py-2">{product.name || product.productName || 'N/A'}</td>
                    
                    {/* Image */}
                    <td className="px-4 py-2">
                        {/* ✅ Fixed: Check images array first */}
                        {product.images && product.images[0] ? (
                            <img 
                                src={product.images[0]} 
                                alt={product.name || product.productName || 'Product'} 
                                className="w-12 h-12 object-cover rounded"
                            />
                        ) : product.image || product.productImage ? (
                            <img 
                                src={product.image || product.productImage} 
                                alt={product.name || product.productName || 'Product'} 
                                className="w-12 h-12 object-cover rounded"
                            />
                        ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No image</span>
                            </div>
                        )}
                    </td>
                    
                    {/* Labelled Price */}
                    <td className="px-4 py-2">
                        ${product.labelledPrice || product.originalPrice || '0'}
                    </td>
                    
                    {/* Price */}
                    <td className="px-4 py-2 font-semibold text-green-600">
                        ${product.price || product.productPrice || '0'}
                    </td>
                    
                    {/* Stock */}
                    <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                            (product.stock || 0) > 50 ? 'bg-green-100 text-green-800' :
                            (product.stock || 0) > 0 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {product.stock || product.quantity || '0'}
                        </span>
                    </td>
                    
                    {/* Status */}
                    <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                            product.isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {product.isAvailable ? '✓ Available' : '✗ Unavailable'}
                        </span>
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