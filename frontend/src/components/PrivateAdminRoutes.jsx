import React, { useEffect } from 'react'
import { Outlet,Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { logout } from '../Slice/apiAuthSlice';
import { useGetMyOrdersQuery } from '../Slice/apiOrderSlice';
import { toast } from 'react-toastify';

const PrivateAdminRoute = () => {
    const {userInfo}=useSelector(state=>state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace />
}

export default PrivateAdminRoute