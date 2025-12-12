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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">All Customer Reviews</h1>

      {status === "loading" && <Loading />}

      {status === "error" && (
        <p className="text-center text-red-600 text-lg">Failed to load reviews.</p>
      )}

      {status === "success" && reviews.length === 0 && (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}

      {status === "success" && reviews.length > 0 && (
        <div className="flex flex-col items-center gap-8">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="
                border border-pink-300 
                rounded-xl 
                p-6 
                bg-white 
                w-[85%] 
                relative 
                shadow-lg shadow-pink-200
              "
            >
              {/* RIGHT-SIDE SECTION */}
              <div className="absolute top-4 right-4 text-right">

                {/* Reviewer Name */}
                <p className="font-semibold text-lg">{r.name}</p>

                {/* Stars */}
                <p className="text-yellow-500 text-xl">
                  {"⭐".repeat(r.rating)}
                </p>

                {/* Review Text */}
                <p className="text-gray-700 mt-2 max-w-[260px] ml-auto">
                  {r.comment}
                </p>

                {/* Date */}
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* LEFT-SIDE PRODUCT INFO */}
              {r.productId && (
                <div className="flex items-center gap-4 mb-3">
                  {r.productId.images?.[0] && (
                    <img
                      src={r.productId.images[0]}
                      alt={r.productId.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}

                  <h2 className="text-xl font-semibold">{r.productId.name}</h2>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);




}