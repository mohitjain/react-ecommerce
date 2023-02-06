import express from "express"
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import {errorHandler, notFound} from './middleware/error.js'

const app = express()
dotenv.config()
connectDB()

app.get("/", (request, response) =>{
    response.send("API is running....")
})

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 6000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port localhost:${PORT}`.yellow.bold))