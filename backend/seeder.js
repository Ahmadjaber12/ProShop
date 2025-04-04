import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors"
import order from "./Models/orderSchema.js";
import Product from "./Models/productSchema.js";
import User from "./Models/UserSchema.js";
import users from "./Data/user.js";
import products from "./products.js";
import connection from "./Config/DB.js";

dotenv.config();
connection();
const importData=async()=>{
    try{
        await order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers=await User.insertMany(users);
        const adminUser=createdUsers[0]._id;

        const sampleProduct=products.map((product)=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProduct);

        console.log('Data Imported'.green.inverse);
        process.exit();

    }
    catch(err){
        console.log(`${err.message}`.red.inverse);
        process.exit(1);
        
    }
}
importData();