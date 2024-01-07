const express=require('express')
const colors=require('colors')
const app=express()

app.get('/',(req,res)=>{
    res.send({
        message:"Welcome"
    })
})
const PORT=8080;

app.listen(PORT,()=>{
    console.log("Server running on",PORT)
})