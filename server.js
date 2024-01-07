import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
dotenv.config()
const app=express()

//databae
connectDB()

//middleware
app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send({
        message:"Welcome"
    })
})
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${process.env.PORT}`)
})