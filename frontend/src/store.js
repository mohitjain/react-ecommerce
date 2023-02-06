import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from "./reducers/cartReducers";


const reducers = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}
const middleware = [thunk]

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
})

export default store