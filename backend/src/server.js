import express from "express"  // instead of using nodemon u can also insert --watch in the script command in package.json
import {ENV} from "./lib/env.js"
import { connectDB } from "./lib/db.js";
import cors from "cors"
import {serve} from "inngest/express"
import { functions, inngest } from "./lib/inngest.js";
import {clerkMiddleware} from "@clerk/express";
import chatRoute from "./routes/chatRoute.js";
import sessionRoute from "./routes/sessionRoute.js"

const PORT=ENV.PORT;
const app=express();

//middlewares
app.use(express.json())
app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true,
}))
app.use(clerkMiddleware())

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoute);
app.use("api/sessions",sessionRoute)

app.get("/",(req,res)=>{
    req.auth()  // this will return something bcz we have used the clerkMiddlewar for auth
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