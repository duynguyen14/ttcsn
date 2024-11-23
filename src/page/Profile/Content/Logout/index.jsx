import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../../../redux/Actions";
import { useEffect } from "react";
function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LogoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("CSRF_token");
    // deleteCookie('csrftoken');
    navigate("/");
  }, []);
}

export default Logout;
