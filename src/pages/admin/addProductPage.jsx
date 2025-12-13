import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
	const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [labelledPrice, setLabelledPrice] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");
	const navigate = useNavigate();

	async function AddProduct() {
		const token = localStorage.getItem("token");
		if (!token) return toast.error("Please login first");

		if (images.length <= 0) return toast.error("Please select at least one image");

		const promisesArray = Array.from(images).map((img) => mediaUpload(img));

		try {
			const imageUrls = await Promise.all(promisesArray);

			const altNamesArray = altNames.split(",").map((n) => n.trim());

			const product = {
				productId,
				name,
				altNames: altNamesArray,
				description,
				images: imageUrls,
				labelledPrice: Number(labelledPrice),
				price: Number(price),
				stock: Number(stock),
			};

			await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, product, {
				headers: { Authorization: "Bearer " + token },
			});

			toast.success("Product added successfully");
			navigate("/admin/products");
		} catch (e) {
			console.error(e);
			toast.error(e.response?.data?.message || "Error adding product");
		}
	}

	return (
		<div className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-12 px-4">
			<h1 className="text-3xl font-bold text-[var(--color-accent)] mb-8">Add New Product</h1>

			<div className="w-full max-w-xl flex flex-col gap-4">
				{/* Basic Fields */}
				<input
					type="text"
					placeholder="Enter Product ID"
					className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
					value={productId}
					onChange={(e) => setProductId(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Enter Product Name"
					className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Enter Alternate Names (comma separated)"
					className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
					value={altNames}
					onChange={(e) => setAltNames(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Enter Product Description"
					className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input
					type="file"
					multiple
					className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
					onChange={(e) => setImages(e.target.files)}
				/>

				{/* Price & Stock Fields */}
				<div className="flex gap-4">
					<input
						type="number"
						placeholder="Labelled Price (Rs)"
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] appearance-none"
						value={labelledPrice}
						onChange={(e) => setLabelledPrice(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Price (Rs)"
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] appearance-none"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Stock Quantity"
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] appearance-none"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-center gap-4 mt-4">
					<Link
						to="/admin/products"
						className="bg-red-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors"
					>
						Cancel
					</Link>
					<button
						className="bg-[var(--color-accent)] text-white font-bold py-3 px-6 rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
						onClick={AddProduct}
					>
						Add Product
					</button>
				</div>
			</div>
		</div>
	);
}
