import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PricetoString } from "../../Component/Translate_Price";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { request1 } from "../../utils/request";
import { getCSRFTokenFromCookie } from "../../Component/Token/getCSRFToken";
import AddressOD from "./AddresOD";
function Order({}) {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const {itemsToOrder, totalPrice, selectedVoucher } = location.state;
  const navigate = useNavigate();
  const [goodOrder, setGoodOrder] = useState(itemsToOrder);

  const [selectAddress, setSelectAddress] = useState(null);
  const [address, setAddress] = useState([]);
  // console.log("1", typeof itemsToOrder);
  // console.log("2", location.state);
  const [showAddress, setShowAddress] = useState(false);
  const access_token = getCSRFTokenFromCookie("access_token");
  const title = ["Đơn giá", "Số lượng", "Thành tiền"];
  useEffect(() => {
    setGoodOrder(itemsToOrder); // Gán giá trị mới cho goodOrder khi itemsToOrder thay đổi
    console.log("this is good in cart", itemsToOrder);
    console.log("this is good in order: ", goodOrder);
    console.log("this is voucher for this order:" , selectedVoucher);
  }, [itemsToOrder]);
  const HandleOnclickOrder = async () => {
    if (!selectAddress) {
      alert("Bạn chưa thiết lập địa chỉ giao hàng");
      return;
    }
    if (window.confirm("Bạn xác nhận đặt đơn hàng này")) {
      const addressShip = `${selectAddress.name}.${selectAddress.phone}.${selectAddress.city}.${selectAddress.addressct}`;
      try {
        const respone = await request1.post(
          "order/",
          {
            shipping_address: addressShip,
            goods_id: itemsToOrder.map((item) => item.id),
            voucherUserId:  (selectedVoucher)? selectedVoucher.id : null,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setGoodOrder([]);
        navigate("/profile/");
      } catch (error) {
        console.log("Lỗi ", error);
      }
      // if(selectedVoucher){
      //   handleVoucherUsage();
      // }
      
    }
  };
  const handleOnclickShowAddress = () => {
    setShowAddress(true);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const respone = await request1.get("user/addresses/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(respone.data);
        setAddress(respone.data);
      } catch (e) {
        console.log("Lỗi", e);
      }
    };
    fetch();
  }, []);
  const handleSelectAddress = (item) => {
    setSelectAddress(item);
  };
 
  // const handleVoucherUsage = async () => {
  //   if (selectedVoucher) {
  //     try {
  //       const response = await request1.patch(
  //         `vouchers/redeemed_vouchers/${selectedVoucher.voucher.id}`, 
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //             "Content-Type": "application/json",
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       console.log("Voucher đã được sử dụng:", response);
  //       // Sau khi sử dụng voucher thành công, bạn có thể cập nhật lại voucher ở frontend hoặc trạng thái
  //     } catch (error) {
  //       console.log("Lỗi khi sử dụng voucher", error);
  //     }
  //   }
  // }; 
  return user == null ? (
    <div>
      <div className="text-center text-xl font-Montserrat font-semibold my-10">
        <p>
          Bạn chưa đăng nhập{" "}
          <span className="text-primary">
            <Link to={"/login"}>Đăng nhập ngay</Link>
          </span>
        </p>
      </div>
    </div>
  ) : (
    goodOrder && (
      <div className="font-Montserrat bg-gray-100">
        {/*  tiêu đề */}
        <div className="border-y-[1px] border-gray-100 bg-white">
          <p className=" test my-5 md:text-xl font-bold text-primary px-2 py-5">
            Thanh toán
          </p>
        </div>
        {/*  địa chỉ nhận hàng */}
        <div className="test py-5 my-5 border-[1px] border-gray-100 bg-white">
          <div className="mx-5 my-3 flex justify-between items-center">
            <div className="flex gap-x-5 items-center ">
              <FaMapMarkerAlt className="text-2xl text-primary" />
              <p className="text-xl font-semibold text-primary">
                Địa chỉ nhận hàng
              </p>
            </div>
            <div className="font-Montserrat font-semibold text-blue-500 mx-5">
              {address.length > 0 ? (
                <p
                  className="cursor-pointer"
                  onClick={() => handleOnclickShowAddress()}
                >
                  Chọn địa chỉ nhận hàng của bạn
                </p>
              ) : (
                <Link to={"/profile"}>
                  Bạn chưa thiết lập địa chỉ nhận hàng thiết lập ngay
                </Link>
              )}
              {selectAddress && (
                <p className="text-primary text-center">
                  (1 địa chỉ đã được chọn)
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white test">
          <div className="flex items-center my-5 py-5">
            <p className="mx-5 font-semibold text-xl md:basis-[60%]">
              Sản phẩm
            </p>
            <div className="flex justify-between md:basis-[40%] mx-2 font-semibold">
              {title.map((item) => {
                return (
                  <li key={item} className="list-none">
                    {item}
                  </li>
                );
              })}
            </div>
          </div>
          {goodOrder &&
            goodOrder.map((item, index) => {
              const good = item.good;
              return (
                <div
                  key={index}
                  className="flex items-center py-5 border-[1px] border-gray-100"
                >
                  {/* ảnh sản phẩm */}
                  <div className="flex basis-[40%] md:basis-[60%] pl-5">
                    <div className="flex items-center">
                      <img
                        src={`http://127.0.0.1:8888${good.image}`}
                        alt=""
                        className=" w-[50px] h-[50px] lg:w-[150px] lg:h-[150px]"
                      />
                      <p className="font-semibold text-[8px] md:text-sm lg:text-base px-1">
                        {good.goodName}
                      </p>
                    </div>
                  </div>
                  <div className="basis-[60%] md:basis-[40%] flex items-center text-[8px] md:text-xs lg:text-base justify-between mx-2">
                    {/* giá cả */}
                    <p className="text-red-500 font-semibold">
                      {PricetoString(good.price.split(".")[0])}
                    </p>
                    {/* số lượng sản phẩm */}
                    <div className="font-bold">
                      <p className="">{item.quantity}</p>
                    </div>
                    {/* thành tiền */}
                    <div className="text-red-500 font-semibold">
                      <p>
                        {PricetoString(
                          parseInt(good.price.split(".")[0]) * item.quantity
                        )}
                        đ
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className=" test py-10 px-3 my-10 font-bold flex justify-between bg-white">
          <p>Tổng tiền:</p>
          <div className="flex justify-center items-center">
            <div className="text-left">
              {selectedVoucher && (
                <p className="text-primary font-semibold text-sm">
                  {selectedVoucher.voucher.title}
                  &nbsp;đã được áp dụng
                </p>
              )}
              <p className="text-red-500 pr-5 pl-48">
                {PricetoString(totalPrice) || 0}đ
              </p>
            </div>
          </div>
        </div>
        <div className="test flex justify-end mr-5 py-10">
          <button
            className="button-primary bg-red-500 px-5 py-3 text-base font-bold hover:bg-red-400"
            onClick={() => HandleOnclickOrder()}
          >
            Đặt hàng
          </button>
        </div>
        <div>
          {showAddress && (
            <AddressOD
              onChange={handleOnclickShowAddress}
              setShowAddress={setShowAddress}
              handleSelectAddress={handleSelectAddress}
              address={address}
              selectAddress={selectAddress}
            />
          )}
        </div>
      </div>
    )
  );
}

export default Order;
