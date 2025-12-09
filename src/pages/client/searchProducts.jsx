import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Header from "../../components/header";
import toast from "react-hot-toast";

export default function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                .then((res) => {
                    console.log("Products loaded:", res.data);
                    
                    // ✅ FIX: Extract products array from response
                    if (res.data. products && Array.isArray(res.data. products)) {
                        setProducts(res.data.products);
                    } else if (Array.isArray(res.data)) {
                        setProducts(res.data);
                    } else {
                        console.error("Unexpected response format:", res.data);
                        setProducts([]);
                    }
                    
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Load error:", err);
                    toast.error("Failed to load products");
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="w-full flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
                
                {isLoading ?  (
                    <div className="w-full h-64 flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="w-full h-64 flex justify-center items-center">
                        <p className="text-gray-600 text-lg">No products available at the moment.</p>
                    </div>
                ) : (
                    <div className="w-full flex flex-wrap justify-center items-start gap-4">
                        {products.map((product) => (
                            <ProductCard key={product._id || product.productId} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}