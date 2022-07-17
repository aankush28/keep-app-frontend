import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./redux/reducers/noteReducers";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./redux/reducers/useReducers";

const reducer = combineReducers({
userLogin: userLoginReducer,
userRegister: userRegisterReducer,
noteList : noteListReducer,
noteCreate : noteCreateReducer,
noteDelete: noteDeleteReducer,
noteUpdate: noteUpdateReducer,
userUpdate :userUpdateReducer,
})
const userInfoFromlocalStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;
const initialState={
    userLogin:{userInfo:userInfoFromlocalStorage},
}
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store