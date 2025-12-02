import { useParams } from 'react-router-dom';

export default  function ProductOverviewPage() {
    const params = useParams();
    const productId = params.Id;

    
  return (
    <div>
        this is overview page for product {productId}
    </div>
  )}