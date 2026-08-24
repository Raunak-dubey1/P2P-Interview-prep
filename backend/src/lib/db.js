import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB=async()=>{
    try{
        await mongoose.connect(ENV.MONGODB_URI);
        console.log("MongoDb connected Successfully");
    }catch(error){
        console.log("Error while Connecting MongoDb",error);
        process.exit(1);
    }
}



