import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/bootstrap.custom.css';
import './assets/index.css';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"

import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductsScreen'
import {Provider} from 'react-redux'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import store from './Store';
import CartScreen from './Screens/CartScreen';
import LogScreen from './Screens/LogScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PrivateAdminRoute from './components/PrivateAdminRoutes';
import OrdersListScreen from './Screens/Admin/OrdersListScreen';
import ProductsListScreen from './Screens/Admin/ProductsListScreen';
import ProductEditScreen from './Screens/Admin/ProductEditScreen';
import UsersListScreen from './Screens/Admin/UsersListScreen';
import UserEditScreen from './Screens/Admin/UserEditScreen';
const router=createBrowserRouter(

  createRoutesFromElements(
              <Route path='/' element={<App/>}>
                <Route index={true} path='/' element={<HomeScreen/>} />
                <Route  path='/search/:keyword' element={<HomeScreen/>} />
                <Route  path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>} />
                <Route  path='/product/:id' element={<ProductScreen/>} />
                <Route  path='/page/:pageNumber' element={<HomeScreen/>} />
                <Route  path='/cart' element={<CartScreen/>} />
                <Route  path='/login' element={<LogScreen/>}/>
                <Route  path='/register' element={<RegisterScreen/>}/>
                <Route  path='' element={<PrivateRoute/> }>
                   <Route  path='/shipping' element={<ShippingScreen/>}/>
                    <Route path='/payment' element={<PaymentScreen/>}/>
                    <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
                    <Route path='/orders/:id' element={<OrderScreen/>}/>
                    <Route path='/profile'    element={<ProfileScreen/>}/>
                  
                </Route>
                <Route path='' element={<PrivateAdminRoute/>}>
                  <Route path='/admin/OrdersList' element={<OrdersListScreen/>}/>
                  <Route path='/admin/productsList' element={<ProductsListScreen/>}/>
                  <Route path='/admin/productsList/:pageNumber' element={<ProductsListScreen/>}/>
                  <Route path='/admin/Productedit/:id' element={<ProductEditScreen/>}/>
                  <Route path='/admin/UsersList' element={<UsersListScreen/>}/>
                  <Route path='/admin/User/edit/:id' element={<UserEditScreen/>}/>


                </Route>

              </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);


