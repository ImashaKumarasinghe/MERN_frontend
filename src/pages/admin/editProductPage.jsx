import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditProductPage() {
    const location = useLocation()
	const [productId, setProductId] = useState(location.state.productId);
	const [name, setName] = useState(location.state.name);
	const [altNames, setAltNames] = useState(location.state.altNames.join(","));
	const [description, setDescription] = useState(location.state.description);
	const [images, setImages] = useState([]);
	const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
	const [price, setPrice] = useState(location.state.price);
	const [stock, setStock] = useState(location.state.stock);
    const navigate = useNavigate()
    
    console.log(location)

	async function updateProduct() {

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first")
            return
        }

		let imageUrls = location.state.images;

		const promisesArray = [];

		for (let i = 0; i < images.length; i++) {
			promisesArray[i] = mediaUpload(images[i]);
		}
		try {
            if(images.length > 0){
                imageUrls = await Promise.all(promisesArray);
            }
		    
			console.log(imageUrls);

            const altNamesArray = altNames.split(",")

            const product = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                description : description,
                images : imageUrls,
                labelledPrice : labelledPrice,
                price : price,
                stock : stock,
            }
            axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId, product , {
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(() => {
                toast.success("Product updated successfully")
                navigate("/admin/products")
            }).catch((e) => {
                toast.error(e.response.data.message)
            })

		} catch (e) {
			console.log(e);
		}
	}
	return (
		<div className="w-full font-sans flex justify-center py-10">
			<div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-[#e6c4d3]">
				<header className="mb-6 flex items-start justify-between">
					<div>
						<h1 className="text-3xl font-bold text-[#6a2c4b]">Edit Product</h1>
						<p className="text-sm text-gray-500 mt-1">Modify product details and images</p>
					</div>
					<div className="text-sm text-gray-600">
						<span className="font-semibold text-[#6a2c4b]">ID:</span> <span className="ml-2 text-gray-700">{productId}</span>
					</div>
				</header>

				<form className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Product ID (disabled) */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Product ID</label>
						<input
							type="text"
							disabled
							placeholder="Product ID"
							className="w-full rounded-lg border border-gray-200 p-3 bg-gray-50 text-gray-700"
							value={productId}
							onChange={(e) => {
								setProductId(e.target.value);
							}}
						/>
					</div>

					{/* Name */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Name</label>
						<input
							type="text"
							placeholder="Name"
							className="w-full rounded-lg border border-gray-200 p-3"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>

					{/* Alt Names */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Alt Names (comma separated)</label>
						<input
							type="text"
							placeholder="Alt Names"
							className="w-full rounded-lg border border-gray-200 p-3"
							value={altNames}
							onChange={(e) => {
								setAltNames(e.target.value);
							}}
						/>
					</div>

					{/* Description */}
					<div className="col-span-1 md:col-span-2">
						<label className="block text-sm text-gray-600 mb-1">Description</label>
						<textarea
							placeholder="Description"
							className="w-full rounded-lg border border-gray-200 p-3 min-h-[120px] resize-y"
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</div>

					{/* Images */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Upload Images</label>
						<input
							type="file"
							multiple
							className="w-full rounded-lg border border-gray-200 p-2 bg-white"
							onChange={(e) => {
								setImages(e.target.files);
							}}
						/>
						<p className="text-xs text-gray-400 mt-2">You can upload multiple images. Existing images will be kept unless you upload new ones.</p>
					</div>

					{/* Labelled Price */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Labelled Price</label>
						<input
							type="number"
							placeholder="Labelled Price"
							className="w-full rounded-lg border border-gray-200 p-3"
							value={labelledPrice}
							onChange={(e) => {
								setLabelledPrice(e.target.value);
							}}
						/>
					</div>

					{/* Price */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Price</label>
						<input
							type="number"
							placeholder="Price"
							className="w-full rounded-lg border border-gray-200 p-3"
							value={price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
						/>
					</div>

					{/* Stock */}
					<div className="col-span-1">
						<label className="block text-sm text-gray-600 mb-1">Stock</label>
						<input
							type="number"
							placeholder="Stock"
							className="w-full rounded-lg border border-gray-200 p-3"
							value={stock}
							onChange={(e) => {
								setStock(e.target.value);
							}}
						/>
					</div>
				</form>

				{/* Actions */}
				<div className="mt-6 flex items-center justify-end gap-4">
					<Link
						to="/admin/products"
						className="px-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:opacity-90 transition"
					>
						Cancel
					</Link>
					<button
						className="px-6 py-3 rounded-xl bg-[#6a2c4b] text-white font-semibold hover:opacity-95 transition"
						onClick={updateProduct}
					>
						Update Product
					</button>
				</div>
			</div>
		</div>
	);
}