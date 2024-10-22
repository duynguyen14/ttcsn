import { combineReducers, createStore } from "redux";
import { UserReducer } from "../reducers/UserReducer";
const rootReducer=combineReducers(
    {
        user: UserReducer,
    }
);
const Store=createStore(rootReducer);
export {Store};