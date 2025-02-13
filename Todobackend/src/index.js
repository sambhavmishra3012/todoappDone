import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`This app is listening on ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('Ther are some Errors',err)
})