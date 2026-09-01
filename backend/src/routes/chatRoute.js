import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { getStreamtoken } from "../controllers/chatController.js";
const router=express.Router();

router.get("/token",protectRoute,getStreamtoken); //protectRoute for accessing clerkId

export default router;