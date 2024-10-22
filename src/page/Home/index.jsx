import { useSelector } from "react-redux";
import Content from "./content";
import Slider from "./Slider";

function Home() {
    // const UserState=useSelector(state=>state.user)
    // console.log(UserState)
    return ( 
        <div>
            <Slider/>
            <Content/>
        </div>
     );
}

export default Home;