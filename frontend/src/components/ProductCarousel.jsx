import React from 'react'
import { useGetTopProductsQuery } from '../Slice/apiProductSlice'
import Loader from './Spinner';
import Message from './Message';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
    const {data:products,isLoading,error}=useGetTopProductsQuery();

  return isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :(

    <Carousel pause="hover" className='bg-primary mb-4'>
        {products.map(prod=>(

            <Carousel.Item key={prod._id}>
                <Link to={`/product/${prod._id}`}>
                    <Image src={prod.image} alt={prod.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{prod.name} (${prod.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
)
}

export default ProductCarousel