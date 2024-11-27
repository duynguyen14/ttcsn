import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { PricetoString } from "../../Component/Translate_Price";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { request1 } from "../../utils/request";
import { getCSRFTokenFromCookie } from "../../Component/Token/getCSRFToken";
function Order({}) {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const SelectedItems = location.state;
  const navigate = useNavigate();
  const [goodOrder,setGoodOrder]=useState(SelectedItems);
  const [address, setAddress] = useState({
    phone: "",
    name: "",
    city:"",
    addressct: "",
  });
  const access_token = getCSRFTokenFromCookie("access_token");
  const [message, setMessage] = useState(false);
  console.log("sản phẩm: ", SelectedItems);
  const total = () => {
    let total = 0;
    if (SelectedItems && SelectedItems.length > 0) {
      SelectedItems.forEach((item) => {
        total += item.quantity * parseInt(item.good.price.split(".")[0]);
      });
    }

    return total;
  };
  const check = () => {
    if (
      address.name === "" ||
      address.phone === "" ||
      address.city===""||
      address.addressct === ""
    ) {
      setMessage(true);
      return false;
    } else {
      setMessage(false);
      return true;
    }
  };
  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  const title = ["Đơn giá", "Số lượng", "Thành tiền"];
  const HandleOnclickOrder = async() => {
    if(!check()){
      alert("Điền đẩy đủ thông tin địa chỉ")
      return
    }
    if (window.confirm("Bạn xác nhận đặt đơn hàng này")) {
      try{
        const respone = await request1.post("order/", 
          {
            shipping_address: address.name+"."+address.phone+"."+address.city+"."+address.addressct,
            goods:SelectedItems
          },
          {headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(respone)
      }
      catch(error){
        console.log("Lỗi ",error)
      }
      alert("Đơn hàng đã được đặt thành công! ");
      setGoodOrder([]);
      navigate("/profile");
    }
  };
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
          <div className="mx-5 my-3 flex gap-x-5 items-center">
            <FaMapMarkerAlt className="text-2xl text-primary" />
            <p className="text-xl font-semibold text-primary">
              Địa chỉ nhận hàng
            </p>
          </div>
          <div className="mx-10 py-5">
            <form className="grid grid-cols-1 gap-y-3 w-full">  
                <input
                  type="text"
                  placeholder="Họ tên người nhận"
                  className={`border-2 border-gray-400 p-2 mb-4 w-[50%] focus:outline-primary ${
                    message === true && address.name === ""
                      ? "outline-red-500 border-red-500 placeholder:text-red-500"
                      : "outline-primary border-primary"
                  }`}
                  value={address.name}
                  name="name"
                  onChange={(e) => handleOnchange(e)}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className={`border-2 border-gray-400 p-2 mb-4 w-[50%] focus:outline-primary ${
                    message === true && address.phone === ""
                      ? "outline-red-500 border-red-500 placeholder:text-red-500"
                      : "outline-primary border-primary"
                  }`}
                  value={address.phone}
                  name="phone"
                  onChange={(e) => handleOnchange(e)}
                />
             
              <input
                type="tel"
                placeholder="Tỉnh thành phố"
                className={`border-2 border-gray-400 p-2 mb-4 w-[60%]  focus:outline-primary ${
                  message === true&& address.city===""
                    ? "outline-red-500 border-red-500 placeholder:text-red-500"
                    : "outline-primary border-primary"
                }`}
                value={address.city}
                name="city"
                onChange={(e)=>handleOnchange(e)}
              />
              <input
                type="text"
                placeholder="Địa chỉ nhận hàng"
                className={`border-2 border-gray-400 p-2 mb-4 w-[60%]  focus:outline-primary ${
                  message === true && address.addressct === ""
                    ? "outline-red-500 border-red-500 placeholder:text-red-500"
                    : "outline-primary border-primary"
                }`}
                value={address.addressct}
                name="addressct"
                onChange={(e) => handleOnchange(e)}
              />
            </form>
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
          <p className="text-red-500">{PricetoString(total()) || 0}đ</p>
        </div>
        <div className="test flex justify-end mr-5 py-10">
          <button
            className="button-primary bg-red-500 px-5 py-3 text-base font-bold hover:bg-red-400"
            onClick={() => HandleOnclickOrder()}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    )
  );
}

export default Order;
