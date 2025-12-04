import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/header";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
	const params = useParams();
	const productId = params.id || params.productId || params.Id;
	const [status, setStatus] = useState("loading");
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
			.then((response) => {
				console.log(response.data);
				setProduct(response.data);
				setStatus("success");
			})
			.catch((error) => {
				console.log(error);
				setStatus("error");
				toast.error("Error fetching product details");
			});
	}, [productId]);

	return (
        <> {status == "success" && (
            <div className="w-full min-h-screen flex flex-col">
			<Header />
			{/* main area fills remaining height and is a horizontal flex container */}
			<main className="flex-1 flex">
				<div className="w-1/2  flex justify-center items-center">
                <ImageSlider images={product.images} />
                </div>
				<div className="w-full md:w-[50%] flex justify-center  md:h-full ">
                    <div className="w-full md:w-[500px] md:h-[600px] flex flex-col  items-center ">
							<h1 className="w-full hidden md:block text-center text-4xl text-secondary font-semibold">
								{product.name}
								{product.altNames.map((altName, index) => {
									return (
										<span key={index} className="text-4xl text-gray-600 ">
											{" "}
											{" | " + altName}
										</span>
									);
								})}
							</h1>
                            {/* product Id */}
							<h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">
								{product.productId}
							</h1>
							<p className="w-full text-center my-2 text-md text-gray-600 font-semibold">
								{product.description}
							</p>

                            {product.labelledPrice > product.price ? (
								<div>
									<span className="text-4xl mx-4 text-gray-500 line-through">
										{product.labelledPrice.toFixed(2)}
									</span>
									<span className="text-4xl mx-4 font-bold text-accent">
										{product.price.toFixed(2)}
									</span>
								</div>
							) : (
								<span className="text-4xl mx-4 font-bold text-accent">
									{product.price.toFixed(2)}
								</span>
							)}
							<div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center mt-4">
								<button
									className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300"
									onClick={() => {
										console.log("Old cart");
										console.log(getCart());
										addToCart(product, 1);
										console.log("New cart");
										console.log(getCart());
									}}
								>
									Add to Cart
								</button>
								<button>Buy Now</button>
							</div>
                    </div>
                </div>
			</main>
		</div>)}
        {status == "loading" && <Loading />}
         </>
		
	);
}