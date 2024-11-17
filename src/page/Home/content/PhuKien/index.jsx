import { Mouse } from "../../../../api/products";
import { useEffect, useState } from "react";
import { request1 } from "../../../../utils/request";
import { Link } from "react-router-dom";
import {PricetoString} from '../../../../Component/Translate_Price/index.jsx';
function Ultrabook() {
  const [ismore, setIsmore] = useState(true);
  const [numberproduct, setNumberproduct] = useState(55);
  const [productSlice, setProductsilce] = useState([]);
  const [good, setGood] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await request1.get("goods/list");
        const data = response.data;
        setGood(data);
      } catch (e) {
        console.log("có lỗi ", e);
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    if (good && good.length > 0) {
      setProductsilce(good.slice(50, numberproduct));
    }
  }, [good, numberproduct]);
  const handleclickIsmore = () => {
    setNumberproduct(numberproduct + 5);
    if (productSlice.length >= 10) {
      setIsmore(false);
    }
  };
  return (
    <div className="mx-3 my-3 lg:mx-16 xl:mx-32 relative border-solid">
      <h1 className="uppercase font-bold font-Montserrat text-md lg:text-xl cursor-pointer hover:text-primary">
        Phụ kiện máy tính
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-5 relative gap-y-10">
        {productSlice &&
          productSlice.length > 0 &&
          productSlice.map((Product, index) => {
            return (
              <Link to={`product/${Product.id}`} key={index}>
                <div
                  className="group block border-2 border-gray-100 rounded-xl cursor-pointer relative font-Montserrat"
                >
                  {/* image */}
                  <div className="max-w- overflow-hidden">
                    <img
                      src={Product.image}
                      alt=""
                      className="max-w-full hover:scale-110 transition-all ease-in-out duration-500 block"
                    />
                  </div>
                  {/*sale*/}
                  <div className="absolute px-3 py-1 bg-primary rounded-xl text-xs font-semibold text-white top-5">
                    <p>Giảm giá sốc</p>
                  </div>
                  {/*information*/}
                  <div className="flex justify-around uppercase font-Montserrat font-bold my-3 text-xs">
                    <p className="px-3 py-2 bg-gray-200 rounded-lg">Mua ngay</p>
                    
                  </div>
                  {/*product name*/}
                  <div className="top-menu-item font-Montserrat font-bold text-center text-sm lg:text-md">
                    <p href="">{Product.goodName.slice(0, 25)}</p>
                  </div>
                  <div className="font-Montserrat font-bold px-3 py-2 text-xs md:text-base ">
                    <div className="flex justify-around items-center">
                      <p className="">
                        Chỉ từ:{" "}
                        <span className="text-red-500">{PricetoString(parseInt(Product.price.split(".")[0]))}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      {/*more product */}
      {ismore && (
        <div className="font-bold font-Montserrat text-base text-center text-gray-500 ">
          <button
            className="py-3 px-4 border-2 border-gray-400 
                            border-solid rounded-lg hover:bg-primary hover:text-white transition-all ease-in-out duration-700 
                            hover:border-primary"
            onClick={() => handleclickIsmore()}
          >
            More products
          </button>
        </div>
      )}
    </div>
  );
}
export default Ultrabook;
