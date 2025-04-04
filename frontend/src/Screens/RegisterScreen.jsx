import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form ,Col,Row, Button} from 'react-bootstrap'
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../components/Spinner';
import { useRegisterMutation } from '../Slice/UserSlice';
import { setCredentials } from '../Slice/apiAuthSlice';
import {toast} from 'react-toastify';

const RegisterScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');


    const [register,{isloading}]= useRegisterMutation();

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
        if(password !== confirmPassword)
           { toast.error('Passwords do not match');
            return; }
        try{
            const res= await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res,}));
            navigate(redirect);
        }catch(error){
            toast.error(error?.data.Message)
            
        }
    }
  return (
    <FormContainer>
    <h1>Sign Up</h1>

    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name' className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name"
              value={name} onChange={(e)=>setName(e.target.value)}>
                
              </Form.Control>
        </Form.Group>

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

        <Form.Group controlId='confirmPassword' className="my-3">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
              value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                
              </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" disabled={isloading}>
            Sign Up
        </Button>
        {isloading && <Loader/>}
    </Form>
    <Row className="py-3">
        <Col>
            Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` :'/login'}>login</Link>
        </Col>
    </Row>
</FormContainer>
)

}

export default RegisterScreen