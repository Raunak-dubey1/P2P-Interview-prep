import { chatClient,streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";


export async function createSession(req,res){

    try{
        const {problem,difficulty}=req.body;
        if(!problem) return res.status(400).json({message:"Problem is required to create Session"});

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
        
        //creating stream chat part
        const channel=chatClient.channel("messaging",callId,{
            created_by_id:clerkId,
            name:`${problem} Session`,
            members:[clerkId]
        })

        await channel.create();

        return res.status(202).json({session})
    }catch(error){
        console.error("Error in createSession Controller: ",error);
        return res.status(500).json({msg:"Internal Server Error while handling Sessioin Creation"})
    }
}

export async function joinSession(req,res){
     try{
        const {id}=req.params;
        const userID=req.user._id;
        const clerkId=req.user.clerkId;

        const session=await Session.findById(id)
        if(!session) return res.status(404).json({msg:"Session Not Found"});

        //checking if there already participant exist or not 
        if(session.participant) return res.status(400).json({msg:"Participant Already Exist"})

        session.participant=userID;
        await session.save()

        const channel=chatClient.channel("messaging",callId);
        await channel.addMembers([clerkId]);

        return res.status(200).json({session})
    }catch(error){
        console.log("Error in JoinSession Controller",error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getActiveSessions(_,res){ //since we do not need req we put _
    try{
        const session=await Session.find({status:"active"})
        .populate("host","name profileImage") //populating means adding more details 
        .sort({createdAt:-1})
        .limit(5);                                      //here we are the details of host  
        

        return res.status(200).json({session});
    }catch(error){                            
        console.error("Error while handling getActiveSession Controller",error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function endSession(req,res){
   try{
        const {id}=req.params;
        const userID=req.user._id;

        const session=await Session.findById(id)
        if(!session) return res.status(404).json({msg:"Session Not Found"});

        //if user is not the host 
        if(session.host.toString()!==userID.toString()) 
            return res.status(403).json({msg:"Only host can end the Session"});

        if(session.status==="Completed")
            return res.status(400).json({msg:"Session Already Completed"});

        session.status="Completed"
        await session.save()

        //deleting the stream chat and video call
        const call=streamClient.video.call("default",session.callId)
        await call.delete({hard:true})

        const channel=chatClient.channel("messaging",session.callId);
        await channel.delete();

        return res.status(200).json({msg:"Session Ended Successfully"});
   }catch(error){
        console.log("Error in EndSession Controller",error);
        return res.status(500).json({msg:"Intenal Server Error"});
   }
}

export async function getSessionById(req,res){
    try{
        const {id}=req.params; //to get the dynamic value

        const session=await Session.findById(id)
        .populate("host", "name profileImage")
        .populate("participant","name profileImage")

        if(!session) return res.status(404).json({msg:"Session Not Found"});

        return res.status(200).json({session})
    }catch(error){
        console.log("Error while Fetching the Session",error);
        return res.status(500).json({msg:"Internal Server Error"});
    }

}

export async function getMyRecentSession(req,res){
    try{
        //Note: here we have to check both as host and the participant
        const userID=req.user._id;        
        const session=Session.find({
            status:"completed",
            $or:[{host:"userID"},{participant:"userID"}],
        }).sort({createdAt:-1}) //for sorting in descending order
          .limit(10);

          return res.status(200).json({session});
    }catch(error){
        console.log("Error while getting recents session that has been done");
        return res.status(500).json({msg:"Internal Server Error"});
    }

}
