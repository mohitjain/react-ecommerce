import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/login", authUser)
router.post("/", registerUser)
router.route("/profile", authUser).get(protect, getUserProfile).put(protect, updateUserProfile)



export default router
