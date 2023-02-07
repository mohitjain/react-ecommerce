import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (request, response) => {
    const {email, password, name} = request.body

    const userExists = await User.findOne({email: email})

    if (userExists) {
        response.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        response.status(201)
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        response.status(400)
        throw new Error("Invalid User Data")
    }
})


const authUser = asyncHandler(async (request, response) => {
    const {email, password} = request.body

    const user = await User.findOne({email: email})

    if (user && (await user.matchPassword(password))) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        response.status(401)
        throw new Error("Invalid Credentials")
    }
})

const getUserProfile = asyncHandler(async (request, response) => {

    const user = await User.findById(request.user._id)

    if (user) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        response.status(401)
        throw new Error("User Not found")
    }

})

const updateUserProfile = asyncHandler(async (request, response) => {

    const user = await User.findById(request.user._id)

    if (user) {
        user.name = request.body.name || user.name
        user.email = request.body.email || user.email
        if(request.body.password){
            user.password = request.body.password
        }
        const updatedUser = await user.save()

        response.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        response.status(401)
        throw new Error("User Not found")
    }

})


export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}
