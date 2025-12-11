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

  // Fetch product details
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

  // Fetch product-specific reviews
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

  // Submit a new review
  const submitReview = async (e) => {
    e.preventDefault();
    if (!name || !rating || !comment) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
  productId: product._id,  // Must be the MongoDB ObjectId of the product
  name,
  rating: Number(rating),
  comment,
});

      toast.success("Review submitted!");
      setName("");
      setRating(0);
      setComment("");
      fetchReviews(); // refresh review list
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
        <div className="w-full h-full flex flex-col md:flex-row md:max-h-full md:overflow-y-auto pt-6 px-4 md:px-10 font-sans">
          {/* Product Images */}
          <div className="w-full md:w-1/2 flex justify-center items-start md:items-center mb-6 md:mb-0">
            <div className="w-full max-w-3xl">
              <ImageSlider images={product?.images || []} />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex justify-center items-start md:h-full">
            <div className="w-full max-w-md md:max-w-lg md:h-[620px] flex flex-col items-center">
              <h1 className="w-full hidden md:block text-center text-4xl text-[var(--color-accent)] font-semibold">
                {product.name}
                {Array.isArray(product.altNames) &&
                  product.altNames.length > 0 &&
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
                    <span className="text-2xl md:text-3xl text-gray-500 line-through">{formatCurrency(product.labelledPrice)}</span>
                    <span className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">{formatCurrency(product.price)}</span>
                  </>
                ) : (
                  <span className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">{formatCurrency(product.price)}</span>
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

          {/* Review Section */}
          <div className="w-full mt-10 md:mt-0 md:w-full px-4 md:px-10">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            {/* Review Form */}
            <form onSubmit={submitReview} className="mb-6">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border p-2 w-full mb-2"
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
                className="border p-2 w-full mb-2"
              />
              <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
                Submit Review
              </button>
            </form>

            {/* Review List */}
            <div>
              {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
              {reviews.map((r) => (
                <div key={r._id} className="p-3 mb-3 border rounded">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-yellow-500">{'⭐'.repeat(r.rating)}</p>
                  <p>{r.comment}</p>
                  <p className="text-sm text-gray-400">{r.createdAt.slice(0, 10)}</p>
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
