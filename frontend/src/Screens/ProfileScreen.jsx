import React, { useEffect, useState } from 'react'
import { Col,Row,Table,Form,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import Loader from '../components/Spinner'
import { useProfileMutation } from '../Slice/UserSlice'
import { logout, setCredentials } from '../Slice/apiAuthSlice'
import Message from '../components/Message'
import { useGetMyOrdersQuery } from '../Slice/apiOrderSlice'
import {FaTimes} from 'react-icons/fa'
import {  useNavigate} from 'react-router-dom';


const ProfileScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {userInfo}=useSelector((state)=>state.auth);

    const [profile,{isLoading:loadingUpdateProfile}]=useProfileMutation();

    const {error,isLoading,data:orders,refetch}=useGetMyOrdersQuery();

   
    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
        refetch();
        
    },[userInfo])

    const submitHandler=async(e)=>{
            e.preventDefault();
            console.log('submitHandler');
            if(password !==confirmPassword){
                toast.error("Password doesn't match" )
            }
            else{
                try{
                    const res=await profile({_id:userInfo._id,name,email,password}).unwrap();
                    dispatch(setCredentials(res));
                    toast.success('Profile Updated Successfully!')

                }catch(error){
                    toast.error(error?.data?.message || error.error);
                    dispatch(logout());
                }
            }
            
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler} onLoad={true}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>Update</Button>
                {loadingUpdateProfile && <Loader/>}
            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {isLoading ? (
                <Loader/> 
            ): error ? (
                <Message varient='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                <td>{ordr.createdAt.substring(0,10)}</td>
                                <td>${ordr.totalPrice}</td>
                                <td>{ordr.isPaid ? (
                                    ordr.paidAt.substring(0,10)
                                ): (
                                    <FaTimes style={{color:'red'}}/>
                                )}</td>
                                 <td>{ordr.isDelivered ? (
                                    ordr.dliveredAt.substring(0,10)
                                ): (
                                    <FaTimes style={{color:'red'}}/>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/orders/${ordr._id}`}>
                                        <Button className='btn-sm' variant='light' type='submit'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                                </tr>
                        ))} 
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen