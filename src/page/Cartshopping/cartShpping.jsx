import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request1 } from "../../utils/request";
import CartItem from "./cartItems";
import VoucherModal from "./VoucherModels";
import CartFooter from "./CartFooter";
import { getCSRFTokenFromCookie } from "../../Component/Token/getCSRFToken";
// import CartFooter from "./cartFooter";
function CartShopping() {
  const [cartgoods, setCartgoods] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showVoucher, setShowVoucher] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const navigate = useNavigate();
//   const access_token = document.cookie.split("=")[1]; // Lấy token
  const user = useSelector((state) => state.user.user);
  const access_token = getCSRFTokenFromCookie("access_token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request1.get("cart/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        });
        setCartgoods(response.data.cart_goods);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedId([]);
      setSelectedItems([]);
    } else {
      const allItems = cartgoods.map((item) => item.id);
      setSelectedId(allItems);
      setSelectedItems(cartgoods);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleOnclickOrder = () => {
    if (selectedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào");
      return;
    }
    navigate("/order", { state: selectedItems });
  };

  return user == null ? (
    <div className="text-center text-xl font-Montserrat font-semibold my-10">
      <p>
        Bạn chưa đăng nhập{" "}
        <span className="text-primary">
          <Link to="/login">Đăng nhập ngay</Link>
        </span>
      </p>
    </div>
  ) : (
    <div className="test bg-gray-50 font-Montserrat">
      {cartgoods.length > 0 && (
        <>
          <CartFooter
            cartgoods={cartgoods}
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            selectedItems={selectedItems}
            handleOnclickOrder={handleOnclickOrder}
            setShowVoucher={setShowVoucher}
          />
          {cartgoods.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              setCartgoods={setCartgoods}
              setSelectedItems={setSelectedItems}
              setSelectedId={setSelectedId}
              access_token={access_token}
            />
          ))}
          {showVoucher && (
            <VoucherModal setShowVoucher={setShowVoucher} />
          )}
        </>
      )}
    </div>
  );
}

export default CartShopping;
