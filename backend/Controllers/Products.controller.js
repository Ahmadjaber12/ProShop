import Product from "../Models/productSchema.js";

export const getAllProducts=async (req, res) => {

    const keyword=req.query.keyword ? {name:{$regex:req.query.keyword, $options:'i'}} :{};
    const pageSize=8;
    const page=Number(req.query.pageNumber) || 1;
    const count=await Product.countDocuments({...keyword});
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1));
    return res.json({products,page,pages:Math.ceil(count / pageSize)});
}

export const getById=async (req, res) => {
    
    const {id}=req.params;
    const product=await Product.findById(id);
    res.json(product);

}


export const CreateAdminProducts=async (req, res) => {
    console.log(req.userId);
    
    const product=new Product({
        name:'Sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:"sample description"
    });
    const createdProduct=product.save()
    return res.status(201).json(createdProduct);
}

export const UpdateAdminProduct=async(req,res)=>{
    const {name,price,description,countInStock,image,category}=req.body;
    console.log(req.params.id);
    
    const prod= await Product.findById(req.params.id) 
    console.log("Updated Product is",prod);
    
    if(prod){
        prod.name=name;
        prod.price=price;
        prod.image=image;
        prod.description=description;
        prod.category=category;
        prod.countInStock=countInStock

        const updatedProd=await prod.save();
        res.json(updatedProd)
    }
    else{
        res.status(404).json({message:"product not found"});
    }

}

export const DeleteAdminProduct= async (req,res)=>{
    
    const prod= await Product.findById(req.params.id) 
    console.log(req.params.id);
    
    if(prod){
       await Product.deleteOne({_id:prod._id});
        res.status(200).json({message:"Product Deleted"})
    }
    else{
        res.status(404).json({message:"product not found"});
    }

}

export const CreateProductReview=async (req,res)=>{

    const {rating,comment}=req.body;
    console.log(req.params.id);
    
    const product=await Product.findById(req.params.id);

    if(product){


        const AlreadyReviewed=product.reviews.find(
            (rev)=>rev.user.toString() === req.user._id.toString());

        if(AlreadyReviewed){
            res.status(400).json({message:"Already Reviewed"});
        }
        else{

            const review={
                name:req.user.name,
                rating:+rating,
                comment,
                user:req.user._id
            };

            product.reviews.push(review);

            product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length;

            await product.save();

            res.status(201).json({message:'Review added'});

        }
    }
    else{
        res.status(404).json('Resourse not found');
    }
}

export const getTopProducts=async(req,res)=>{

    const products=await Product.find().sort({rating:-1}).limit(3);
    res.status(200).json(products);
}