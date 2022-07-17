import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import ErrorMessage from "../components/ErrorMessage";
import MainScreen from '../components/header/mainScreen'
import Loading from "../components/Loding";
import { register } from '../redux/action/userAction';
import { useDispatch, useSelector } from "react-redux";
function RegisterScreen({history}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const submitHandler= async(e)=>{
    e.preventDefault();
/*     if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else{
      setMessage(null)
      try{
        const config={
          headers :{
            "Content-type":"application/json"
          }
        }
        const {data}= await axios.post('/api/users',{
         name,email,password,pic
        },config)
        console.log(data);
        localStorage.setItem('userInfo',JSON.stringify(data))
        setLoading(true)
        }catch(e){
          console.log(e);
          
        }
    } */
 
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password, pic));
  }
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [history, userInfo]);
  return (
    <div><MainScreen title="REGISTER">
    <div className="loginContainer">
   {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        
        {loading && <Loading />} 
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
<br />

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </div>
  </MainScreen></div>
  )
}

export default RegisterScreen