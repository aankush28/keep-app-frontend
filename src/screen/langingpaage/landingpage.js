import React, { useEffect } from 'react'
import { Button, Container, Row } from "react-bootstrap";
import {  Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import "./landingpage.css";
export default function Landingpage({history}) {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo')
    
    if(userInfo){
      navigate('/mynote')
    }
    },[ history])
  return (
    <div><div className="main">
    <Container>
    <Row>
    <div className="intro-text">
            <div>
              <h1 className="title text-light">Welcome to Keep note...</h1>
              <p className="subtitle text-muted">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              
                 <Link to='/login'><Button size="lg" className="landingbutton btn btn-danger">
                 
                  Login
                  
                </Button></Link>
              
              <Link to="/register">  <Button
                  variant="outline-success"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                  
                </Button></Link>
              
            </div>
          </div>
        
    </Row>
    </Container>
  </div></div>
  )
}
