import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { Addresslists } from "../../api/address";
import { PricetoString } from "../../Component/Translate_Price";
function Order({}) {
  const location = useLocation();
  const SelectedItems = location.state;
  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  console.log("sản phẩm: ", SelectedItems);
  const total=()=>{
    let total=0;
    if(SelectedItems&&SelectedItems.length>0){
        SelectedItems.forEach(item=>{
            total+=item.number*item.newprice;
        })
    }
    
    return total;
  }
  const title = ["Đơn giá", "Số lượng", "Thành tiền"];
  const HandleOnclickOrder=()=>{
    if(window.confirm("Bạn xác nhận đặt đơn hàng này")){
        alert("Đơn hàng đã được đặt thành công! ")
        navigate("/profile");
    }
  }
  return (
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
        <div className="mx-5 text-base font-semibold flex gap-x-10 items-center">
          <div>
            {Addresslists[0].name}&ensp; (&ensp;{Addresslists[0].phone}
            &ensp;)&ensp;
            {Addresslists[0].address}
          </div>
          <div className="text-sm text-red-500 px-1 py-1 border-[1px] border-red-500">
            <p>Mặc định</p>
          </div>
          <div className="text-base text-blue-500 cursor-pointer">
            <p onClick={() => setShow(true)}>Thay đổi</p>
          </div>
        </div>
      </div>
      <div className="bg-white test">
        <div className="flex items-center my-5 py-5">
          <p className="mx-5 font-semibold text-xl md:basis-[60%]">Sản phẩm</p>
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
        {SelectedItems&&SelectedItems.map((item, index) => {
          return (
            <div key={index} className="flex items-center py-5 border-[1px] border-gray-100">
                {/* ảnh sản phẩm */}
                <div className="flex basis-[40%] md:basis-[60%] pl-5">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt=""
                      className=" w-[50px] h-[50px] lg:w-[150px] lg:h-[150px]"
                    />
                    <p className="font-semibold text-[8px] md:text-sm lg:text-base px-1">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className="basis-[60%] md:basis-[40%] flex items-center text-[8px] md:text-xs lg:text-base justify-between mx-2">
                  {/* giá cả */}
                  <p className="text-red-500 font-semibold">{PricetoString(item.newprice)}</p>
                  {/* số lượng sản phẩm */}
                  <div className="font-bold">
                    <p className="">
                      {item.number}
                    </p>
                  </div>
                  {/* thành tiền */}
                  <div className="text-red-500 font-semibold">
                    {PricetoString(item.number*item.newprice)}đ
                  </div>
                </div>
            </div>
          );
        })}
      </div>
      <div className=" test py-10 px-3 my-10 font-bold flex justify-between bg-white">
            <p>
                Tổng tiền:
            </p>
            <p className="text-red-500">
                {PricetoString(total())}đ
            </p>
        </div>
        <div className="test flex justify-end mr-5 py-10">
           <button className="button-primary bg-red-500 px-5 py-3 text-base font-bold hover:bg-red-400" onClick={()=>HandleOnclickOrder()}>
                Đặt hàng
           </button>
        </div>
    </div>
  );
}

export default Order;
