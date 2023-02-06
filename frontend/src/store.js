import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'

const reducers = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers

})
const initialState = {}
const middleware = [thunk]

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
})

export default store