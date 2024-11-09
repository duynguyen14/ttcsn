import {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { cartShopping } from "../../api/cartshopping";
import { HiPlusSm } from "react-icons/hi";
import { RiSubtractFill } from "react-icons/ri";
function Cartshopping() {
  const items = useSelector((state) => state.cartshopping);
  const [listItems,setListItems]=useState(cartShopping);
  const [selectedItems,setSlectedItem]=useState([]);
  const [selectedId,setSelectedId]=useState([]);
  const [sum,setSum]=useState(0);
  const [showVoucher,setShowvoucher]=useState(false);
  const navigate=useNavigate();
  const title1s = ["Đơn giá", "Số lượng", "Thao tác"];
  const handleClickplus = (index,id) => {
    if(listItems[index].number>=5){
      alert("Bạn đã đạt số lượng mua giới hạn");
      return;
    }
      setListItems((pre)=>pre.map((item)=>{
        if(item.id===id){
          return {
            ...item, number:item.number>=5?5 :item.number+1 
          }
        }
        else return item
      }
      ))
      setSlectedItem((pre)=>pre.map((item)=>{
        if(item.id===id){
          return {
            ...item, number:item.number>=5?5: item.number+1
          }
        }
        else return item;
      }))
      // console.log("Mảng ban đầu : ",listItems)
  };
  const handleClicksubtraction = (id) => {
     setListItems(pre=>pre.map((item)=>{
      if(item.id===id){
        return {
          ...item, number: item.number===0?0 : item.number-1
        }
      }
      else return item
     })
     )
     setSlectedItem(pre=>pre.map((item)=>{
      if(item.id===id){
        return{
          ...item, number:item.number===0?0 : item.number-1
        }
      }
      else return item;
     }))
  };
  const handleOnclickDelete=(id)=>{
    if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này")){
      setListItems(pre=>pre.filter(item=>item.id!==id))
    }
  }
  const priceToString=(price)=>{
    let temp=price.toString().split('');
    for(let i=temp.length-3;i>=0;i-=3){
      temp.splice(i,0," ");
    }
    return temp.join('');
  }
  const handleOnchangeInput = (id,item) => {
    selectedId.includes(id) ? setSelectedId(selectedId.filter(i=>i!=id)) : setSelectedId(pre=>[
    ...pre,id
   ])
   selectedId.includes(id) ? setSlectedItem(selectedItems.filter(item=>item.id!==id)): setSlectedItem(pre=>[
    ...pre,item
   ])
   //handleChangetotal();
  }
  useEffect(()=>{
    let total=0;
   selectedItems.forEach(item=>{
    total+=item.newprice*item.number;
   })
   setSum(total)
  },[selectedItems])
  const handleOnclickOrder=()=>{
    if(selectedItems.length==0){
      alert("Bạn chưa chọn sản phẩm nào");
      return;
    }
    else {
      navigate('/order',{state: selectedItems})
      
    }
  }
  console.log("mảng được chọn : ",selectedItems)

  return (
    <div className="test bg-gray-50 font-Montserrat">
      <div className='sticky top-[95vh] md:top-[90vh] h-[5vh] md:h-[10vh] p-1 md:p-4 bg-white border-[1.5px] border-gray-300 z-10 flex items-center text-[8px] md:text-base font-semibold justify-around whitespace-nowrap'>
        <div className='md:basis-25% flex gap-x-2 '>
          <input type="checkbox" name="" id="" className='md:scale-[200%]'onChange={()=>setSlectedItem(listItems)}/>
          <div>
            <p className='md:flex block'>
              Chọn tất cả
            </p>
            <p>
            ({listItems.length} sản phẩm)
            </p>
          </div>
        </div>
        {/* voucher */}
        <div className='md:basis-30% block lg:flex mx-6 gap-x-4'>
          <p>Voucher</p>
          <p className='text-blue-700 cursor-pointer'
          onClick={()=>setShowvoucher(true)}
          >Chọn hoặc nhập mã</p>
        </div>
        <div className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all duration-500 ease-in-out ${
            showVoucher ? "opacity-100 block translate-x-0" : "opacity-0 hidden translate-x-100"
          }`}>
            <div className='w-[500px] h-[500px] bg-white'>

              <button onClick={()=>setShowvoucher(false)}>
                Hoàn thành
              </button>
            </div>
        </div>
        {/* Tổng tiền */}
        <div className='md:basis-25% block md:flex md:mx-10 md:gap-x-5 items-center'>
            <p className='text-red-500'>
              Tổng tiền:
            </p>
            <p>
            {priceToString(sum)}
            </p>
        </div>
        <div className='button-primary px-2 py-1 lg:px-3 lg:py-2 bg-red-500'>
          <button onClick={()=>handleOnclickOrder()}>Mua hàng</button>
        </div>
      </div>
      {/* tiêu đề */}
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
      {/* sản phẩm */}
      {listItems.length<=0? 
      <div className='text-sm font-bold lg:text-base text-center mx-3  h-[200px] md:h-[500px]'>Bạn chưa có sản phẩm nào trong giỏ hàng</div>
      :  
      <div>
        <div className="bg-white lg:mx-5 my-5 border-[1px] border-gray-50">
        {listItems.map((item, index) => {
          return (
            <li key={index} className="list-none border-[1px] mb-[10vh]">
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
                    onChange={()=>handleOnchangeInput(item.id,item)}
                    className="lg:scale-[200%] mx-1 lg:mx-5"
                  />
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
                <div className="basis-[60%] flex items-center text-[8px] md:text-xs lg:text-base px-2 justify-around">
                  {/* giá cả */}
                  <p className="text-red-500 font-semibold">{item.newprice}</p>
                  {/* số lượng sản phẩm */}
                  <div className="font-bold">
                    <p className="flex md:gap-x-1 items-center">
                      Số lượng:
                      <RiSubtractFill
                        className="cursor-pointer mx-1 lg:mx-2 md:border-[2px]"
                        onClick={()=>handleClicksubtraction(item.id)}
                      />
                      {item.number}
                      <HiPlusSm
                        className="cursor-pointer mx-1 lg:mx-2 md:border-[2px]"
                        onClick={()=>handleClickplus(index,item.id)}
                      />
                    </p>
                  </div>
                  {/* thao tác */}
                  <span className='text-red-500 font-semibold cursor-pointer'
                  onClick={()=>handleOnclickDelete(item.id)}
                  >Xóa</span>
                </div>
              </div>
            </li>
          );
        })}
      </div>
      </div>
      }
    </div>
  );
}

export default Cartshopping;
