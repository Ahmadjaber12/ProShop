import React, { useState } from 'react'
import {Link, useParams , useNavigate } from 'react-router-dom'
import { Row, Col,Image,ListGroup,Card,Button, Form, FormControl, Toast } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useAddReviewMutation, useGetProductDetailsQuery } from '../Slice/apiProductSlice.js'
import Loader from '../components/Spinner.jsx'
import Message from '../components/Message.jsx'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Slice/apiCartSlice.js'
const ProductScreen = () => {
    const {id:productId}=useParams();

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {data:product,refetch,isLoading,error}=useGetProductDetailsQuery(productId);    
    
    const [AddReview,{isLoading:LoadingReview}]=useAddReviewMutation();    

    const [qty,setQty]=useState(1);
    const [comment,setComment]=useState('');

    console.log(productId);
    
    const [rating,setRating]=useState();

    const {userInfo}=useSelector((state)=>state.auth)


    const addToCartHandler=()=>{
            dispatch(addToCart({...product,qty}));
            navigate("/cart");
    }

    const submitHandler=async(e)=>{
            e.preventDefault();

            try {
                    await AddReview({
                        productId,
                        rating,
                        comment
                    }).unwrap()
                    refetch();
                    toast.success('Review Submitted');
                    setRating(0);
                    setComment('')
            } catch (err) {
                    toast.error(err?.data?.message || err.error)
            }
    }
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
        Go Back
    </Link>
    {isLoading ? (
        <Loader/>
    ): error ? (<Message varient='danger'>{error?.data?.message || error.error}</Message>): (
<>
<Row>
<Col md={5}>
        <Image src={product.image} alt={product.name}fluid/>
</Col>
<Col md={4}>
        <ListGroup variant='flush'>
             <ListGroup.Item>
                <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item >
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
             </ListGroup.Item>
             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
             <ListGroup.Item>Discription: {product.description}</ListGroup.Item>

        </ListGroup>
</Col>
<Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (

                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col> 
                                        <Form.Control as="select" value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((x)=>(
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                                </ListGroup.Item>

                    )}
                    <ListGroup.Item>
                    <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                            Add to Cart
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
</Col>
</Row>
        <Row className='review'>

                    <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((rev)=>(
                                <ListGroup.Item key={rev._id}>
                                    <strong>{rev.name}</strong>
                                    <Rating value={rev.rating}/>
                                    <p>{rev.createdAt.substring(0,10)}</p>
                                    <p>{rev.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {LoadingReview && <Loader/>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating' className='my-2'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating}onChange={(e)=>setRating(Number(e.target.value))}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 -  Poor </option>
                                            <option value='2'>1 -  Fair </option>
                                            <option value='3'>1 -  Good </option>
                                            <option value='4'>1 -  Very Good </option>
                                            <option value='5'>1 -  Excellent </option>


                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment' className='my-2'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}>

                                        </Form.Control>
                                        </Form.Group>
                                        <Button disabled={LoadingReview} type='submit' variant='primary'>
                                            Submit
                                        </Button>
                                    </Form>
                                ):(
                                    <Message>Please <Link to='/login'> sign in</Link> to write a review</Message>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
        </Row>
</>
    )}
    
    </>
  )
}

export default ProductScreen