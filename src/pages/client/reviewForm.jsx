import { useState } from "react";
import axios from "axios";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/reviews", {
      name,
      rating,
      comment,
    });
    alert("Review submitted!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Leave a Review</h1>

      <form onSubmit={submitReview}>
        
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 w-full mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        {/* ⭐ STAR SELECTOR */}
        <select
          className="border p-3 w-full mb-4"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          placeholder="Write your review..."
          className="border p-3 w-full mb-4"
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="bg-accent text-white px-6 py-3 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
}
