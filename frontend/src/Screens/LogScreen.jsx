import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form ,Col,Row, Button} from 'react-bootstrap'
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../components/Spinner';
import { useLoginMutation } from '../Slice/UserSlice';
import { setCredentials } from '../Slice/apiAuthSlice';
import {toast} from 'react-toastify';

const LogScreen = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [login,{isloading}]= useLoginMutation();

    const {search}=useLocation();
    const sp= new URLSearchParams(search);
    const redirect=sp.get('redirect') || '/';
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {userInfo}=useSelector((state)=>state.auth);

    useEffect(()=>{
        if(userInfo)
        {
            navigate(redirect);
        }
    },[userInfo,redirect,navigate])

    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
            const res= await login({email,password}).unwrap();
            dispatch(setCredentials({...res,}));
            navigate(redirect);
        }catch(error){
            toast.error(error?.data.Message)
            
        }
    }
  return (
    <FormContainer>
    <h1>Sign In</h1>

    <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
              value={email} onChange={(e)=>setEmail(e.target.value)}>
                
              </Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
              value={password} onChange={(e)=>setPassword(e.target.value)}>
                
              </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" disabled={isloading}>
            Sign In
        </Button>
        {isloading && <Loader/>}
    </Form>
    <Row className="py-3">
        <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` :'/register'}>Register</Link>
        </Col>
    </Row>
</FormContainer>
)

}

export default LogScreen