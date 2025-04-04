import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true});

userSchema.methods.ComparePassword=async function (EnteredPass){
    return bcrypt.compare(EnteredPass,this.password);
}

userSchema.pre("save",async function (next){

    if(!this.isModified('password')){
        next()
    }

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
}) 

const User=mongoose.model("User",userSchema);
export default User;