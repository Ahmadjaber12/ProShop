import React from 'react'
import { Table,Row,Col,Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Spinner'
import { FaTimes,FaEdit,FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../../Slice/apiProductSlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'
const ProductsListScreen = () => {
    const {pageNumber}=useParams();
    const {data,isLoading,error,refetch}=useGetProductsQuery({pageNumber})

    const [createProduct,{isLoading:loadingCreate}]=useCreateProductMutation()

    const [DeleteProduct,{isLoading:loadingDelete}]=useDeleteProductMutation()

   
       const deleteHandler=async(id)=>{
        console.log(id);
        
          await DeleteProduct(id);
          toast.success('Product Deleted')
           refetch();
           }

    const createProductHandler=async()=>{
        if(window.confirm('Are you sure you want to add a new product?'))
        {
            try{
                await createProduct();
                refetch();
            }catch(err){
                console.log(err); 
                toast.error(err.error)   
            }
        }
    }
  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>
                    Products
                </h1>

            </Col>

            <Col className='text-end'>
                    <Button className='m-3 btn-sm' onClick={createProductHandler}>
                         <FaEdit/>   Create Product
                         
                    </Button>
                    
            </Col>
        </Row>
        {loadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}

        {isLoading ? <Loader/> :error ? <Message varient='danger'>{error}</Message> :(

            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((prod)=>(
                            <tr key={prod._id}>
                                <td>{prod._id}</td>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td>{prod.category}</td>
                                <td>
                                <LinkContainer to={`/admin/Productedit/${prod._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        <FaEdit/>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(prod._id)}>
                                        <FaTrash style={{color:"white"}}/>
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
            </>
        )}
    </>
  )
}

export default ProductsListScreen