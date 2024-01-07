import mongoose from 'mongoose'

 const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL)
        console.log(`connetcted database ${connect.connection.host}`)
    } catch (error) {
        console.log(`error in mongodb ${error}`)
    }
}

export default connectDB