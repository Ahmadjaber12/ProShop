import express  from 'express'
import dotenv from 'dotenv'
import connection from './Config/DB.js'
import router from './Routes/Product.Router.js'
import Userrouter from './Routes/User.Router.js'
import cookieParser from 'cookie-parser'
import OrderRouter from './Routes/Order.Router.js'
import cors from 'cors'
import path from 'path'
import uploadFile from './Services/UploadFile.js'
import { errorHandler, notFound } from './Middleware/errorHandler.js'
dotenv.config()
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true})); //get data from a form
app.use(cors({ origin: "http://localhost:3000" }));
const port = process.env.PORT
 
connection();
console.log(process.env.PAYPAL_CLIENT_ID);
const __dirname=path.resolve();
app.use("/api/user",Userrouter);
app.use("/api/product",router);
app.use("/orders",OrderRouter);
app.use('/api/uploads',uploadFile)

app.get('/api/config/paypal',(req,res)=>{
    res.json({clientId: process.env.PAYPAL_CLIENT_ID});
})

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
if(process.env.NODE_ENV === 'production'){

        app.use(express.static(path.join(__dirname,'/frontend/build')))

        app.get('*',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
        })
}
app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))