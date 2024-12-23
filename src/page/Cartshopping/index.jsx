import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiPlusSm } from "react-icons/hi";
import { RiSubtractFill } from "react-icons/ri";
import { request1 } from "../../utils/request";
import { PricetoString } from "../../Component/Translate_Price";
import { getCSRFTokenFromCookie } from "../../Component/Token/getCSRFToken";
import { useSelector } from "react-redux";

import { FiShoppingCart } from "react-icons/fi";
function Cartshopping() {
  const [selectedItems, setSlectedItem] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showVoucher, setShowvoucher] = useState(false);
  const navigate = useNavigate();
  const title1s = ["Đơn giá", "Số lượng", "Thao tác"];
  const [cartgoods, setCartgoods] = useState([]);
  const access_token = getCSRFTokenFromCookie("access_token");
  const [isAllSelected, setIsAllSelected] = useState(false); // Thêm trạng thái này
  const user = useSelector((state) => state.user.user);
  const [vouchers , setVouchers] = useState([]);

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);  // Tổng tiền đã giảm giá

  // console.log("người dùng",user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await request1.get("cart/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setCartgoods(respone.data.cart_goods);
      } catch (error) {
        console.log("Lỗi", error);
      }
    };
    fetchData();
  }, []);

  const handleClickplus = async (id, item) => {
    try {
      const response = await request1.patch(
        `cart/update/${id}/`,
        { quantity: item.quantity + 1 },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Đảm bảo token đúng
            "Content-Type": "application/json",
          },
          withCredentials: true, // Cho phép gửi cookie
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setCartgoods((pre) =>
      pre.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else return item;
      })
    );

    setSlectedItem((pre) =>
      pre.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else return item;
      })
    );
  };
  const total = () => {
    let tong = 0;
    if (selectedItems.length > 0) {
      selectedItems.forEach((i) => {
        tong += i.quantity * i.good.price;
      });
    }
    return tong;
  };
  
  useEffect(() => {
    if (cartgoods.length > 0 && selectedId.length === cartgoods.length) {
      setIsAllSelected(true); // Nếu tất cả sản phẩm đều được chọn
    } else {
      setIsAllSelected(false); // Nếu không phải tất cả sản phẩm đều được chọn
    }
  }, [selectedId, cartgoods]);
  const handleClicksubtraction = async (id, item) => {
    if (item.quantity === 0) {
      if (window.confirm("Bạn có chắc chắn xóa sản phẩm này khỏi giỏ")) {
        alert("Xóa sản phẩm thành công");
        setCartgoods((pre) => pre.filter((item) => item.id !== id));
        return;
      }
    }
    try {
      const response = await request1.patch(
        `cart/update/${id}/`,
        { quantity: item.quantity - 1 },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // Đảm bảo token đúng
            "Content-Type": "application/json",
          },
          withCredentials: true, // Cho phép gửi cookie
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setCartgoods((pre) =>
      pre.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity === 0 ? 0 : item.quantity - 1,
          };
        } else return item;
      })
    );
    setSlectedItem((pre) =>
      pre.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity === 0 ? 0 : item.quantity - 1,
          };
        } else return item;
      })
    );
  };
  const handleOnclickDelete = async (id, item) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này")) {
      try {
        const response = await request1.delete(`cart/remove/${id}/`, {
          headers: {
            Authorization: `Bearer ${access_token}`, // Đảm bảo token đúng
            "Content-Type": "application/json",
          },
          withCredentials: true, // Cho phép gửi cookie
        });
        console.log(response);
        setCartgoods((pre) => pre.filter((item) => item.id !== id));
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        console.log("Lỗi ", error);
      }
    }
  };
  const handleOnchangeInput = (id, item) => {
    if (selectedId.includes(id)) {
      setSelectedId(selectedId.filter((i) => i !== id));
      setSlectedItem(selectedItems.filter((Item) => Item.id !== id));
    } else {
      setSelectedId((prev) => [...prev, id]);
      setSlectedItem((prev) => [...prev, item]);
    }
  };
  useEffect(() => {
    total(); // Gọi hàm total mỗi khi selectedItems thay đổi
  }, [selectedItems]);
  const handleSelectAll = () => {
    if (isAllSelected) {
      // Nếu đã chọn tất cả, bỏ chọn tất cả
      setSelectedId([]);
      setSlectedItem([]);
    } else {
      // Nếu chưa chọn tất cả, chọn tất cả sản phẩm
      const allItems = cartgoods.map((item) => item.id);
      setSelectedId(allItems);
      setSlectedItem(cartgoods);
    }
    setIsAllSelected(!isAllSelected); // Đổi trạng thái là đã chọn tất cả hoặc chưa
  };
  const handleOnclickOrder = () => {
    if (selectedItems.length == 0) {
      alert("Bạn chưa chọn sản phẩm nào");
      return;
    } else {
      navigate("/order", { state: selectedItems, totalAmount });
    }
  };
  const handleOnclinkShowVoucher = async () => {
    // call API
    try{
      const response = await request1.get("vouchers/redeemed_vouchers/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Chỉ lấy danh sách các voucher từ dữ liệu trả về
      const vouchers = response.data.map((item) => item.voucher);
      console.log(response.data);
      console.log(vouchers); // Debug xem kết quả
      setVouchers(vouchers); // Cập nhật state với danh sách voucher
    }
    catch(e){
      console.log("Lỗi ",e)
    }
    setShowvoucher(true);
  };

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    // Tính lại tổng tiền sau khi áp dụng voucher
    let discount = (voucher.discount_percentage / 100) * total();
    setTotalAmount(total() - discount);
    setShowvoucher(false);  // Ẩn modal
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
    <div>
      <div className="test bg-gray-50 font-Montserrat">
        {cartgoods.length > 0 && (
          <div className="sticky top-[95vh] md:top-[90vh] h-[5vh] md:h-[10vh] p-1 md:p-4 bg-white border-[1.5px] border-gray-300 z-10 flex items-center text-[8px] md:text-base font-semibold justify-around whitespace-nowrap">
            <div className="md:basis-25% flex gap-x-2 ">
              <input
                type="checkbox"
                name=""
                id=""
                className="md:scale-[200%]"
                onChange={handleSelectAll}
                checked={isAllSelected}
              />
              <div>
                <p className="md:flex block">Chọn tất cả</p>
                <p>({cartgoods && cartgoods.length} sản phẩm)</p>
              </div>
            </div>
            {/* voucher */}
            <div className="md:basis-30% block lg:flex mx-6 gap-x-4">
              <p>Voucher</p>
              <p
                className="text-blue-700 cursor-pointer"
                onClick={() => handleOnclinkShowVoucher()}
              >
                Chọn hoặc nhập mã
              </p>
            </div>
            <div
              className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all duration-500 ease-in-out ${
                showVoucher
                  ? "opacity-100 block translate-x-0"
                  : "opacity-0 hidden translate-x-100"
              }`}
            >
              <div className="w-[800px] h-[700px] bg-white rounded-xl">
                <div>
                  <p className="pt-5 text-center font-semibold text-xl">Voucher của bạn</p>
                  {vouchers.map((item,index) => (
                    <li
                      key={index}
                      className="list-none px-2 py-3 my-5 border-[1.5px] border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                      onClick={() => handleSelectVoucher(item)} // Chọn voucher
                    >
                      <div className="grid grid-cols-3 w-full items-center gap-x-5 lg:gap-x-20 md:mx-5">
                        <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] bg-primary/60 items-center justify-center block basis-[30%]">
                          <div className="text-center flex justify-center items-center h-[60%]">
                            <FiShoppingCart className="text-3xl lg:text-6xl text-gray-100 w-full" />
                          </div>
                          <p className="text-xs lg:text-sm font-semibold text-gray-100 text-center whitespace-break-spaces">
                            {item.title}
                          </p>
                        </div>
                        <p className="text-xs lg:text-base font-semibold text-center">
                          Giảm {item.discount_percentage}% toàn ngành hàng
                        </p>
                        <p className="text-2xl ml-16">X 1</p>
                      </div>
                    </li>
                  ))}
                </div>
                <div className="flex justify-end mx-5">
                  <button
                    onClick={() => setShowvoucher(false)} // Đóng modal khi nhấn Quay lại
                    className="button-primary px-5 py-2 bg-primary"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="flex justify-between mt-5">
              {selectedVoucher && (
                <div className="font-semibold mr-[10vw]">
                  {/* <p>Voucher đã chọn: {selectedVoucher.title}</p> */}
                  <p>Voucher đã chọn:       </p>
                  <p className="text-sm text-gray-500">
                    Giảm {selectedVoucher.discount_percentage}%
                  </p>
                </div>
              )}
              <div className="text-xl font-semibold">
                Tổng tiền: {PricetoString(totalAmount || total())}
              </div>
            </div>
            <div className="button-primary px-2 py-1 lg:px-3 lg:py-2 bg-red-500">
              <button onClick={() => handleOnclickOrder()}>Mua hàng</button>
            </div>
          </div>
        )}
        {/* tiêu đề */}
        {cartgoods.length > 0 && (
          <div className="text-xs lg:text-base flex justify-between border-[0.5px] rounded-md py-3 my-5 bg-white font-semibold mt-[-5vh] md:mt-[-10vh]">
            <p className=" basis-[40%] lg:basis-[50%] pl-1 lg:pl-10">
              Tất cả sản phẩm
            </p>
            <div className=" basis-[60%] lg:basis-[50%] flex justify-around">
              {title1s.map((title1, index) => {
                return (
                  <li key={index} className="list-none">
                    {title1}
                  </li>
                );
              })}
            </div>
          </div>
        )}
        {/* sản phẩm */}
        {cartgoods && cartgoods.length < 0 ? (
          <div className="text-sm font-bold lg:text-base text-center mx-3  h-[200px] md:h-[500px]">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </div>
        ) : (
          <div>
            <div className="bg-white lg:mx-5 my-5 border-[1px] border-gray-50">
              {cartgoods.length > 0 ? (
                cartgoods.map((item) => {
                  const product = item.good;
                  return (
                    <li
                      key={item.id}
                      className="list-none border-[1px] mb-[10vh]"
                    >
                      <div className="text-base font-semibold py-3 bg-green-100 ">
                        <p className=" pl-1 lg:pl-10 text-sm lg:text-base">
                          Mua kèm khuyến mãi lớn
                        </p>
                      </div>
                      <div className="flex items-center py-5">
                        {/* ảnh sản phẩm */}
                        <div className="flex basis-[40%] lg:basis-[50%] px-1 lg:pl-5">
                          <input
                            type="checkbox"
                            checked={selectedId.includes(item.id)}
                            onChange={() => handleOnchangeInput(item.id, item)}
                            className="lg:scale-[200%] mx-1 lg:mx-5"
                          />
                          <div className="flex items-center">
                            <img
                              src={`http://127.0.0.1:8888${product.image}`}
                              alt=""
                              className=" w-[50px] h-[50px] lg:w-[150px] lg:h-[150px]"
                            />
                            <p className="font-semibold text-[8px] md:text-sm lg:text-base px-1">
                              {product.goodName}
                            </p>
                          </div>
                        </div>
                        <div className="basis-[60%] flex items-center text-[8px] md:text-xs lg:text-base px-2 justify-around">
                          {/* giá cả */}
                          <p className="text-red-500 font-semibold">
                            {PricetoString(product.price.split(".")[0])}
                          </p>
                          {/* số lượng sản phẩm */}
                          <div className="font-bold">
                            <p className="flex md:gap-x-1 items-center">
                              Số lượng:
                              <RiSubtractFill
                                className="cursor-pointer mx-1 lg:mx-2 md:border-[2px]"
                                onClick={() =>
                                  handleClicksubtraction(item.id, item)
                                }
                              />
                              {item.quantity}
                              <HiPlusSm
                                className="cursor-pointer mx-1 lg:mx-2 md:border-[2px]"
                                onClick={() => handleClickplus(item.id, item)}
                              />
                            </p>
                          </div>
                          {/* thao tác */}
                          <span
                            className="text-red-500 font-semibold cursor-pointer"
                            onClick={() => handleOnclickDelete(item.id, item)}
                          >
                            Xóa
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="h-[500px] text-center font-semibold py-5">
                  Bạn chưa có sản phẩm nào trong giỏ hàng
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cartshopping;
