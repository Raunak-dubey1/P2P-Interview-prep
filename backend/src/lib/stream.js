import {StreamChat} from "stream-chat"
import { ENV } from "./env.js"
import {StreamClient} from "@stream-io/node-sdk"

const apikey=ENV.STREAM_API_KEY
const apiSectret=ENV.STREAM_API_SECRET

if(!apikey||!apiSectret){
    console.error("STREAM API ERROR");
}

export const streamClient=new StreamClient(apikey,apiSectret);// for video calling
export const chatClient=StreamChat.getInstance(apikey,apiSectret); //for chat purpose

export const upsertStreamUser=async(userData)=>{
    try{
        await chatClient.upsertUser(userData);
       console.log("Created user having data:",userData);
    }catch(error){
        console.error("Error while Upserting user to the Stream: ",error);
    }
}

export const deleteStreamUser=async(userId)=>{
    try{
        await chatClient.deleteUser([userId]);
        console.log("User deleted with id: ",userId);
    }catch(error){
        console.error("Error while deleting the Stream User: ",error);
    }
}