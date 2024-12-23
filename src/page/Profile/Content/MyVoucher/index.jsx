import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { UpdateUser } from "../../../../redux/Actions";
import { request1 } from "../../../../utils/request";
import { getCSRFTokenFromCookie } from "../../../../Component/Token/getCSRFToken";

function Myvoucher() {
  const UserInfor = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loyaltyPoint, setLoyaltyPoint] = useState(UserInfor?.loyaltyPoints || 0);
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const access_token = getCSRFTokenFromCookie("access_token");
  useEffect(()=>{
    const fetch=async()=>{
      try{
        const respone= await request1.get("user/profile/",{
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        console.log(respone);
        localStorage.setItem("user",JSON.stringify(respone.data.user));
        setLoyaltyPoint(respone.data.user.loyaltyPoints)
      }
      catch(e){
        console.log("Lỗi",e)
      }
    }
    fetch();
  },[])
  const handleOnclickDoi = async (item) => {
    if (loyaltyPoint < item.points_required) {
      alert("Bạn chưa đủ điểm để đổi voucher này");
      return;
    }
    try {
      
      const response = await request1.post(
        `vouchers/redeem/${item.id}/`, // voucher_id nằm trong URL
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      // Kiểm tra trạng thái và phản hồi từ server
      if (response.status === 201) {
        alert("Đổi voucher thành công");
        const updatedPoints = loyaltyPoint - item.points_required;
        setLoyaltyPoint(updatedPoints);
        dispatch(UpdateUser({ loyaltyPoints: updatedPoints }));
      } else if (response.data && response.data.detail) {
        // Hiển thị chi tiết lỗi từ backend
        alert(response.data.detail);
      } else {
        alert("Đã xảy ra lỗi không xác định.");
      }
    } catch (error) {
      console.error("Lỗi khi đổi voucher: ", error);
      
      // Kiểm tra nếu error.response tồn tại và có thông tin lỗi
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail); // Hiển thị chi tiết lỗi từ backend
      } else {
        alert("Đã xảy ra lỗi khi đổi voucher.");
      }
    }
  };
  

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await request1.get("vouchers/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        setVouchers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách voucher:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVouchers();
  }, [access_token]);

  if (isLoading) {
    return <p>Đang tải voucher...</p>;
  }

  return (
    <div className="font-Montserrat">
      <div className="text-base lg:text-xl font-bold lg:mx-10 lg:my-10 text-primary">
        Điểm của bạn: {loyaltyPoint} (Tích nhiều điểm để nhận voucher)
      </div>

      <div className="lg:mx-2 lg:my-5">
        {vouchers.length > 0 ? (
          vouchers.map((item) => (
            <li
              key={item.id}
              className="list-none px-2 py-3 my-5 border-[1.5px] border-gray-200 "
            >
              <div className="grid grid-cols-3 w-full items-center gap-x-5 lg:gap-x-20 md:mx-5">
                <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-primary/60 items-center justify-center block basis-[30%]">
                  <div className="text-center flex justify-center items-center h-[60%]">
                    <FiShoppingCart className="text-3xl lg:text-6xl text-gray-100 w-full" />
                  </div>
                  <p className="text-xs lg:text-sm font-semibold text-gray-100 text-center">
                    {item.title}
                  </p>
                </div>
                <p className="text-xs lg:text-base font-semibold text-center">
                  {item.title}
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
                <p>Yêu cầu {item.points_required} điểm</p>
              </div>
            </li>
          ))
        ) : (
          <p>Không có voucher nào để đổi.</p>
        )}
      </div>
    </div>
  );
}

export default Myvoucher;