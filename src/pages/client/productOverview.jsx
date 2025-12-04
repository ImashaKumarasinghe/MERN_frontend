import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/header";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";

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
				<div className="w-1/2 flex flex-col h-full">
                </div>
			</main>
		</div>)}
        {status == "loading" && <Loading />}
         </>
		
	);
}