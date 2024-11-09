import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAddress,
  DeleteAddress,
  UpdateAddress,
} from "../../../../../../redux/Actions";
function Address() {
  const [address, setAddress] = useState({
    phone: "",
    name: "",
    addressct: "",
  });
  const [message, setMessage] = useState(false);
  const [showAdd, setShowadd] = useState(false);
  const [showUpdate, setShowupdate] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const Addresslists = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  // kiểm tra form dữ liệu
  const check = () => {
    if (
      address.name === "" ||
      address.phone === "" ||
      address.addressct === ""
    ) {
      setMessage(true);
      return false;
    } else {
      setMessage(false);
      return true;
    }
  };
  // thêm địa chỉ
  const handleOnclickHT = () => {
    const newAddress = {
      id: (Addresslists.length + 1).toString(),
      name: address.name,
      phone: address.phone,
      address: address.addressct,
    };
    if (check()) {
      dispatch(AddAddress(newAddress));
      setShowadd(false);
      alert("Thêm địa chỉ thành công");
      setAddress({
        name: "",
        phone: "",
        addressct: "",
      });
    }
  };
  // xóa địa chỉ
  const handleOnclickXoa = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không ?")) {
      dispatch(DeleteAddress(id));
      alert("Xóa địa chỉ thành công");
    } else {
      return;
    }
  };
  // cập nhật địa chỉ
  const handleOnclickUpdate = (id) => {
    let findAdrress = Addresslists.find((item) => item.id === id);
    setAddress({
      name: findAdrress.name,
      phone: findAdrress.phone,
      addressct: findAdrress.address,
    });
    setCurrentEditId(id);
    setShowupdate(true);
  };
  const handleOnclickCN = () => {
    if (check()) {
      const addressUpdate = {
        id: currentEditId,
        name: address.name,
        phone: address.phone,
        address: address.addressct,
      };
      dispatch(UpdateAddress(addressUpdate));
      setShowupdate(false);
      alert("Cập nhật địa chỉ thành công");
      setAddress({
        name: "",
        phone: "",
        addressct: "",
      });
    }
  };
  return (
    <div className="font-Montserrat relative flex flex-col">
      {/* tiêu đề */}
      <div className="font-bold text-xl flex justify-around py-6 border-y-2 border-b-gray-100">
        Địa chỉ của tôi
        <div
          className="font-semibold text-base px-9 py-2 rounded-md bg-primary hover:bg-primary/60 text-white text-center cursor-pointer transition-all duration-500 ease-in-out whitespace-nowrap relative"
          onClick={() => setShowadd(!showAdd)}
        >
          <button>
            <FaPlus className="absolute right-2 top-3" />
            Thêm địa chỉ mới
          </button>
        </div>
      </div>
      {
        <div
          className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ease-in-out ${
            showAdd ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
          <div className="bg-white p-6 rounded shadow-lg w-[600px]">
            <h2 className="text-lg font-semibold mb-4">Địa chỉ mới</h2>
            {/* Form nội dung */}
            <form className="grid grid-cols-1 gap-y-3">
              <div className="flex justify-around gap-x-4">
                <input
                  type="text"
                  placeholder="Họ tên"
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
              </div>
              <input
                type="tel"
                placeholder="Tỉnh thành phố"
                className={`border-2 border-gray-400 p-2 mb-4  focus:outline-primary ${
                  message === true
                    ? "outline-red-500 border-red-500 placeholder:text-red-500"
                    : "outline-primary border-primary"
                }`}
              />
              <input
                type="text"
                placeholder="Địa chỉ nhận hàng"
                className={`border-2 border-gray-400 p-2 mb-4  focus:outline-primary ${
                  message === true && address.addressct === ""
                    ? "outline-red-500 border-red-500 placeholder:text-red-500"
                    : "outline-primary border-primary"
                }`}
                value={address.addressct}
                name="addressct"
                onChange={(e) => handleOnchange(e)}
              />
              <div>
                <input type="radio" id="default" />{" "}
                <label htmlFor="default" className="font-xs font-semibold">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
              <div className="flex justify-end gap-x-10 text-sm font-semibold">
                <button
                  type="button"
                  className="bg-primary text-white p-2 rounded"
                  onClick={() => setShowadd(false)}
                >
                  Trở lại
                </button>
                <button
                  type="button"
                  onClick={() => handleOnclickHT()}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Hoàn thành
                </button>
              </div>
            </form>
          </div>
        </div>
      }
      {
        <div
          className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ease-in-out ${
            showUpdate ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
          <div className="bg-white p-6 rounded shadow-lg w-[600px]">
            <h2 className="text-lg font-semibold mb-4">Địa chỉ mới</h2>
            {/* Form nội dung */}
            <form className="grid grid-cols-1 gap-y-3">
              <div className="flex justify-around gap-x-4">
                <input
                  type="text"
                  placeholder="Họ tên"
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
              </div>
              <input
                type="tel"
                placeholder="Tỉnh thành phố"
                className={`border-2 border-gray-400 p-2 mb-4  focus:outline-primary ${
                  message === true
                    ? "outline-red-500 border-red-500 placeholder:text-red-500"
                    : "outline-primary border-primary"
                }`}
              />
              <input
                type="text"
                placeholder="Địa chỉ nhận hàng"
                className={`border-2 border-gray-400 p-2 mb-4  focus:outline-primary ${
                  message === true && address.addressct === ""
                    ? "outline-red-500 border-red-500 placeholder:text-red-500"
                    : "outline-primary border-primary"
                }`}
                value={address.addressct}
                name="addressct"
                onChange={(e) => handleOnchange(e)}
              />
              <div>
                <input type="radio" id="default" />{" "}
                <label htmlFor="default" className="font-xs font-semibold">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>
              <div className="flex justify-end gap-x-10 text-sm font-semibold">
                <button
                  type="button"
                  className="bg-primary text-white p-2 rounded"
                  onClick={() => setShowupdate(false)}
                >
                  Trở lại
                </button>
                <button
                  type="button"
                  onClick={() => handleOnclickCN()}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      }
      {/* nội dung địa chỉ */}
      <div>
        <ul>
          {Addresslists.length === 0 ? (
            <div className="py-5">
              <p className="text-center text-xl font-semibold">
                Bạn chưa thiết lập địa chỉ giao hàng nào
              </p>
            </div>
          ) : (
            Addresslists.map((Addresslist, index) => {
              return (
                <li
                  key={index}
                  className="border-b-2 border-b-gray-100 pb-20 grid grid-cols-2 gap-x-44 transition-all duration-500 ease-in-out
                           "
                >
                  {/* Thông tin địa chỉ */}
                  <div>
                    <p className="font-semibold text-base py-3">
                      {Addresslist.name}{" "}
                      <span className="font-medium px-5">
                        || {Addresslist.phone} (Số điện thoại)
                      </span>
                    </p>
                    <p>Địa chỉ: {Addresslist.address}</p>
                  </div>
                  {/* Thiết lập */}
                  <div className="flex justify-around gap-x-10 pt-10">
                    <button
                      className="px-3 w-[120px] rounded-md bg-blue-500 hover:bg-blue-700 text-white cursor-pointer transition-all duration-500 ease-in-out font-bold h-10"
                      onClick={() => handleOnclickUpdate(Addresslist.id)}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="px-3 w-[120px] rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-all duration-500 ease-in-out font-bold h-10"
                      onClick={() => handleOnclickXoa(Addresslist.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
export default Address;
