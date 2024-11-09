import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../../../redux/Actions";
import { useEffect } from "react";
function Logout() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(LogoutUser());
        navigate('/');
    },[])
}

export default Logout;