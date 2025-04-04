import mongoose, { Schema } from "mongoose";

const connection=async()=>{
    const connect = await mongoose.connect(process.env.Mongo_URI).then(()=>{
        console.log("Connected Successfully");
        
    }).catch(err=>{
        console.log(err.message);
        
    })
}
export default connection;