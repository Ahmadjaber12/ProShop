import { Row,Col } from "react-bootstrap"
import Product from "../components/product.jsx"

import { useGetProductsQuery } from "../Slice/apiProductSlice.js"
import Loader from "../components/Spinner.jsx";
import Message from "../components/Message.jsx";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

const HomeScreen = () => {
 
 const {pageNumber,keyword}=useParams();
 const {data,error,isLoading}  =useGetProductsQuery({keyword,pageNumber});
  return (

    <>
      {!keyword ? (<ProductCarousel/>) : (
        <Link to='/' className="btn btn-light">Go Back</Link>
      )}
      {isLoading ?(
        <Loader/>)
        :error ? (<Message varient='danger'>{error?.data?.message || error.error}</Message>):(
          <>
          <h1>Latest Products</h1>
          <Row>
         {data.products.map((p)=>(

                 <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                    <Product prod={p}/>  {p.name}
                 </Col>
         ))}
     </Row>
     <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword :''}/>
     </>
      )} 
    </>
  
)}

export default HomeScreen