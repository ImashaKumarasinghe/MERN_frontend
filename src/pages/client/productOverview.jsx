import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart } from "../../utils/cart";
import { Send } from "lucide-react";

export default function ProductOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id;

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  /* ---------------- PRODUCT ---------------- */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
        );
        setProduct(res.data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    loadProduct();
  }, [productId]);

  /* ---------------- REVIEWS ---------------- */
  const fetchReviews = async () => {
    if (!product?._id) return;
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${product._id}`
    );
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [product]);

  const submitReview = async () => {
    if (!comment.trim()) {
      toast.error("Write a review");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        productId: product._id,
        rating,
        comment,
      });

      toast.success("Review sent");
      setComment("");
      fetchReviews();
    } catch {
      toast.error("Failed to submit review");
    }
  };

  const formatCurrency = (value) =>
    (Number(value) || 0).toLocaleString("en-LK", {
      style: "currency",
      currency: "LKR",
    });

  if (status === "loading") return <Loading />;

  if (status === "error") {
    return (
      <>
        <Header />
        <div className="w-full h-[60vh] flex items-center justify-center">
          <p className="text-red-500 text-lg">Failed to load product</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* ---------------- PRODUCT SECTION ---------------- */}
      <div className="w-full flex flex-col md:flex-row px-6 md:px-16 py-10 gap-10">
        {/* Images */}
        <div className="md:w-1/2">
          <ImageSlider images={product.images} />
        </div>

        {/* Details */}
        <div className="md:w-1/2 text-center">
          <h1 className="text-4xl font-serif text-[var(--color-accent)] font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* PRICE SECTION (FIXED) */}
          <div className="mt-6 flex justify-center items-center gap-4">
            {Number(product.labelledPrice) > Number(product.price) && (
              <span className="text-xl text-gray-400 line-through">
                {formatCurrency(product.labelledPrice)}
              </span>
            )}

            <span className="text-3xl font-bold text-[var(--color-accent)]">
              {formatCurrency(product.price)}
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={() => {
                addToCart(product, 1);
                toast.success("Added to cart");
              }}
              className="px-8 py-3 rounded-2xl bg-[var(--color-accent)] text-white"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="px-8 py-3 rounded-2xl bg-[var(--color-secondary)] text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- REVIEW MESSAGE INPUT ---------------- */}
<div className="max-w-4xl mx-auto px-6">
  <div
    className="
      relative
      p-4
      rounded-2xl
      border border-pink-200
      shadow-[0_6px_20px_rgba(236,72,153,0.25)]
      bg-white
    "
  >
    {/* ⭐ Rating (TOP RIGHT) */}
    <select
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="
        absolute
        top-3
        right-3
        border
        rounded-lg
        px-2
        py-1
        text-sm
        bg-white
      "
    >
      {[5, 4, 3, 2, 1].map((r) => (
        <option key={r} value={r}>
          {"⭐".repeat(r)}
        </option>
      ))}
    </select>

    {/* 💬 Message */}
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your review..."
      rows={3}
      className="
        w-full
        resize-none
        border
        rounded-xl
        p-4
        pr-16
        focus:outline-none
        focus:ring-2
        focus:ring-pink-300
      "
    />

    {/* ➤ Send button (BOTTOM RIGHT) */}
    <button
      onClick={submitReview}
      className="
        absolute
        bottom-4
        right-4
        w-10
        h-10
        flex
        items-center
        justify-center
        rounded-full
        bg-[var(--color-accent)]
        text-white
        hover:scale-105
        transition
      "
    >
      <Send size={18} />
    </button>
  </div>
</div>

      {/* ---------------- REVIEW LIST ---------------- */}
      <div className="max-w-6xl mx-auto px-6 mt-10 flex flex-col gap-4">
        {reviews.length === 0 && (
          <p className="text-gray-500 text-center">No reviews yet</p>
        )}

        {reviews.map((r) => (
          <div
            key={r._id}
            className="flex gap-4 p-4 rounded-2xl border border-pink-200 bg-white shadow-[0_6px_20px_rgba(236,72,153,0.2)]"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1 flex flex-col items-end text-right gap-1">
              <p className="font-semibold text-[var(--color-accent)]">
                {r.name || "Customer"}
              </p>

              <p className="text-yellow-500 text-sm">
                {"⭐".repeat(r.rating)}
              </p>

              <p className="text-gray-700 text-sm max-w-xl">
                {r.comment}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
