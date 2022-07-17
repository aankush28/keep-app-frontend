import React, { useEffect } from "react";
import{  Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../redux/action/userAction'
export default function Header({setSearch}) {
const navigate = useNavigate();

  const dispatch = useDispatch()
  const userLogin = useSelector((state)=>state.userLogin);
  const {userInfo}= userLogin
  
  const logouthandela = ()=>{
    dispatch(logout());
    localStorage.removeItem('userInfo');
    navigate('/')

  }
  useEffect(() => {}, [userInfo]);
  return (
    <div> <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Container fluid>
      <Navbar.Brand > <Link to={"/"}> Keep App</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="m-auto"
        
        >
            <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e)=>setSearch(e.target.value)}
          />
          
        </Form>
        </Nav>
       {userInfo? <Nav>
          <Nav.Link>
            <Link to={'/mynote'}>
            My Note</Link></Nav.Link>
          <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
            <NavDropdown.Item ><Link to={"/profile"}> My Profile</Link></NavDropdown.Item>
            <NavDropdown.Item onClick={logouthandela }>
              Logout
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        
        </Nav>:<Nav><Navbar.Brand > <Link to={"/login"}> Login</Link></Navbar.Brand></Nav>}
        
      </Navbar.Collapse>
    </Container>
  </Navbar></div>
  )
}
