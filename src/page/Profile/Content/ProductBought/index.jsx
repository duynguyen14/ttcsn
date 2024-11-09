import { useState } from "react";
import image_1 from '../../../../assets/images/Product_1.png';
import { MdCancelPresentation } from "react-icons/md";
function ProductBought() {
    const [productBoughts,setproductBoughts]=useState([
        {
            id: "001", date:"12/11/2024", status:"Đang xử lý", Price: 20000000, name:"Máy tính", image: image_1, color:"đen",number: 1
        },
        {
            id: "002", date:"12/11/2024", status:"Đã giao", Price: 30000000, name:"Máy tính", image: image_1, color:"đen",number: 1
        },
        {
            id: "003", date:"12/11/2024", status:"Đang xử lý", Price: 40000000, name:"Máy tính", image: image_1, color:"đen",number: 1
        },
        {
            id: "004", date:"12/11/2024", status:"Đang xử lý", Price: 50000000, name:"Máy tính", image: image_1, color:"đen",number: 1
        },
        {
            id: "005", date:"12/11/2024", status:"Đang xử lý", Price: 60000000, name:"Máy tính", image: image_1, color:"đen",number: 1
        },    
    ])
    const Address={ id:"1",name: "Nguyễn Đức Duy", phone: "0123456789", address: "Tu hoàng, Phương Canh, Nam Từ Liêm Hà Nội" };
    
    const titles=[
        "Đơn hàng", "Ngày","Trạng thái", "Tổng", "Thao tác"
    ]
    const [product,setProduct]=useState({
        id:"",
        date:"",
        status:"",
        Price: 0,
        name:"",
        image:"",
        number: 0,
    })
    const [show,setShow]=useState(false)
    const handleOnclickShow=(id)=>{
        let chooseproduct=productBoughts.find(item=>item.id===id);
        console.log(chooseproduct.id)
        setProduct(chooseproduct)
        console.log("id "+product.id);
        setShow(!show);
    }
    // chuyển giá tiền thành chuỗi
    const PricetoString=(price)=>{
        let temp=price.toString().split('');
        
        for(let i=temp.length-3;i>0;i-=3){
            temp.splice(i,0,".");
        }
        return temp.join('');
    }
    const handleOnclickHuy=(id)=>{
        const newlistProduct=productBoughts.filter(item=>item.id!==id);
        if(window.confirm("Bạn có chắc chắn muốn hủy đơn hàng")){
            alert("Hủy đơn hàng thành công ")
            setproductBoughts(newlistProduct);
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
                        productBoughts.map((productbought,index)=>{
                            return(
                                <div key={index} className="grid grid-cols-5 gap-x-12 text-center text-gray-700 py-4 border-b-2 border-gray-200 text-sm items-center">
                                    {/* mã hàng */}
                                    <p className="text-primary font-bold text-sm">{productbought.id}</p>
                                    <p className="font-medium">{productbought.date}</p>
                                    <p className="font-semibold text-primary cursor-pointer" 
                                    onClick={()=>setShow(true)}
                                    >{productbought.status}</p>
                                    <p className="font-bold text-red-500 text-xl">{productbought.Price}</p>
                                    {/* thao tác */}
                                    <div>
                                        <button className="px-4 py-2 bg-primary text-white rounded-md font-bold" onClick={()=>handleOnclickShow(productbought.id)}>Xem</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </div> 
            <div className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ease-in-out ${show ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <div className="bg-gray-50 w-[1000px] h-[600px] rounded-md relative">
                    <MdCancelPresentation className="font-bold text-3xl absolute right-2 text-red-500 cursor-pointer" onClick={()=>setShow(false)}/>
                    <div className="w-full h-auto">
                        {/* thông tin sản phẩm */}
                        <div className="grid grid-cols-2 px-5 gap-10 justify-around py-5 ">
                            <div>
                                <img src={product.image} alt="" className="w-[500px] h-[400px]"/>
                                <div className="py-5">
                                    {/* tên sản phẩm */}
                                    <p className="text-center font-bold text-xl text-primary">{product.name}</p>
                                    {/* màu sắc giá thành */}
                                    <div className="grid grid-cols-2 font-semibold text-base items-center">
                                        <div className="">
                                            <p >
                                                Màu sắc: <span>{product.color}</span>
                                            </p>
                                            <p>
                                                Số lượng: <span>{product.number}</span>
                                            </p>
                                            <p>Đơn giá: <span>{PricetoString(product.Price)}</span></p>
                                        </div>
                                        <p className="text-red-500 text-xl">Tổng tiền: <span>{PricetoString(product.Price*product.number)}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div>
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
                                    <button className="px-3 py-3 button-primary bg-primary hover:bg-primary/60 ">Liên hệ shop</button>
                                    {product.status==="Đã giao"
                                    ?<button className="px-3 py-3 button-primary bg-red-500 hover:bg-red-400">Mua lại sản phẩm</button>
                                    :<button className="px-3 py-3 button-primary bg-red-500 hover:bg-red-400" onClick={()=>handleOnclickHuy(product.id)}>Hủy Đơn hàng</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
export default ProductBought;