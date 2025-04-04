import {Navbar,Nav,Container,Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart , FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector ,useDispatch} from 'react-redux';
import {  useNavigate} from 'react-router-dom';
import { useLogoutMutation } from '../Slice/UserSlice';
import { logout } from '../Slice/apiAuthSlice';
import { toast } from 'react-toastify';
import { useGetMyOrdersQuery } from '../Slice/apiOrderSlice';
import { useEffect } from 'react';
import Search from './Search';

const Header = () => {

  const {cartItems}=useSelector((state)=>state.cart);
  const {userInfo}=useSelector((state)=>state.auth);

  const dispatch=useDispatch();
  const navigate=useNavigate();

    const {error}=useGetMyOrdersQuery();

  const [logoutApiCall]=useLogoutMutation();

  
  useEffect(()=>{
    if(error?.status===401){

      dispatch(logout())
      toast.error('Your Session has expired')
      navigate('/login')
    }
  },[dispatch,error,navigate])

  const logoutHandler=async()=>{

        try{
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/login');
        }
        catch(error){
            console.log(error);
            
        }
  
  }
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand >ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                        <Search/>
                        <LinkContainer to='/cart'>

                        <Nav.Link > <FaShoppingCart/> Cart
                          {cartItems.length > 0 && (
                            <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                {cartItems.reduce((a,c)=> a + c.qty,0)}
                            </Badge>
                          )}
                        </Nav.Link> 
                          </LinkContainer>
                        {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item> 
                           </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                           </NavDropdown.Item>
                           
                          </NavDropdown>) :(
                            <LinkContainer to='/login'>
                            <Nav.Link> <FaUser/> Sign In</Nav.Link>
                               </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                              <LinkContainer to='/admin/orderslist'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                              </LinkContainer>

                              <LinkContainer to='/admin/productslist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                              </LinkContainer>

                              <LinkContainer to='/admin/Userslist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                              </LinkContainer>
                            </NavDropdown>
                        )}
                         
                      </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
  )
}

export default Header