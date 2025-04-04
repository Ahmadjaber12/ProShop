import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";
import cookieParser from "cookie-parser";

export const VerifyToken=async (req,res,next)=>{
       
    let token;

    token =req.cookies.jwt;

    if(!token){
        res.status(401).json({message:'Not Authorized,No token'});
        return;
    }
    try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            if(decoded)
                {req.user=await User.findById(decoded.userId).select("-password");
                    next();
            }   
             else{
                res.status(401).json({message:'Not Authorized, token Expired'});
                
            }
        }catch(error){
            console.log(error);
            res.status(401).json({message:'Not Authorized, token failed'});

        }
}

export const Admin=async (req,res,next)=>{
    if(req.user && req.user.isAdmin)
            next();
    else {
        res.status(401).json({message:'Not Authorized as an Admin'});
    }
}