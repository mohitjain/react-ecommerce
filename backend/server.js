import express from "express"
import products from "./data/products.js"
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

const app = express()
dotenv.config()
connectDB()

app.get("/", (request, response) =>{
    response.send("API is running....")
})


app.get("/api/products", (request, response) =>{
    response.json(products)
})

app.get("/api/products/:id", (request, response) =>{
    const product = products.find(p => p._id === request.params.id)
    response.json(product)
})

const PORT = process.env.PORT || 6000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port localhost:${PORT}`.yellow.bold))