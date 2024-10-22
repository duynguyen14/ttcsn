import { Types } from "../Types"

const LoginUser=(data)=>{
    console.log("data "+data);
    return{
        type: Types.User.Login,
        payload: data,
    }
}
const LogoutUser=(data)=>{
    console.log("logout "+data);
    return{
        type: Types.User.Logout,
        payload: data
    }
}
export {LoginUser,LogoutUser}