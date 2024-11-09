import { Types } from "../Types"
//user
const LoginUser=(data)=>{
    console.log("data "+data);
    return{
        type: Types.User.Login,
        payload: data,
    }
}
const LogoutUser=()=>{
    return{
        type: Types.User.Logout,
    }
}
const UpdateUser=(data)=>{
    console.log("update ",data);
    return{
        type: Types.User.Update,
        payload: data
    }
}
//address
const AddAddress=(data)=>{
    return{
        type: Types.Address.AddAddress,
        payload: data
    }
}
const DeleteAddress=(data)=>{
    console.log(data);
    return{
        type: Types.Address.DeleteAddress,
        payload: data
    }
}
const UpdateAddress=(data)=>{
    return{
        type: Types.Address.UpdateAddress,
        payload: data
    }
}
//cartShopping
const AddProduct=(data)=>{
    return{
        type : Types.ShoppingCart.AddProduct,
        payload:data
    }
}
const DeleteProduct=(data)=>{
    return{
        type: Types.ShoppingCart.DeleteProduct,
        payload:data,

    }
}
const UpdateProduct=(data)=>{
    return{
        type: Types.ShoppingCart.UpdateProduct,
        payload: data,
    }
}
export {LoginUser,LogoutUser,UpdateUser,UpdateAddress,DeleteAddress,AddAddress,UpdateProduct,DeleteProduct,AddProduct}