import { chatClient } from "../lib/stream.js";

export async function getStreamtoken(req,res){
    try{
        const token=chatClient.createToken(req.user.clerkId)//clerkId bcz streamUser saved is same of Clerk One.
        res.status(200).json({
            token,
            userId:clerkId,
            userName:req.user.name,
            userImage:req.user.image,
        })
    }catch(error){
        console.log("Error while generating stream token",error);
        res.staus(500).json({msg:"Error while getting token"})
    }
}