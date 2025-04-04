import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../Slice/apiCartSlice';

const PaymentScreen = () => {
        const [paymentMethod,setPaymentMethod]=useState('PayPal');
        const dispatch=useDispatch();
        const navigate=useNavigate();

        const cart=useSelector(state=>state.cart);
        const {shippingAddress}=cart;

        const submitHandler=(e)=>{
            e.preventDefault();
            dispatch(savePaymentMethod(paymentMethod));
            navigate('/placeorder');
        }

        useEffect(()=>{
            if(!shippingAddress)
                navigate('/shipping');
        },[shippingAddress,navigate]);
    return (
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method </Form.Label>
                        <Col>
                            <Form.Check type='radio' className='my-2' id='PayPal' label='PayPal or Credit Card' name='paymentMethod' value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}>
                             
                            </Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>
    )
}

export default PaymentScreen