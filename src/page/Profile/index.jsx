import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import {ContentAccounts} from "./Content";
import { useState } from "react";
function Profile() {
    const titles=[
     "Tài khoản của tôi", "Đơn hàng","Khuyến mãi của tôi", "Đăng xuất"
     ]
     const UserInfor=useSelector(state=>state.user.user)
     const handOnclick=(index)=>{
          setContent(index)
     }
     const [content, setContent]=useState(0);
     let Content=ContentAccounts[content].component;
     return ( 
          <div className="test ">
               <div className="font-Montserrat py-5 bg-gray-50/50 text-center lg:text-left border-gray-100 border-b-2">
                    <p className="uppercase font-bold text-3xl py-2">
                         My account
                    </p>
                    <p className="font-semibold text-base">
                         Trang tài khoản
                    </p>
               </div>
               <div className="grid-cols-2 gap-y-0 lg:flex ">
                    {/* slider bar */}
                    <div className=" basis-[100%] lg:basis-[30%] border-x-gray-50 border-x-2  mt-5">
                         <div className="mt-3 ml-2 font-Montserrat ">
                              {/* ảnh đại diện*/}
                              <div className="flex flex-2 items-center gap-x-5 ">
                                   <div className=" px-3 py-3 lg:px-5 lg:py-5 rounded-full bg-gray-50 border-2 w-[70px] lg:w-[100px] text-center">
                                        <FaRegUser className=" text-4xl lg:text-5xl font-semibold w-full text-gray-500"/>
                                   </div>
                                   <div className=" font-semibold  text-base lg:text-xl">
                                        {UserInfor.fullName}
                                   </div>
                              </div>
                              {/* nội dung */}
                              <div className="mt-3 mx-2">
                                   <ul className="pb-3 text-base font-bold">
                                        {titles.map((title,index)=>{
                                        return (
                                             <li key={index}
                                                  className="py-5 text-gray-500 hover:text-primary transition-all duration-500 ease-in-out cursor-pointer border-b-2 border-gray-100"
                                                  style={content===index?{
                                                       borderRight: '5px solid rgb(0, 173, 162)',
                                                       color:"rgb(0, 173, 162)"
                                                  }:{}}
                                                  onClick={()=>handOnclick(index)}
                                             >
                                                  {title}
                                             </li>
                                        )
                                        })}
                                   </ul>
                              </div>
                         </div>
                    </div>
                    {/* content */}
                    <div className=" block lg:basis-[70%] border-r-2 border-r-gray-100">
                         {
                              <Content/>
                         }
                    </div>
               </div>
          </div>
          );
}

export default Profile;