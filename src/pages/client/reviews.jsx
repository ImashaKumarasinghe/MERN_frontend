import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import Loading from "../../components/loading";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">All Customer Reviews</h1>

        {status === "loading" && <Loading />}
        {status === "error" && (
          <p className="text-center text-red-600 text-lg">Failed to load reviews.</p>
        )}

        {status === "success" && reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}

        {status === "success" && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r._id} className="border rounded-lg p-4 shadow">
                {/* Product Info */}
                {r.productId && (
                  <div className="flex items-center gap-4 mb-3">
                    {r.productId.images?.[0] && (
                      <img
                        src={r.productId.images[0]}
                        alt={r.productId.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <h2 className="text-xl font-semibold">{r.productId.name}</h2>
                  </div>
                )}

                {/* Review Info */}
                <p className="font-medium">{r.name}</p>
                <p className="text-yellow-500 text-lg">{'⭐'.repeat(r.rating)}</p>
                <p className="text-gray-700 mt-1">{r.comment}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
