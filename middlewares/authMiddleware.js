import  Jwt  from "jsonwebtoken";
import User from '../models/user.js'

export const requireSignIn = async (req, res, next) => {
    try {
      const decode = Jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
}
  
export const isAdmin=async (req,res,next)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Acess"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
    }
}
