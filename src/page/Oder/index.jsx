import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
function Order({}) {
    const location=useLocation();
    const SelectedItems=location.state;
    console.log("sản phẩm: ",SelectedItems)
    return ( 
        <div>
            Selected items
        </div>
     );
}

export default Order;