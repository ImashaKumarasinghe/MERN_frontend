import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default  function ProductOverviewPage() {
	const params = useParams();
	const productId = params.id || params.productId || params.Id;
	const [status, setStatus] = useState("loading"); //loading , success , error
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
    <div>
        this is overview page for product {JSON.stringify(productId)}
    </div>
  )}