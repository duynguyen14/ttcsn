import { useState } from "react";
import Image1 from "../../../assets/images/Product_2.png";
import { HiPlusSm } from "react-icons/hi";
import { RiSubtractFill } from "react-icons/ri";
function ImageProduct() {
    const Product={
        name:"Surface Pro 11 – Snapdragon X Plus 16GB 512GB",
        imgae: Image1,
        sale:"38%",
        oldprice: 41990000,
        newprice: 26190000,
        colors:["Black","Platinum","Sapphire","Dune"],
    }
    const sales=[
        "Giảm đến 10% phụ kiện & đồ công nghệ khác khi mua kèm máy.",
        "Giảm đến 3 triệu với Thu cũ đổi mới lên đời laptop",
        "Nhận đến 2 triệu voucher mua hàng xã kho",
        "Giảm 500K, tích điểm, quà sinh nhật,… với Ưu đãi thành viên",
        "Giảm 50% gói bảo hành mở rộng (đến hết 31/7/2024)",
        "Trả góp: 0% trả trước, 0% lãi suất",
        "Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp"
    ]
    // hàm 
    const toPrice=(x)=>{
        let c=x.toString().split('');
        // if(typeof(x)==='number'&& !Number.isInteger(n)){
        //     c=x.toString().split('').splice
        // }
        for(let i=c.length-3;i>0;i-=3){
            c.splice(i,0,".");
        }
        return c.join('');
    }
    // state
    const [color,setColor]=useState(0);
    const [number,setNumber]=useState(1);

    const handleOnclik=(index)=>{
        setColor(index)
    }
    const handleClickplus=()=>{
        if(number>=5){
            alert("Bạn đã đạt tối đa sản phẩm mua");
            setNumber(5)
            return;
        }
        else{
            setNumber(number+1)
        }
    }
    const handleClicksubtraction=()=>{
        if(number<=0){
            setNumber(0);
        }
        else{
            setNumber(number-1)
        }
    }
    return ( 
        // product page
        <div className="test my-5 font-Montserrat">
            {/* tên sản phẩm */}
            <div className="my-5">
                <p className="text-base lg:text-xl w-[100%] font-bold top-menu-item lg:w-[40%] cursor-pointer">
                    {Product.name}
                </p>
            </div>
            {/* thông tin sản phẩm */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 px-2 py-3 border-t-2 border-solid border-gray-100 rounded-md">
                {/* ảnh sản phẩm */}
                <div className="group relative overflow-hidden cursor-pointer border-2 border-solid border-gray-50 rounded-md">
                    <img src={Product.imgae} alt="" className="w-[100%] group-hover:scale-110 transition-all duration-500 ease-in-out"/>
                    <p className="absolute text-xs lg:text-sm font-bold text-white top-5 py-1.5 px-3 bg-primary rounded-xl left-3">
                    Giảm -{Product.sale}
                </p>
                </div>
                {/* chọn mua sản phẩm */}
                <div className="border-2 border-solid border-gray-50 rounded-md h-auto px-2 flex flex-col gap-y-3">
                    {/* giá */}
                    <div className="flex gap-7 px-6 font-bold items-center">

                        <del className="text-gray-400 text-xs lg:text-base">{toPrice(Product.oldprice)}đ</del>
                        <p className="text-red-500 text-base lg:text-xl">{toPrice(Product.newprice)}đ</p>
                    </div>
                    {/* trả góp */}
                    <p className="text-base">Trả góp chỉ từ <span className="font-bold">{toPrice(((Product.newprice/12)*1.075).toFixed(0))}đ</span> 1 tháng</p>
                    {/* Màu sắc */}
                    <div className="">
                        <p className="font-bold text-base">Màu sắc: {Product.colors[color]}</p>
                        {/*  */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 my-4 mx-4 font-semibold gap-4">
                        {
                            Product.colors.map((color_1,i)=>{
                                return(
                                    <div key={i}>
                                        <button  className="py-2 px-8  border-2 border-gray-200 rounded-md relative text-xs w-[100%]"
                                            onClick={()=>handleOnclik(i)}
                                            style={i===color?{
                                                border: '2px solid rgb(0, 173, 162)',
                                                background:'rgb(0, 173, 162)',
                                                color:'white',
                                                }:{}}>
                                                {color_1}
                                        </button>
                                    </div>
                                    
                                )
                            })
                        }
                        </div>
                        {/* Số lượng */}
                        <div className="font-bold text-sm lg:text-base ">
                            <p className="flex gap-x-10 items-center">Số lượng: 
                            <RiSubtractFill className=" text-xl cursor-pointer mx-2"
                            onClick={handleClicksubtraction}
                            />
                            {number}
                            <HiPlusSm className="text-xl cursor-pointer mx-2"
                            onClick={handleClickplus}
                            />
                            </p>
                        </div>
                    </div>
                    {/* NGUỒN HÀNG +giá*/}
                    <div className="my-5">
                        <p className="font-semibold mb-3"><span className="uppercase font-bold">Nguồn hàng: </span>Nhập khẩu, Bảo hành 12 tháng, chưa gồm VAT</p>
                        <p className="font-bold text-base text-primary">{toPrice(Product.newprice*number)}đ</p>
                    </div>
                    {/* button mua hàng */}
                    <div className="grid grid-cols-2 gap-5 font-bold text-xs lg:text-base">
                        <button className="py-4 px-3 lg:px-6 lg:py-6 bg-red-500 text-white rounded-md hover:bg-primary transition-all duration-500">Thêm vào giỏ hàng</button>
                        <button className="py-4 px-3 lg:px-6 lg:py-6 bg-black text-white rounded-md hover:bg-primary transition-all duration-500">Mua ngay</button>
                        <button className="py-4 px-3 lg:px-6 lg:py-6 bg-gray-500 text-white rounded-md hover:bg-primary transition-all duration-500">Trả góp qua thẻ</button>
                        <button className="py-4 px-3 lg:px-6 lg:py-6 bg-yellow-400 text-blue-900 rounded-md hover:bg-primary transition-all duration-500">Mua ngay trả sau</button>
                    </div>
                    {/* ưu đãi thêm */}
                    <div className="my-4 bg-green-50 rounded-md px-3 py-3 overflow-hidden">
                        <p className="font-bold">
                            Ưu đãi thêm
                        </p>
                        {
                            sales.map((sale,index)=>{
                                return(
                                    <li key={index} className="text-xs py-1 hover:font-bold hover:text-primary cursor-pointer transition-all duration-500 ease-in-out">
                                        {sale}
                                    </li>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* Đặc điểm nổi bật +  Thông số kĩ thuật*/}
            <div>
                {/* Đặc điểm nổi bật */}
                <div>

                </div>
                {/* thông số kĩ thuật */}
                <div>

                </div>
            </div>
            {/* sản phẩm tương tự */}
            <div>

            </div>
        </div>
     );
}

export default ImageProduct;