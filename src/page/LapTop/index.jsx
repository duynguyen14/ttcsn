import React, { useState, useEffect } from "react";
// import "../../page/Laptop/index.css";
import { Link } from "react-router-dom";
import Image from "../../assets/images/introduction.jpg";
import Image1 from "../../assets/images/introduction1.jpg";
import Image2 from "../../assets/images/introduction2.jpg";
import Image3 from "../../assets/images/introduction3.jpg";
import { request1 } from "../../utils/request";
import { PricetoString } from "../../Component/Translate_Price";
function Laptop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await request1.get("goods/3/getByCategoryId");
      setProducts(response.data);
    };
    fetch();
  }, []);
  return (
    <div className="flex test divide-y divide-gray-100 rounded-lg my-10 py-10">
      {/* Menu Bên Phải */}
      <div className="z-10 font-normal basis-[20%]">
        <ul className="py-2 dark:text-gray-400 font-Montserrat font-semibold">
          <li className="text-3xl">
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white border-b-[2px]"
            >
              Thương hiệu
            </Link>
          </li>
          <li className="pt-4">
            <Link to={"/laptop/dell"}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary"
            >
              DEll
            </Link>
          </li>
          <li>
            <Link to={"/laptop/lenovo"}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary"
            >
              Lenovo Thinkpad
            </Link>
          </li>
          <li>
            <Link to={"/laptop/micro"}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary"
            >
              Microsoft Surface
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 relative gap-y-10 gap-x-10 basis-[80%] ml-4">
        {products &&
          products.length > 0 &&
          products.map((Product, index) => {
            return (
              <Link to={`/product/${Product.id}`} key={index}>
                <div className="group block overflow-hidden  rounded-xl cursor-pointer relative font-Montserrat hover:scale-110 transition-all ease-in-out duration-500 py-16 shadow-lg">
             
                  <div className="max-w overflow-hidden">
                    <img
              
                      src={`http://127.0.0.1:8888/${Product.image}`}
                  
                      className="max-w-full block"
                    />
                  </div>

                  <div className="absolute px-3 py-1 bg-primary rounded-xl text-xs font-semibold text-white top-5">
                    <p>Giảm giá sốc</p>
                  </div>
                  <div className="absolute top-[90%] left-[30%] flex items-center justify-centerk bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 my-[-10px]">
                    <button className="px-6 py-2 bg-primary text-white text-md font-semibold rounded-lg shadow-lg hover:bg-red-500 transition">
                      Mua Ngay
                    </button>
                  </div>
                  <div className="top-menu-item font-Montserrat font-bold text-center text-sm lg:text-md">
                    <p href="">{Product.goodName.slice(0, 25)}</p>
                  </div>
                  <div className="font-Montserrat font-bold px-3 py-2 text-xs md:text-base ">
                    <div className="flex justify-around items-center">
                      <p className="">
                        Chỉ từ:{" "}
                        <span className="text-red-500">
                          {PricetoString(parseInt(Product.price.split(".")[0]))}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Laptop;
