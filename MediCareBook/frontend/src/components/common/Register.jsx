import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd'
import p2 from '../../images/p2.png'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import './Login.css'


const Register = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: '', email: '', password: '', phone: '', type: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8001/api/user/register', user)
      if (res.data.success) {
        message.success('Registered Successfully')
        navigate('/login')
      }
      else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }

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
              <MDBCardBody className='mdb-card-body d-flex flex-column'>
                <h1 className="h1 fw-bold">Sign up to your account</h1>
                  <Form onSubmit={handleSubmit} >
                    <label className="form-label" for="formControlLg">Full name</label>
                    <MDBInput
                      className="mdb-input"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      id="formControlLgFullName"
                      type="text"
                      autoComplete='off'
                      required
                    />
                    <label class="form-label" for="formControlLg">Email</label>
                    <MDBInput
                      className="mdb-input"
                      name='email'
                      value={user.email}
                      onChange={handleChange}
                      id="formControlLgEmail"
                      type="email"
                      autoComplete='off'
                      required
                    />

                    <label class="form-label" for="formControlLg">Password</label>
                    <MDBInput
                      className="mdb-input"
                      name='password'
                      value={user.password}
                      onChange={handleChange}
                      id="formControlLgPassword"
                      type='password'
                      autoComplete='off'
                      required
                    />

                    <label class="form-label" for="formControlLg">Phone</label>
                    <MDBInput
                      className="mdb-input"
                      name='phone'
                      value={user.phone}
                      onChange={handleChange}
                      id="formControlLgPhone"
                      type='phone'
                      autoComplete='off'
                      required

                    />

                    <Container className='my-3'>
                      <MDBRadio
                        name='type'
                        id='inlineRadio1'
                        checked={user.type === 'admin'}
                        value='admin'
                        onChange={handleChange}
                        label='Admin'
                        inline
                      />
                      <MDBRadio
                        name='type'
                        id='inlineRadio2'
                        checked={user.type === 'user'}
                        value='user'
                        onChange={handleChange}
                        label='User'
                        inline
                      />
                    </Container>
                    <Button className="mb-4 px-5" size='lg' type='submit'>Register</Button>
                  </Form>
                  <p style={{ color: '#393f81' }}>Have an account? <Link to={'/login'}>Login here</Link></p>
                </MDBCardBody>
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardImage src={p2} alt="login form" className="img-fluid w-100" />
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
    </>
  )
}

export default Register
