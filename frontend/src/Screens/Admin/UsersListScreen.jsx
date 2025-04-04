import React from 'react'
import {Table,Button} from 'react-bootstrap';
import {FaTimes,FaTrash,FaEdit,FaCheck} from 'react-icons/fa';
import {useDeleteUserMutation,useGetAdminUsersQuery} from '../../Slice/UserSlice';
import Loader from '../../components/Spinner'
import Message from '../../components/Message'
import {Link} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const UsersListScreen = () => {


  const {data:users,refetch,error,isLoading}=useGetAdminUsersQuery();

  const [deleteUser,{isLoading:loadingDelete}]=useDeleteUserMutation();
  console.log(users);

  const daleteHandler=async(id)=>{
       try {
        await deleteUser(id)
        toast.success("User Deleted");
        refetch();

       } catch (err) {
            toast.error(err?.data?.message || err.error)
       }
  }
  
  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader/>}
      {isLoading ? <Loader/> : error ? (


          <Message varient='danger' >{error}</Message>

          ) : (
              <Table striped hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>IsAdmin</th>
                      <th></th>
                      </tr>
                      </thead>
                      <tbody>
                        {users.map((user)=>(
                          <tr key={user._id}>
                             <td>{user._id}</td>
                              <td>{user.name}</td>
                              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                              <td> {user.isAdmin ?(
                                    <FaCheck style={{color:'green'}}/>
                                ) : (
                                    <FaTimes style={{color:'red'}}/>
                                )}
                              </td>
                              <td>

                                    <LinkContainer to={`/admin/user/edit/${user._id}`}>
                                  <Button
                                   variant='light'
                                    className='btn-sm'>
                                    <FaEdit/>
                                  </Button>
                                  </LinkContainer>
                                  <Button variant='danger' className='btn-sm' onClick={()=>daleteHandler(user._id)}>
                                    <FaTrash style={{color:"white"}}/>
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


export default UsersListScreen