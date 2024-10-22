import { Types } from "../Types"

const initalState={
   user: {
   },
   status: false
};
const UserReducer=(state=initalState,action)=>{
    switch(action.type){
        case Types.User.Login:{
            return {
                user: action.payload,
                status: true
            }
        }
        case Types.User.Logout:{
            return {
                user: null,
                status: false
            }
        }
        default:
            return state;
    }
}
export {UserReducer};