import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from '../components/header/mainScreen'
import { useNavigate } from 'react-router-dom';
import '../LogingScreen/LogingScreen.css'
import Loading from '../components/Loding';
import ErrorMessage from '../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action/userAction';
function LogingScreen({history}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()



const userLogin = useSelector((state)=>state.userLogin);
const {loading,error,userInfo}= userLogin


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login(email,password))
  };

  useEffect(()=>{
    if(userInfo){
      navigate('/mynote')
    }
  },[history,userInfo])
  return (
    <div>
      <MainScreen title="LOGIN">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  )
}

export default LogingScreen