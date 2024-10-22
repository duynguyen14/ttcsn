import { useParams } from "react-router-dom";
import Features from "./Features";
import ImageProduct from "./ImageProduct";
import More from "./More";
function Product() {
    const {id}=useParams()
    return ( 
    <div>
        <p>{id}</p>
        <ImageProduct/>
        <Features/>
        <More/>
    </div> 
    );
}

export default Product;