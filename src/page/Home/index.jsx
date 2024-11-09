import { useEffect, useState } from "react";
import Content from "./content";
import Slider from "./Slider";
import request from "../../utils/request";
import axios from "axios";
function Home() {
    // //const [Products,setProducts]=useState([]);
    // useEffect(()=>{
    //     try{
    //         axios.get("http://127.0.0.1:8888/api/goods/list").then((res)=>{
    //             console.log("dữ liệu : ",res);
    //             setProducts(res.data);
    //         })
    //     }
    //     catch(e){
    //         console.log("Lỗi",e);
    //     }
    // },[])
    return ( 
        <div>
            <Slider/>
            <Content/>
        </div>
     );
}

export default Home;