import { useState } from "react";
import {PricetoString} from "..//..//..//..//Component/Translate_Price/index.jsx"
import { Builds } from "../../../../api/build/index.js";
import { Goods } from "../../../../api/products/index.js";
import { Goods_Build } from "../../../../api/Product_build/index.js"; 
import BuidDetail from "./BuildDetail/index.jsx";
function ProductBought() {
    const [builds,setBuilds]=useState(Builds)
    const Address={ id:"1",name: "Nguyễn Đức Duy", phone: "0123456789", address: "Tu hoàng, Phương Canh, Nam Từ Liêm Hà Nội" };
    const titles=[
        "Đơn hàng", "Ngày","Trạng thái", "Tổng", "Thao tác"
    ]
    const [product,setProduct]=useState([])
    const [show,setShow]=useState(false)
    const handleOnclickShow=(id)=>{
        let choosebuild=builds.find(item=>item.id===id);
        // console.log(choosebuild.id)
        let chooesGoods_build=Goods_Build.filter(item=>item.buildID==choosebuild.id);
        console.log("good_builds",chooesGoods_build)
        let goods=chooesGoods_build.map((i)=>{
            return Goods.find(item=>item.id=== i.productID)
        })
        console.log("goods",goods)
        setProduct(goods);
        setShow(!show);
    }
    // chuyển giá tiền thành chuỗi
    const handleOnclickHuy=(id)=>{
        const newbuilds=builds.filter(item=>item.id!==id);
        if(window.confirm("Bạn có chắc chắn muốn hủy đơn hàng")){
            alert("Hủy đơn hàng thành công ")
            setBuilds(newbuilds);
            setShow(false)
        }
    }
    return ( 
        <div className="font-Montserrat">
            {/* tiêu đề */}
            <div className="pb-6 pt-2 border-b-2 border-gray-200">
               <ul className="grid grid-cols-5 gap-x-16 font-bold text-base text-center">
                {
                    titles.map((title,index)=>{
                        return <li key={index}>
                            {title}
                        </li>
                    })
                }
               </ul>
            </div>
            {/* sản phẩm */}
            <div>
                <ul>
                    {
                        builds.map((build,index)=>{
                            return(
                                <div key={index} className="grid grid-cols-5 gap-x-12 text-center text-gray-700 py-4 border-b-2 border-gray-200 text-sm items-center">
                                    {/* mã hàng */}
                                    <p className="text-primary font-bold text-sm">{build.id}</p>
                                    <p className="font-medium">{build.date}</p>
                                    <p className="font-semibold text-primary cursor-pointer" 
                                    onClick={()=>setShow(true)}
                                    >{build.status}</p>
                                    <p className="font-bold text-red-500 text-md">{PricetoString(build.Total)}</p>
                                    {/* thao tác */}
                                    <div>
                                        <button className="px-4 py-2 bg-primary text-white rounded-md font-bold" onClick={()=>handleOnclickShow(build.id)}>Xem</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </div> 
            <BuidDetail show={show} product={product} Address={Address}/>
        </div>
     );
}
export default ProductBought;