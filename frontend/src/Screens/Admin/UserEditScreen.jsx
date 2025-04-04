import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom' 
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Spinner'
import { Form ,Button} from 'react-bootstrap'
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../Slice/UserSlice'

const UserEditScreen = () => {
    const {id:userId}=useParams();

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [isAdmin,setIsAdmin]=useState(false)


    const {data:user,refetch,error,isLoading}=useGetUserByIdQuery(userId)

    const [UpdateUser,{isLoading:loadingUpdate}]=useUpdateUserMutation()




    const navigate=useNavigate();


    
    useEffect(()=>{

        if(user){
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            
        }
    },[user])


    const submitHandler=async (e) =>{
            e.preventDefault();
            try {
                await UpdateUser({userId,name,email,isAdmin});
                toast.success('User updated successfully');
                refetch();
                navigate('/admin/userslist')
                
            } catch (err) {
                toast.error(err)
            }       
           
    }

   

  return (

    <>
        <Link to={'/admin/usersList'} className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {isLoading ? <Loader/> :error ? <Message varient='danger'>{error}</Message> :(

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            >

                            </Form.Control>
                        </Form.Group>

                       <Form.Group controlId='isAdmin' className='my-2'>
                        <Form.Check 
                        disabled={!isAdmin}
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}>

                        </Form.Check>
                       </Form.Group>
                        <Button type='submit' variant='primary' className='my-2'>Update</Button>
                    </Form>
                )}
        </FormContainer>
    </>
  )
}

export default UserEditScreen