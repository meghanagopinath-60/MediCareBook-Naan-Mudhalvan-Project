import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import photo1 from '../../images/photo1.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '', password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const isLoggedIn = JSON.parse(localStorage.getItem("userData"));
        const { type } = isLoggedIn
        
        switch (type) {
          case "admin":
            navigate("/adminHome")
            break;
          case "user":
            navigate("/userhome")
            break;

          default:
            navigate("/Login")
            break;
        }
      }
      else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong')

    }
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/'}>MediCareBook</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
              <Link className="nav-link" to={'/'}>Home</Link>
              <Link className="nav-link" to={'/login'}>Login</Link>
              <Link className="nav-link" to={'/register'}>Register</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <MDBContainer className="mdb-container my-5">
          <MDBCard className="mdb-card">
            <MDBRow className="g-0">
              <MDBCol md='6'>
                <MDBCardImage src={photo1} alt="login form" className="img-fluid w-100" />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='mdb-card-body d-flex flex-column'>
                  <h1 className="h1 fw-bold">Sign in to your account</h1>
                  <Form onSubmit={handleSubmit}>
                    <label className="form-label">Email</label>
                    <MDBInput
                      className="mdb-input"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      id="formControlLgEmail"
                      type="email"
                      autoComplete='off'
                    />
                    <label className="form-label">Password</label>
                    <MDBInput
                      className="mdb-input"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      id="formControlLgPassword"
                      type="password"
                      autoComplete='off'
                    />
                    <Button className="mb-4 px-5" size='lg' type='submit'>Login</Button>
                  </Form>
                  <p style={{ color: '#393f81' }}>
                    Don't have an account? <Link to={'/register'}>Register here</Link>
                  </p>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>

    </>
  );
}

export default Login;