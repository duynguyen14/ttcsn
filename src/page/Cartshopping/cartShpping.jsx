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
  const [showVoucher, setShowVoucher] = useState(false);
  const [voucher,setVoucher]=useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
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
        console.log(response.data)
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if(cartgoods&&cartgoods.length>0){
      let total = cartgoods.reduce((sum, item) => sum + item.good.price * item.quantity, 0);
      if (selectedVoucher) {
        total -= (total * selectedVoucher.voucher.discount_percentage) / 100; // Áp dụng giảm giá
      }
      setTotalPrice(total);
    }
  }, [cartgoods, selectedVoucher]);
  console.log("2",totalPrice)
  const handleOnclickOrder = () => {
    if(window.confirm("Bạn chắc chắn đặt đơn hàng này")){
      navigate("/order",{state: {cartgoods, totalPrice,selectedVoucher}})
    }
  };
  const handleOnclinkShowVoucher = async () => {
    
    try{
      const response = await request1.get("vouchers/redeemed_vouchers/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Chỉ lấy danh sách các voucher từ dữ liệu trả về
      console.log(response);
      setVoucher(response.data)
    }
    catch(e){
      console.log("Lỗi ",e)
    }
    setShowVoucher(true)
  };
  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
  };
  console.log("1",voucher)
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
      {cartgoods.length > 0 ? (
        <>
          {cartgoods.map((item) => (
            <CartItem
            key={item.id}
            item={item}
            setCartgoods={setCartgoods}
            access_token={access_token}
            />
          ))}
          <CartFooter
            cartgoods={cartgoods}
            handleOnclickOrder={handleOnclickOrder}
            showVoucher={handleOnclinkShowVoucher}
            totalPrice={totalPrice}
            selectedVoucher={selectedVoucher}
          />
          {showVoucher && (
            <VoucherModal showVoucher={handleOnclinkShowVoucher} setShowVoucher={setShowVoucher} voucher={voucher} onSelectVoucher={handleSelectVoucher}/>
          )}
        </>
      )
    :
    (
      <div className="flex justify-center items-center h-[500px] font-Montserrat font-semibold text-sm lg:text-xl">
        Bạn chưa có sản phẩm nào trong giỏ hàng
      </div>
    )}
    </div>
  );
}

export default CartShopping;
