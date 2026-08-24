import express from "express"  // instead of using nodemon u can also insert --watch in the script command in package.json
import {ENV} from "./lib/env.js"
import { connectDB } from "./lib/db.js";

const PORT=ENV.PORT;
const app=express();

app.get("/",(req,res)=>{

})
 const startServer=async()=>{
    try{
        await connectDB();
         app.listen(PORT,()=> console.log(`Server is running at port: ${PORT}`))
    }catch(error){
        console.error("failure while running server",error);
    }
   
 }
 startServer();
export default app