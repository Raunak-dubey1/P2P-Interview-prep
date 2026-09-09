import {StreamVideoClient} from "@stream-io/video-react-sdk"

const apiKey=import.meta.env.VITE_STREAM_API_KEY;

const client=null;

export const initializeStreamClient=async(user,token)=>{
  // if thier is already a client for the user just return 

  if(client&&client?.user?.id) return client;

  //creating the client for a user

  client=new StreamVideoClient({
    apiKey,
    token,
    user
  })

  return client
}

export const disconnectStreamClient=async()=>{
    if(client){
        try{
           await client.disconnectUser();
            client=null;
        }catch(error){
            console.log("Error in disconnection Stream client:",error);
        }
    }
}