import { Mouse } from '../../../../api/products';
import { useState } from 'react';
function Ultrabook() {
    const [ismore,setIsmore]=useState(true);
    const [numberproduct,setNumberproduct]=useState(5);
    const productSlice=Mouse.slice(0,numberproduct);
    const handleclickIsmore=()=>{
        setNumberproduct(numberproduct+5);
        if(productSlice.length>=10){
            setIsmore(false)
        }
    }
    return ( 
        <div className="mx-3 my-3 lg:mx-16 xl:mx-32 relative border-solid">
            
            <h1 className="uppercase font-bold font-Montserrat text-md lg:text-xl cursor-pointer hover:text-primary">
               Ultrabook nổi bật
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-5 relative">
                {
                    productSlice.map((Product,index)=>{
                        return(
                            <div className='group block border-2 border-gray-100 rounded-xl cursor-pointer relative font-Montserrat' key={index}>
                                {/* image */}
                                            <div className='max-w- overflow-hidden'>
                                                <img src={Product.image} alt="" className='max-w-full hover:scale-110 transition-all ease-in-out duration-500 block'/>
                                            </div>
                                            {/*sale*/}
                                            <div className='absolute px-3 py-1 bg-primary rounded-xl text-xs font-semibold text-white top-5'>
                                                <p>
                                                    Giảm giá -{Product.sale}
                                                </p>
                                            </div>
                                            {/*information*/}
                                            {/*product name*/}
                                            <div className='top-menu-item font-Montserrat font-bold text-center text-sm lg:text-md'>
                                                <a href="">
                                                    {Product.name}
                                                </a>
                                            </div>
                                            {/*product info*/}
                                            <div className='flex justify-around uppercase font-Montserrat font-bold my-3 text-xs'>
                                                <p className='px-3 py-2 bg-gray-200 rounded-lg'>
                                                    {Product.ram}
                                                </p>
                                                <p className='px-3 py-2 bg-gray-200 rounded-lg'>
                                                    {Product.ssd}
                                                </p>
                                            </div>
                                            {/*product price*/}
                                            <div className='font-Montserrat font-bold px-3 py-2 text-xs md:text-base '>
                                            {/*old price*/}
                                                <del className='text-xs text-gray-400 py-2 '>{Product.oldprice}</del>
                                                <div className='flex justify-around items-center'>
                                                    <p className=''>Chỉ từ: <span className='text-red-500'>{Product.newprice}</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                           
                            
                        </div>
                        {/*more product */}
                        {
                            ismore&&<div className='font-bold font-Montserrat text-base text-center text-gray-500 '>
                            <button className='py-3 px-4 border-2 border-gray-400 
                            border-solid rounded-lg hover:bg-primary hover:text-white transition-all ease-in-out duration-700 
                            hover:border-primary'
                            onClick={()=>handleclickIsmore()}
                            >More products</button>
                        </div>
                        } 
                       
        </div>
     );
}
export default Ultrabook;