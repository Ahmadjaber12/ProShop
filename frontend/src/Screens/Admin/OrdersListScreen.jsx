import React from 'react'
import {Table,Button} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import {useGetOrdersQuery} from '../../Slice/apiOrderSlice';
import Loader from '../../components/Spinner'
import Message from '../../components/Message'
import {Link} from 'react-router-dom'

const OrdersListScreen = () => {

  const {data:orders,error,isLoading}=useGetOrdersQuery();
  console.log(orders);
  
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? <Loader/> : error ? (

          <Message varient='danger' >{error}</Message>

          ) : (
              <Table striped hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>USER</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                      </tr>
                      </thead>
                      <tbody>
                        {orders.map((ordr)=>(
                          <tr key={ordr._id}>
                              <td>{ordr._id}</td>
                              <td>{ordr.user  && ordr.user.name}</td>
                              <td>{ordr.createdAt.substring(0,10)}</td>
                              <td>{ordr.totalPrice}</td>
                              <td> {ordr.isPaid ? (
                                ordr.paidAt.substring(0,10)
                              ): (
                                <FaTimes style={{color:"red"}}/>
                              )}
                              </td>

                              <td> {ordr.isDelivered ? (
                                ordr.dliveredAt.substring(0,10)
                              ): (
                                <FaTimes style={{color:"red"}}/>
                              )}
                              </td>
                              <td>
                                  <Button
                                    as={Link}
                                    to={`/orders/${ordr._id}`}
                                    variant='light'
                                    className='btn-sm'
                                  >
                                    Details
                                  </Button>
                                </td>
                          </tr>
                             ))}
                      </tbody> 
              </Table>
      )}
    </>
  )
}

export default OrdersListScreen