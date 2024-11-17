import { MdCancelPresentation } from "react-icons/md";
import { PricetoString } from "../../../../../Component/Translate_Price";
function BuidDetail({show,product}) {
    console.log(product)
    if(product.length==0) return (<div></div>);
    else{
        
    return ( 
        <div className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ease-in-out ${show ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <div className="bg-gray-50 w-[1000px] h-[600px] rounded-md relative">
                    <MdCancelPresentation className="font-bold text-3xl absolute right-2 text-red-500 cursor-pointer" onClick={()=>setShow(false)}/>
                    <div className="w-full h-auto">
                        {/* thông tin sản phẩm */}
                        <div className="grid grid-cols-2 px-5 gap-10 justify-around py-5 ">
                            <div>
                                <img src={product[0].image} alt="" className="w-[500px] h-[400px]"/>
                                <div className="py-5">
                                    {/* tên sản phẩm */}
                                    <p className="text-center font-bold text-xl text-primary">{product[0].goodName}</p>
                                    {/* màu sắc giá thành */}
                                    <div className="grid grid-cols-2 font-semibold text-base items-center">
                                        <div className="">
                                            <p >
                                                Màu sắc: <span>{product[0].color}</span>
                                            </p>
                                            <p>
                                                Số lượng: <span>{product[0].amount}</span>
                                            </p>
                                            <p>Đơn giá: <span>{PricetoString(product[0].price)}</span></p>
                                        </div>
                                        <p className="text-red-500 text-xl">Tổng tiền: <span>{PricetoString(product[0].price*product[0].amount)}</span></p>
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                                <p className="text-xl font-bold text-primary">
                                    Địa chỉ nhận hàng
                                </p>
                                <div className="font-semibold text-base grid gap-y-5 my-5">
                                    <p>Tên người nhận: {Address.name}</p>
                                    <p>Số điện thoại: {Address.phone}</p>
                                    <p>Địa chỉ giao hàng: {Address.address}</p>
                                    <p className="text-xl">Mã đơn hàng :&ensp;<span className="text-primary">{product.id}</span></p>
                                    <p className="text-xl">Tình trạng: &ensp;
                                        <span 
                                            className={`text-primary ${product.status==="Đã giao"? 'text-primary':'text-red-500'}`}>
                                         {product.status}</span></p>
                                </div>
                                <div className="grid grid-cols-1 gap-y-8 justify-center items-center text-base text-white font-bold">
                                    {product.status==="Đã giao"
                                    ?<button className="px-3 py-3 button-primary bg-red-500 hover:bg-red-400">Mua lại sản phẩm</button>
                                    :<button className="px-3 py-3 button-primary bg-red-500 hover:bg-red-400" onClick={()=>handleOnclickHuy(product.id)}>Hủy Đơn hàng</button>}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

export default BuidDetail;