import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
	const params = useParams();
	const productId = params.id || params.productId || params.Id;
	const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!productId) {
			setStatus("error");
			toast.error("Product ID missing");
			return;
		}

		const load = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
				);
				setProduct(res.data);
				setStatus("success");
			} catch (err) {
				console.error(err);
				setStatus("error");
				toast.error("Error fetching product details");
			}
		};

		load();
	}, [productId]);

	const formatCurrency = (v) =>
		(Number(v) || 0).toLocaleString("en-LK", { style: "currency", currency: "LKR" });

	return (
		<>
			<Header />
			{status === "success" && product && (
				<div className="w-full h-full flex flex-col md:flex-row md:max-h-full md:overflow-y-auto pt-6 px-4 md:px-10 font-sans">
					{/* Mobile title */}
					<h1 className="w-full md:hidden block mb-6 text-center text-3xl text-[var(--color-accent)] font-semibold">
						{product.name}
						{Array.isArray(product.altNames) &&
							product.altNames.length > 0 &&
							product.altNames.map((altName, index) => (
								<span key={index} className="text-lg text-gray-600">
									{" | " + altName}
								</span>
							))}
					</h1>

					{/* Image area */}
					<div className="w-full md:w-1/2 flex justify-center items-start md:items-center mb-6 md:mb-0">
						<div className="w-full max-w-3xl">
							<ImageSlider images={product?.images || []} />
						</div>
					</div>

					{/* Details area */}
					<div className="w-full md:w-1/2 flex justify-center items-start md:h-full">
						<div className="w-full max-w-md md:max-w-lg md:h-[620px] flex flex-col items-center">
							{/* Desktop title */}
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

							{/* Product ID */}
							<div className="w-full text-center my-3 text-sm text-gray-600 font-semibold">
								{product.productId ?? ""}
							</div>

							{/* Description */}
							<p className="w-full text-center my-3 text-md text-gray-600">
								{product.description}
							</p>

							{/* Price */}
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

							{/* Actions */}
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
														productId: product.productId,
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

							{/* Extra info */}
							<div className="w-full mt-6 text-sm text-gray-600 text-center">
								<p>
									<span className="font-semibold">Stock:</span>{" "}
									{product.stock ?? "—"}
								</p>
								<p className="mt-2">
									<span className="font-semibold">Status:</span>{" "}
									{product.isAvailable ? "Available" : "Unavailable"}
								</p>
							</div>
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