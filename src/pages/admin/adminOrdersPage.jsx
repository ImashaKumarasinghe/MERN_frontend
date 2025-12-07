// Updated AdminOrdersPage with bolder fonts, improved color, increased modal width
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";
import toast from "react-hot-toast";

if (typeof document !== "undefined") {
  try {
    Modal.setAppElement("#root");
  } catch (e) {}
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login first");
          setIsLoading(false);
          return;
        }

        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/orders",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        const data = res.data;
        const arr =
          Array.isArray(data) && data
            ? data
            : Array.isArray(data?.orders)
            ? data.orders
            : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.result)
            ? data.result
            : [];

        setOrders(arr);
      } catch (err) {
        alert(
          "Error fetching orders: " +
            (err?.response?.data?.message || err.message || "Unknown error")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatCurrency = (value) =>
    (Number(value) || 0).toLocaleString("en-LK", {
      style: "currency",
      currency: "LKR",
    });

  return (
    <div className="w-full font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-10 border border-[#e6c4d3]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#6a2c4b] tracking-wide">
            Order Details
          </h2>
          <div className="bg-[#f5d8e4] px-6 py-3 rounded-xl shadow text-[#6a2c4b] font-semibold text-xl">
            Total Orders: {orders.length}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="h-12 w-12 border-4 border-[#d18aa5] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-[#6a2c4b] mt-4 text-lg font-medium">Loading orders…</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[18px] border-separate border-spacing-y-3">
              <thead>
                <tr className="bg-[#f5d8e4] text-[#6a2c4b] text-lg font-semibold">
                  <th className="p-4 rounded-l-xl">Order ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 rounded-r-xl text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-gray-600 bg-white rounded-xl shadow"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr
                      key={order._id ?? index}
                      onClick={() => {
                        setActiveOrder(order);
                        setIsModalOpen(true);
                      }}
                      className="bg-white shadow-md rounded-xl cursor-pointer hover:scale-[1.02] transition p-4"
                    >
                      <td className="p-4 text-[#2A1E28] font-bold text-lg">
                        {order.orderId ?? order._id ?? `#${index + 1}`}
                      </td>

                      <td className="p-4 text-[#6a2c4b] font-semibold text-lg">
                        {order.name ?? "—"}
                      </td>

                      <td className="p-4 text-gray-700 font-medium text-lg">
                        {order.email ?? "—"}
                      </td>

                      <td className="p-4 text-[#2A1E28] font-medium text-lg">
                        {order.phone ?? "—"}
                      </td>

                      <td className="p-4 text-right text-[#6a2c4b] font-bold text-lg">
                        {formatCurrency(order.total)}
                      </td>

                      <td className="p-4 text-gray-700 font-medium text-lg">
                        {order.date
                          ? new Date(order.date).toLocaleDateString("en-GB")
                          : order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-GB")
                          : "—"}
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            (order.status ?? "").toLowerCase() === "completed"
                              ? "bg-green-200 text-green-900"
                              : (order.status ?? "").toLowerCase() === "pending"
                              ? "bg-yellow-200 text-yellow-900"
                              : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          {((order.status ?? "—").charAt(0) || "").toUpperCase() +
                            ((order.status ?? "—").slice(1) || "")}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL (Wider Size) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white rounded-xl shadow-xl w-[40%] max-w-6xl h-auto p-6 justify-center item-center"
        overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-50"
      >
        {activeOrder ? (
          <div className="space-y-6 text-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-[#6a2c4b]">Order Details</h2>
                <p className="text-gray-600 mt-1 font-medium">
                  {(activeOrder.orderId ?? activeOrder._id) || "—"}
                </p>
              </div>

              <div className="text-right">
                <div className="text-gray-600 text-sm font-semibold">Total</div>
                <div className="text-[#6a2c4b] text-2xl font-bold">
                  {formatCurrency(activeOrder.total)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-[#6a2c4b]">Name:</span> {activeOrder.name}
                </p>
                <p>
                  <span className="font-semibold text-[#6a2c4b]">Email:</span> {activeOrder.email}
                </p>
                <p>
                  <span className="font-semibold text-[#6a2c4b]">Phone:</span> {activeOrder.phone}
                </p>
                <p>
                  <span className="font-semibold text-[#6a2c4b]">Address:</span> {activeOrder.address}
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Status:</span>{" "}
											<span
												className={`font-bold ${
													activeOrder.status === "pending"
														? "text-yellow-500"
														: activeOrder.status === "completed"
														? "text-green-600"
														: "text-red-500"
												}`}
											>
												{activeOrder.status.toUpperCase()}
											</span>
                      <select
												onChange={async (e) => {
													const updatedValue = e.target.value;
													try {
														const token = localStorage.getItem("token");
														await axios.put(
															import.meta.env.VITE_BACKEND_URL +
																"/api/orders/" +
																activeOrder.orderId +
																"/" +
																updatedValue,
															{},
															{
																headers: {
																	Authorization: "Bearer " + token,
																},
															}
														);
														
														setIsLoading(true);
														const updatedOrder = {...activeOrder};
														updatedOrder.status = updatedValue;
														setActiveOrder(updatedOrder);

													} catch (e) {
														toast.error("Error updating order status")
														console.log(e)
													}
												}}
											>
												<option selected disabled>
													Change status
												</option>
												<option value="pending">Pending</option>
												<option value="completed">Completed</option>
												<option value="cancelled">Cancelled</option>
												<option value="returned">Returned</option>
											</select>
                </p>

                <p>
                  <span className="font-semibold text-[#6a2c4b]">Date:</span> {" "}
                  {activeOrder.date
                    ? new Date(activeOrder.date).toLocaleDateString("en-GB")
                    : activeOrder.createdAt
                    ? new Date(activeOrder.createdAt).toLocaleDateString("en-GB")
                    : "—"}
                </p>

                <p>
                  <span className="font-semibold text-[#6a2c4b]">Labelled Total:</span> {" "}
                  {formatCurrency(activeOrder.labelledTotal)}
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#6a2c4b] mt-6">Products</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-lg">
                <thead className="bg-[#6a2c4b] text-white">
                  <tr>
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Qty</th>
                    <th className="py-3 px-4">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {(activeOrder.products || []).map((item, idx) => {
                    const prod = item.productInfo || item.product || {};
                    const price = Number(prod.price) || Number(item.price) || 0;
                    const qty = Number(item.quantity) || 0;
                    const subtotal = price * qty;
                    const imgSrc = prod.images?.[0] || prod.image || "";

                    return (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-[#f7edf2]" : "bg-gray-100"}
                      >
                        <td className="py-3 px-4">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              className="w-16 h-16 rounded-xl object-cover shadow"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-500">
                              No Image
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 font-semibold text-[#6a2c4b] text-lg">
                          {prod.name || item.name || "—"}
                        </td>

                        <td className="py-3 px-4 font-medium">{formatCurrency(price)}</td>

                        <td className="py-3 px-4 font-medium">{qty}</td>

                        <td className="py-3 px-4 font-bold text-[#6a2c4b]">
                          {formatCurrency(subtotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-[#6a2c4b] text-white rounded-xl font-semibold text-lg hover:opacity-90"
              >
                Close
              </button>

              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-[#8b4d6d] text-white rounded-xl font-semibold text-lg hover:opacity-90"
              >
                Print
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}