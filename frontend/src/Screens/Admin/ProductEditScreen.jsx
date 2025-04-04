import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom' 
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Spinner'
import { Form ,Button} from 'react-bootstrap'
import { useUpdateProductMutation,useGetProductDetailsQuery,useDeleteProductMutation ,useUploadProductImgMutation} from '../../Slice/apiProductSlice'

const ProductEditScreen = () => {
    const {id}=useParams();

    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [image,setImage]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState('')
    const [description,setDescription]=useState('')

    const {data:product,refetch,error,isLoading}=useGetProductDetailsQuery(id)
    const [updateProduct,{isLoading:loadingUpdate}]=useUpdateProductMutation()

    const [UploadProductImg,{isLoading:loadingUpload}]=useUploadProductImgMutation()



    const navigate=useNavigate();


    
    useEffect(()=>{

        if(product){
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setDescription(product.description)
            setCountInStock(product.countInStock);
        }
    },[product])


    const submitHandler=async (e) =>{
            e.preventDefault();
            const updatedProduct={
                id,
                name,price,
                image,category,description,countInStock
            }
            const result=await updateProduct(updatedProduct);

            if(result.error){

                toast.error(result.error)
            }

            else{

                toast.success('Product updated');
                navigate('/admin/productslist')
            }
    }

    const UploadFileHandler=async (e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        
        try {

                const res = await UploadProductImg(formData).unwrap();
                toast.success(res.message);
                setImage(res.image)
            
        } catch (err) {
                toast.error(err?.data?.message || err.error)
        }
    }

  return (

    <>
        <Link to={'/admin/productsList'} className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {isLoading ? <Loader/> :error ? <Message varient='danger'>{error}</Message> :(

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='Image'className='my-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text'
                                placeholder='Upload Image'
                                value={image}
                                onChange={(e)=>setImage(e.target.value)}
                            >

                            </Form.Control>

                            <Form.Control type='file' Label="Choose file"
                            onChange={UploadFileHandler}/>
                        </Form.Group>

                        <Form.Group controlId='category'className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e)=>setCategory(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='my-2'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number'
                                placeholder='Enter count In Stock'
                                value={countInStock}
                                onChange={(e)=>setCountInStock(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className='my-2'>
                            <Form.Label>Discription</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter discription'
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='my-2'>Update</Button>
                    </Form>
                )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen