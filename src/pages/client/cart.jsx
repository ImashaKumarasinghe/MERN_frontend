import { useState } from "react";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import Header from "../../components/header";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
        <h1 className="text-3xl font-bold text-[var(--color-accent)] text-center mb-10">
          Shopping Cart
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT – CART ITEMS */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {cart.length === 0 && (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty
              </p>
            )}

            {cart.map((item) => (
              <div
                key={item.productId}
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-4
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  gap-6
                  relative
                "
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                {/* Details */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-[var(--color-secondary)]">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Product ID: {item.productId}
                  </p>

                  {/* Price */}
                  <div className="mt-2">
                    {item.labelledPrice > item.price ? (
                      <>
                        <span className="text-gray-400 line-through mr-2">
                          Rs. {item.labelledPrice.toFixed(2)}
                        </span>
                        <span className="text-lg font-bold text-[var(--color-accent)]">
                          Rs. {item.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-[var(--color-accent)]">
                        Rs. {item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    className="
                      w-9 h-9
                      rounded-full
                      bg-[var(--color-accent)]
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-[var(--color-secondary)]
                      transition
                    "
                    onClick={() => {
                      addToCart(item, -1);
                      setCart(getCart());
                    }}
                  >
                    <BiMinus />
                  </button>

                  <span className="text-lg font-semibold text-gray-700">
                    {item.qty}
                  </span>

                  <button
                    className="
                      w-9 h-9
                      rounded-full
                      bg-[var(--color-accent)]
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-[var(--color-secondary)]
                      transition
                    "
                    onClick={() => {
                      addToCart(item, 1);
                      setCart(getCart());
                    }}
                  >
                    <BiPlus />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-lg font-bold text-[var(--color-secondary)] min-w-[120px] text-center md:text-right">
                  Rs. {(item.price * item.qty).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => {
                    removeFromCart(item.productId);
                    setCart(getCart());
                  }}
                  className="
                    absolute
                    top-4
                    right-4
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                    p-2
                    rounded-full
                    transition
                  "
                >
                  <BiTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT – ORDER SUMMARY */}
          {cart.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-600">Items</span>
                <span className="font-semibold">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              </div>

              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  Rs. {getTotal().toFixed(2)}
                </span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-2xl font-bold mb-6">
                <span>Total</span>
                <span className="text-[var(--color-accent)]">
                  Rs. {getTotal().toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                state={{ cart }}
                className="
                  block
                  text-center
                  w-full
                  py-3
                  rounded-2xl
                  bg-[var(--color-accent)]
                  text-white
                  font-semibold
                  hover:bg-[var(--color-secondary)]
                  transition
                "
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
