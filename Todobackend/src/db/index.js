import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'


const connectDb=async ()=>{
    try {
        
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log(`The connection has been made up by using${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("The error is ",error)
    }
}

export default connectDb