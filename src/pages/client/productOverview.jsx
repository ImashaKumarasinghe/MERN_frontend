import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart } from "../../utils/cart";

export default function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id || params.productId || params.Id;
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setStatus("error");
      toast.error("Product ID missing");
      return;
    }

    const loadProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
        setProduct(res.data);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
        toast.error("Error fetching product details");
      }
    };

    loadProduct();
  }, [productId]);

  const fetchReviews = async () => {
    if (!product?._id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/${product._id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!name || !rating || !comment) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        productId: product._id,
        name,
        rating: Number(rating),
        comment,
      });

      toast.success("Review submitted!");
      setName("");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to submit review");
    }
  };

  const formatCurrency = (v) =>
    (Number(v) || 0).toLocaleString("en-LK", { style: "currency", currency: "LKR" });

  return (
    <>
      <Header />
      {status === "success" && product && (
        <div className="w-full flex flex-col font-sans">
          {/* Product Section */}
          <div className="w-full flex flex-col md:flex-row pt-6 px-4 md:px-10 gap-6">
            {/* Product Images */}
            <div className="w-full md:w-1/2 flex justify-center items-start md:items-center">
              <div className="w-full max-w-3xl">
                <ImageSlider images={product?.images || []} />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex justify-center items-start">
              <div className="w-full max-w-md md:max-w-lg flex flex-col items-center">
                <h1 className="w-full text-center text-4xl text-[var(--color-accent)] font-semibold">
                  {product.name}
                  {Array.isArray(product.altNames) &&
                    product.altNames.map((altName, index) => (
                      <span key={index} className="text-2xl text-gray-600">
                        {" | " + altName}
                      </span>
                    ))}
                </h1>

                <div className="w-full text-center my-3 text-sm text-gray-600 font-semibold">
                  {product.productId ?? ""}
                </div>

                <p className="w-full text-center my-3 text-md text-gray-600">{product.description}</p>

                <div className="my-4 flex items-center gap-4">
                  {Number(product.labelledPrice) > Number(product.price) ? (
                    <>
                      <span className="text-2xl md:text-3xl text-gray-500 line-through">
                        {formatCurrency(product.labelledPrice)}
                      </span>
                      <span className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
                        {formatCurrency(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>

                <div className="w-full flex flex-col md:flex-row gap-3 justify-center items-center mt-6">
                  <button
                    className="w-[220px] h-[52px] bg-[var(--color-accent)] text-white rounded-2xl hover:opacity-95 transition-all duration-200"
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="w-[220px] h-[52px] bg-[var(--color-secondary)] text-white rounded-2xl hover:opacity-95 transition-all duration-200"
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          cart: [
                            {
                              productId: product._id,
                              name: product.name,
                              image: product.images?.[0] || "",
                              price: product.price,
                              labelledPrice: product.labelledPrice,
                              qty: 1,
                            },
                          ],
                        },
                      })
                    }
                  >
                    Buy Now
                  </button>
                </div>

                <div className="w-full mt-6 text-sm text-gray-600 text-center">
                  <p>
                    <span className="font-semibold">Stock:</span> {product.stock ?? "—"}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Status:</span> {product.isAvailable ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- Review Section Below Product ---------------- */}
          <div className="w-full mt-12 px-4 md:px-10">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            {/* Review Form */}
            <form onSubmit={submitReview} className="mb-6 flex flex-col gap-3 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 w-full rounded-lg"
              />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border p-3 w-full rounded-lg"
              >
                <option value={0}>Select Rating</option>
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>
                    {"⭐".repeat(star)}
                  </option>
                ))}
              </select>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="border p-3 w-full rounded-lg"
              />
              <button type="submit" className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg hover:opacity-95 transition-all duration-200">
                Submit Review
              </button>
            </form>

            {/* Review List */}
            <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-6">
              {reviews.length === 0 && <p className="text-gray-500 text-center">No reviews yet.</p>}
              {reviews.map((r) => (
                <div key={r._id} className="p-4 border rounded-lg shadow hover:shadow-lg transition-all duration-300">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-yellow-500">{'⭐'.repeat(r.rating)}</p>
                  <p className="mt-1 text-gray-700">{r.comment}</p>
                  <p className="text-sm text-gray-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {status === "loading" && <Loading />}
      {status === "error" && (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-lg text-red-600">Failed to load product.</p>
          </div>
        </div>
      )}
    </>
  );
}
