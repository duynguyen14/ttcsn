import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Vouchers, VoucherUsers } from "../../../../api/vouchers";
import { UpdateUser } from "../../../../redux/Actions";
import { request1 } from "../../../../utils/request";
import { getCSRFTokenFromCookie } from "../../../../Component/Token/getCSRFToken";
function Myvoucher() {
  const UserInfor = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loyaltyPoint, setLoyaltyPoint] = useState(UserInfor.loyaltyPoints);
  const [user, setUser] = useState();
  const [quantity, setQuantity] = useState(0);
  const access_token = getCSRFTokenFromCookie("access_token");
  const handleOnclickDoi = (item) => {
    let score = 1000 * item.promotionalPercentage;
    if (UserInfor.loyaltyPoints < score) {
      alert("Bạn chưa đủ điểm để đổi voucher này");
      return;
    } else {
      setQuantity(UserInfor.loyaltyPoints / score);
      console.log("số lượng ", quantity);
      alert("Đổi voucher thành công");
      setLoyaltyPoint(loyaltyPoint - score);
      VoucherUsers.push(item);
      //console.log("Voucher user : ",VoucherUsers);
      dispatch(UpdateUser({ loyaltyPoints: loyaltyPoint }));
    }
  };
  //console.log("thông tin người dùng : ",UserInfor);
  console.log(user)
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await request1.get("user/profile/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log("dữ liệu ", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="font-Montserrat">
      {user && (
        <div className="text-base lg:text-xl font-bold lg:mx-10 lg:my-10 text-primary">
          Điểm của bạn {user.loyaltyPoints} (Tích nhiều điểm để nhận voucher)
        </div>
      )}
      {/*  voucher đổi điểm */}
      <div className="lg:mx-2 lg:my-5">
        {Vouchers.map((item, index) => {
          return (
            <li
              key={item.id}
              className="list-none px-2 py-3 my-5 border-[1.5px] border-gray-200 "
            >
              <div className="grid grid-cols-3 w-full items-center gap-x-5 lg:gap-x-20 md:mx-5">
                <div className=" w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-primary/60 items-center justify-center block basis-[30%]">
                  <div className="text-center flex justify-center items-center h-[60%]">
                    <FiShoppingCart className=" text-3xl lg:text-6xl text-gray-100 w-full" />
                  </div>
                  <p className="text-xs lg:text-sm font-semibold text-gray-100 text-center">
                    Giảm giá hàng điện tử
                  </p>
                </div>
                <p className=" text-xs lg:text-base font-semibold text-center">
                  {item.voucherName}
                </p>
                <div className="ml-4 md:ml-10">
                  <button
                    className="button-primary bg-primary px-2 py-2 lg:px-3 lg:py-3 text-xs lg:text-base font-semibold hover:bg-primary/60"
                    onClick={() => handleOnclickDoi(item)}
                  >
                    Đổi điểm
                  </button>
                </div>
              </div>
              <div className="text-end text-xs lg:text-base font-semibold text-red-500">
                <p>Yêu cầu {1000 * item.promotionalPercentage} điểm</p>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}
export default Myvoucher;
