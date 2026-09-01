import { chatClient,streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";


export async function createSession(req,res){

    try{
        const {problem,difficulty}=req.body;
        if(!problem) res.status(400).json({message:"Problem is required to create Session"});

        const userID=req.body.user._id;
        const clerkId=req.body.clerkId;

        //generating unique call id for session
        const callId=`session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    
        //creating session in the db
        const session=await Session.create({
            callId,
            problem,
            difficulty,
            host:userID,
        });  

        //creating stream video call
        await streamClient.video.call("default",callId).getOrCreate({
            data:{      
                created_by_id:clerkId,
                custom:{problem,difficulty,sessionId:session._id.toString()},
            }
        })

        const channel=chatClient.channel("messaging",callId,{
            created_by_id:clerkId,
            name:`${problem} Session`,
            members:[clerkId]
        })

        await channel.create();

        res.status(202).json({session})
    }catch(error){
        console.error("Error in createSession Controller: ",error);
        res.status(500).json({msg:"Internal Server Error while handling Sessioin Creation"})
    }
}

export async function joinSession(req,res){
    try{

    }catch(error){
        
    }
}

export async function getActiveSessions(_,res){ //since we do not need req we put _
    try{
        const session=await Session.find({status:"active"})
        .populate("host","name profileImage") //populating means adding more details 
        .sort({createdAt:-1})
        .limit(5);                                      //here we are the details of host  
        

        res.status(200).json({session});
    }catch(error){                            
        console.error("Error while handling getActiveSession Controller",error);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function endSession(req,res){
    try{

    }catch(error){

    }
}

export async function getSessionById(req,res){
    try{

    }catch(error){
        
    }

}

export async function getMyRecentSession(req,res){
    try{
        //Note: here we have to check both as host and the participant
        const userID=req.user._id;        
        const session=Session.find({
            status:"completed",
            $or:[{host:"userID"},{participant:"userID"}],
        }).sort({createdAt:-1})
          .limit(10);

          res.status(200).json({session});
    }catch(error){
        console.log("Error while getting recents session that has been done");
        res.status(500).json({msg:"Internal Server Error"});
    }

}
