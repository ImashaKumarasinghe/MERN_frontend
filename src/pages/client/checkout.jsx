import { useState } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Header from "../../components/header";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const changeQty = (index, qty) => {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) return removeFromCart(index);
    const newCart = [...cart];
    newCart[index].qty = newQty;
    setCart(newCart);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to place order");
    if (!phoneNumber || !address) return toast.error("Fill all fields");

    const orderInfo = {
      products: cart.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),
      phone: phoneNumber,
      address,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        orderInfo,
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Order placed successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error placing order");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-gray-50 flex flex-col md:flex-row gap-8 px-4 md:px-16 pt-20">
        {/* Left: Product List */}
        <div className="flex-1 flex flex-col gap-4 items-center">
          {cart.length === 0 && (
            <p className="text-center text-gray-500 text-lg mt-10">
              Your cart is empty.
            </p>
          )}
          {cart.map((item, index) => (
            <div
              key={item.productId}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl p-4 items-center justify-center gap-4 w-[80%] md:w-[500px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl"
              />
              <div className="flex-1 flex flex-col gap-1 items-center justify-center text-center">
                <h3 className="text-lg font-semibold text-[var(--color-secondary)]">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">{item.productId}</p>
                <div className="flex items-center gap-2 justify-center">
                  {item.labelledPrice > item.price && (
                    <span className="line-through text-gray-400">
                      {item.labelledPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[var(--color-accent)] font-bold">
                    {item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  className="bg-[var(--color-accent)] text-white p-2 rounded-full hover:bg-[var(--color-secondary)] transition-all"
                  onClick={() => changeQty(index, -1)}
                >
                  <BiMinus size={18} />
                </button>
                <span className="text-lg font-semibold">{item.qty}</span>
                <button
                  className="bg-[var(--color-accent)] text-white p-2 rounded-full hover:bg-[var(--color-secondary)] transition-all"
                  onClick={() => changeQty(index, 1)}
                >
                  <BiPlus size={18} />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-[var(--color-secondary)] font-semibold text-lg">
                Rs. {(item.price * item.qty).toFixed(2)}
              </div>

              {/* Remove Item */}
              <button
                className="text-red-600 hover:text-white hover:bg-red-600 rounded-full p-2 transition-all"
                onClick={() => removeFromCart(index)}
              >
                <BiTrash size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full md:w-[360px] bg-white shadow-xl rounded-2xl p-6 sticky top-24 h-fit">
          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">
            Order Summary
          </h2>
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <p className="text-lg font-semibold text-[var(--color-secondary)] mb-4">
            Total: <span className="text-[var(--color-accent)]">{getTotal().toFixed(2)}</span>
          </p>
          <button
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-secondary)] text-white font-bold py-3 rounded-xl transition-colors"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
