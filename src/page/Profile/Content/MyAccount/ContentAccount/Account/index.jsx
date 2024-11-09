import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateUser } from "../../../../../../redux/Actions";
import request from "../../../../../../utils/request";
function Account() {
  const User = useSelector((state) => state.user.user);
  const Status=useSelector((state)=>state.user.status);
  const dispatch=useDispatch();
  const [user,setUser]=useState({
    ...User,
    newpassword:"",
    confirmnewpassword:"",

  })
  const handleOnchange=(e)=>{
    //e.preventDefault();
    const {name, value}=e.target;
    setUser(
        {
            ...user,
            [name]: value
        }
    )
  }
  const handleOnSumbit=async(e)=>{
    e.preventDefault()
    const updateUser={
      fullName: user.fullName,
      email: user.email,
      password: user.newpassword || user.password,
      userType:user.userType,
      loyaltyPoints:user.loyaltyPoints
    }
    await request.put(`/user/${User.id}`, updateUser);
    alert("Chỉnh sửa thông tin thành công");
    dispatch(UpdateUser({
        fullName: user.fullName,
        email: user.email,
        password: user.newpassword|| user.password
    }))
  }
  return (
    <div>
      {Status === false ? (
        <div className="text-center text-xl font-Montserrat font-semibold">
            <p>
                Bạn chưa đăng nhập <span className="text-primary"><Link to={'/login'}>Đăng nhập ngay</Link></span>
            </p>
        </div>
      ) : (
        <form action="" className="flex flex-col gap-y-5" onSubmit={(e)=>handleOnSumbit(e)}>
          {/* tên đăng nhập */}
          <div className="flex flex-col font-bold text-base gap-y-2">
            <label htmlFor="fullName">
              Tên đăng nhập <span className="text-xs">&#10043;</span>
            </label>
            <input
              type="text"
              id="fullName"
              className="border-2 w-[50%] h-12 border-gray-500  focus:outline-primary px-2"
              name="fullName"
              value={user.fullName}
              onChange={(e)=>handleOnchange(e)}
            />
          </div>
          {/* địa chỉ email */}
          <div className="flex flex-col font-bold text-base gap-y-2">
            <label htmlFor="email">
              Địa chỉ email <span className="text-xs">&#10043;</span>
            </label>
            <input
              type="text"
              id="email"
              className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"
              name="email"
              value={user.email}
              onChange={(e)=>handleOnchange(e)}
            />
          </div>
          {/* Mật khẩu */}
          <div className="flex flex-col font-bold text-base gap-y-2">
            <label htmlFor="password">
              Mật khẩu <span className="text-xs">&#10043;</span>
            </label>
            <input
              type="text"
              id="password"
              className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"
              name="password"
              value={user.password}
              onChange={(e)=>handleOnchange(e)}
            />
          </div>
          {/* Mật khẩu mới */}
          <div className="flex flex-col font-bold text-base gap-y-2">
            <label htmlFor="newpassword">
              Mật khẩu mới <span className="text-xs">&#10043;</span>
            </label>
            <input
              type="text"
              id="newpassword"
              className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"
              name="newpassword"
              value={user.newpassword}
              onChange={(e)=>handleOnchange(e)}
            />
          </div>
          {/* Xác nhận mật khẩu mới */}
          <div className="flex flex-col font-bold text-base gap-y-2">
            <label htmlFor="name">
              Xác nhận mật khẩu <span className="text-xs">&#10043;</span>
            </label>
            <input
              type="text"
              id="confirmnewpassword"
              className="border-2 w-[80%] h-12 border-gray-500  focus:outline-primary px-2"
              name="confirmnewpassword"
              value={user.confirmnewpassword}
              onChange={(e)=>handleOnchange(e)}
            />
          </div>
          {/* Lưu thông tin */}
          <div className="items-center w-full">
            <button className="px-3 py-3 text-white bg-primary hover:bg-primary/65 font-bold  rounded-md transition-all duration-500 ease-in-out"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Account;
