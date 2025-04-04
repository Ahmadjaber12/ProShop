import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row,Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Spinner'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {useDeliveredOrderMutation, useGetOrderByIdQuery ,useGetPaypalClientIdQuery, usePayOrderMutation} from '../Slice/apiOrderSlice'

const OrderScreen = ()=> {

    const {id:orderId}=useParams();
    
    const {data:order, error,refetch,isLoading}=useGetOrderByIdQuery(orderId);

    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation();

    const [{isPending},paypalDispatch]=usePayPalScriptReducer();

    const {userInfo}=useSelector((state)=> state.auth);

    const {data:paypal,isLoading:loadingPayPal, error:errorPayPal}=useGetPaypalClientIdQuery();

    const [deliveredOrder,{isLoading:loadingDeliver}]=useDeliveredOrderMutation();

    const deliveredOrderHandler=async()=>{
     
     try{ 
      
      await deliveredOrder(orderId);
      refetch();
      toast.success('Order Delivered')
      
    }catch(err){
      toast.error(err?.data?.message || err.message)
    }
  
  }
    
    function onApprove(data,actions){
        return actions.order.capture().then(async function(details){
          try{
            await payOrder({orderId,details});
            refetch();
            toast.success('Payment successful');
          }catch(error){
            toast.error(error?.data?.message || error.message)
          }
        })
    }

    async function onApproveTest(){
      await payOrder({orderId,details:{payer:{}}});
            refetch();
            toast.success('Payment successful');
    }

    function onError(err){
      toast.error(err.message)
    }

    function createOrder(data,actions){
        return actions.order.create({
          purchase_units:[{
            amount:{
              value:order.data.totalPrice
            }
          }]
        }).then((orderId)=> {return orderId})
    }
    
    useEffect(()=>{
      if(!errorPayPal && !loadingPay && paypal?.clientId){
        const loadPayPalScript = async ()=>{
          paypalDispatch({
            type:'resetOptions',
            value:{
              'client-id':paypal.clientId,
              currency:'USD'
            }
          });
          paypalDispatch({type: 'setLoadingStatus', value:'pending'})
        }
        if(order && !order.data.isPaid){
          if(!window.paypal)
            loadPayPalScript();
        }
        console.log(paypal.clientId);
        console.log(order);

      }
     
    },[order,paypal,paypalDispatch,isLoading,errorPayPal,loadingPay])

      

   return isLoading ? <Loader/> : error ? <Message varient='danger'/> :(
    <>
      <h1>Order {order.data._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.data.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.data.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.data.shippingAddress.address}, {order.data.shippingAddress.city}{' '}
                {order.data.shippingAddress.postalCode}, {' '}
                {order.data.shippingAddress.country}
              </p>
              {order.data.isDelivered ? (
                <Message varient='success'>
                Delivered on {order.data.dliveredAt}
                </Message>
              ):(
                <Message varient='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>PayPal
                {order.data.paymentMethod}
              </p>
              {order.data.isPaid ? (
                <Message varient='success'>
                Delivered on {order.data.paidAt}
                </Message>
              ):(
                <Message varient='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>
                Order Items
              </h2>
              {order.data.orderItems.map((item,index)=>(
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.data.itemsPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.data.ShippingPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.data.taxPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Total</Col>
                      <Col>${order.data.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.data.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {isPending ? <Loader/> :(
                        <div>
                          <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>Test Pay Order</Button>
                          <div>
                             <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons> 
                        </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}

                  {loadingDeliver && <Loader/>}

                  {userInfo && userInfo.isAdmin && order.data.isPaid && !order.data.isDelivered && (

                    <ListGroup.Item>
                      <Button type='button' className='btn btn-block' onClick={deliveredOrderHandler}>Mark as Delivered</Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen