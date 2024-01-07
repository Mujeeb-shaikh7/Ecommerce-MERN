import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import User from '../models/user.js'
import  Jwt  from 'jsonwebtoken';
 export const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"already resgister please login"
            })
        }
        const hashed=await hashPassword(password);
        const user=await new User({
            name,
            email,
            password:hashed,
            phone,
            address,
            answer
        }).save();
        console.log(user)
        return res.status(201).send({
            success:true,
            message:"user resgister succesfuly",
            user
        })
    } catch (error) {
        console.log(`auth error ${error}`)
        return res.status(500).send({
            success:false,
            message:"error in registration",
            error
        })
    }
}

export const loginController=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(404).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email not found"
            })
        }
        const match=await comparePassword(password,user.password);
        console.log(match,user)

        if(!match){
            return res.status(200).send({
                success:false,
                message:"password not found"
            })
        }
        const token=await Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role: user.role,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}

export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };