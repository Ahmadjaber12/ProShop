import asyncHandler from "../Middleware/AsyncHandler.js";
import User from "../Models/UserSchema.js";
import bcrypt from "bcryptjs";
import { TokenGenerate } from "../Services/CreateToken.js";

export const authUser=asyncHandler( async(req,res)=>{

    const {email,password}=req.body;
    
    const existUser=await User.findOne({email})
    
    if(existUser && (await existUser.ComparePassword(password))){
       const token= TokenGenerate(existUser._id,"2h");

       res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000,
       })
         return res.json({
            _id:existUser._id,
            name:existUser.name,
            isAdmin:existUser.isAdmin,
            email:existUser.email
        })
    }
    else{
        res.status(401).json({Message:"Wrong User or Password"});
       
    }
})

export const getUserProfile=asyncHandler( async(req,res)=>{

    const user=await User.findById(req.user._id);
    if(user){
        res.json({Current_User:user})
    }
    else{
        res.status(404);
        throw new Error({message:"No User Found"});
    }
})

export const UpdateUserProfile=async(req,res)=>{

    const user=await User.findById(req.user._id);

    if (user){

        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;

    if(req.body.password){
        user.password=req.body.password ;
    }
    

    const updatedUser=await  user.save();

  res.status(200).json({

    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email
  });}
  else{
  res.status(404).json({message:"User Not Found"});
  }
}

export const logout=async (req,res)=>{

    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    });
    res.status(200).json({Message:"Logout Successfully"});
}

export const RegisterUser=asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body;

    const UserExist=await User.findOne({email});

    if(UserExist){
        res.status(400);
        res.json({message:'User already exist'});
    }
    const user=await User.create({name,email,password});

    if(!user){
        res.status(400)
        res.json({message:'Invalid User Data'})
    }
    else{
        res.json({message:"User created Successfully",
            id:user._id,
            name:user.name,
            isAdmin:user.isAdmin,
            email:user.email
    })
}})

export const getUsers=async (req,res)=>{
    const users=await User.find({});
    res.status(200).json(users);
}

export const getUserById=async (req,res)=>{
    const user=await User.findById(req.params.id);
    if(user){
        res.status(200).json(user)
    }
    else{

        res.status(404).json({message:"User Not Found"});
    }
}

export const deleteUser=async (req,res)=>{
    const user=await User.findById(req.params.id).select('-password');
    if(user){

        if(user.isAdmin)
        res.status(400).json({message:"Can't Delete the Admin"});
        else{
            await User.deleteOne({_id:user._id})
            res.status(200).json({message:"User Deleted Successfully"});

        }
    }
    else{
        res.status(404).json({message:"User Not Found"});

    }
}
export const UpdateUser=async (req,res)=>{

    const user=await User.findById(req.params.id);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.isAdmin=Boolean(req.body.isAdmin);

        const UpdatedUser=await user.save();

        res.status(200).json({
            _id:UpdatedUser._id,
            email:UpdatedUser.email,
            name:UpdatedUser.name,
            isAdmin:UpdatedUser.isAdmin
        })
    }
}