import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler(async (request, response, next) => {
    let token = (request.headers.authorization ? request.headers.authorization : "").split(" ")[1]

    if(!token){
        response.status(401)
        throw new Error("Not able to authorize as no token present")
    } else {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            request.user = await User.findById(decodedToken.id).select("-password")

            next()
        }catch (e) {
            response.status(401)
            throw new Error("Token is invalid or expired.")
        }
    }
})

export {
    protect
}
