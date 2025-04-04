import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

const Search = () => {
    
    const {keyword:urlKeyowrd}=useParams();
    const navigate=useNavigate();
    const [keyword,setKeyword]=useState(urlKeyowrd || '');

    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            setKeyword('')
            navigate(`/search/${keyword}`)
        }
        else{
            navigate('/');
        }
    }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control type='text' name='q' onChange={(e)=>setKeyword( e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5'>

        </Form.Control>
        <Button type='submit' variant='outline-light' className='p-2 mx-2'>Search</Button>
    </Form>
  )
}

export default Search