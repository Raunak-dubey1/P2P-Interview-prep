import dotenv from "dotenv"
dotenv.config({quiet:true}); //quiet true removes the showing of no. of env files

export const ENV={
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI
}