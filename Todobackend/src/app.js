import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app=  express()

dotenv.config({
    path:'./.env'
})
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use(express.static("public"))
//Saree routes idhar import honge
import todoRouter from './routes/todo.routes.js'
app.use("/api/v1/todos",todoRouter)
export  {app}