import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

//since their is 2 fn(or array of function) so when we will 
//implement it, express will automatically run both fn one by one
export const protectRoute=[
    requireAuth(),
  
    async(req,res,next)=>{
          try{
        const clerkId=req.auth.userId;

        if(!clerkId) return res.status(401).json({msg:"Unauthorized-Invalid token"})
        
        const user=User.findOne(clerkId);

        if(!user) res.status(404).json({msg:"User not Found"})

        req.user=user //attaching req under the user object
        next();
        }
    catch(error){
        console.error("Error while authenticating user or protectRoute middleware",error);
        res.status(500).json({msg:"Internal Server error ProtectRoute Middleware"})
    }
}
]
