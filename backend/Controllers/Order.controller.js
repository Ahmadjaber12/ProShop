import order from "../Models/orderSchema.js";

export const addOrderItems=async (req,res)=>{
    const {
        orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice
    }=req.body;
    if(orderItems && orderItems.length==0)
    {
        res.status(400).json({message:"No order Items"})
    }
    else{
        const neworder=new order({
            orderItems:orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,shippingPrice,totalPrice
        })
        const createdOrder=await neworder.save();
        res.status(201).json({message:neworder});
    }

   
}
export const getAdminOrders=async (req,res)=>{
    const orders=await order.find().populate('user','id name');
    res.status(200).json(orders);
}

export const getAllOrders=async (req,res)=>{
    const orders=await order.find({user:req.user._id});
    res.json(orders);
}

export const getOrderById=async (req,res)=>{
    const {id}=req.params;
    const orderById=await order.findById(id).populate('user','name email')

    if(orderById){
        res.status(200).json({data:orderById});
    }
    else
{    res.status(404).json({message:"order not found"});
}}

export const UpdateOrderToPaid=async (req,res)=>{

    const Updatedorder=await order.findById(req.params.id);

    if(Updatedorder){
        Updatedorder.isPaid=true;
        Updatedorder.paidAt=Date.now();
        Updatedorder.paymentMethod={

            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_Address:req.body.email_Address

        }
        const Updatorder=await Updatedorder.save();
        res.status(200).json(Updatorder);
    
    }
    else{
        res.status(404).json("Order Not Found")
    }
}

export const UpdateOrderToDelivered=async (req,res)=>{

    const {id}=req.params;
    const ordr=await order.findById(id);
    console.log(ordr);
    
    if(ordr)
{   
    ordr.isDelivered=true
    ordr.dliveredAt=Date.now()

    const UpdatedOrder=await ordr.save();

    res.status(200).json(UpdatedOrder)
}   

    else{
        res.status(404).json({message:"Order not found"});
    }
   
}
