import React, { useEffect } from 'react'
import { Outlet,Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Slice/apiAuthSlice';
import { useGetMyOrdersQuery } from '../Slice/apiOrderSlice';

const PrivateRoute = () => {
    const {userInfo}=useSelector(state=>state.auth);
    const dispatch=useDispatch()
    const { error } = useGetMyOrdersQuery();
    const navigate=useNavigate()
      
    useEffect(()=>{
      if (error?.status === 401) {
        dispatch(logout());
        navigate('/login')
    }},[dispatch,error,navigate])
  return userInfo ? <Outlet/> : <Navigate to='/login' replace />
}

export default PrivateRoute