import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from "./reducers/cartReducers";
import {userLoginReducers} from "./reducers/userReducers";

const reducers = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducers
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
})

export default store