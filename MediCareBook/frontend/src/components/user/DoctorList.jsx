import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {

   const [dateTime, setDateTime] = useState('');
   const [documentFile, setDocumentFile] = useState(null);
   const [show, setShow] = useState(false);
   const [cardStyle, setCardStyle] = useState({
      width: '18rem',
      border: '1px solid #ddd',
      backgroundColor: '#E5D9F2',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '20px',
      padding: '10px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
   });

   const currentDate = new Date().toISOString().slice(0, 16);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleChange = (event) => {
      setDateTime(event.target.value);
   };

   const handleDocumentChange = (event) => {
      setDocumentFile(event.target.files[0]);
   };

   const handleBook = async (e) => {
      e.preventDefault();
      try {
         const formattedDateTime = dateTime.replace('T', ' ');
         const formData = new FormData();
         formData.append('image', documentFile);
         formData.append('date', formattedDateTime);
         formData.append('userId', userDoctorId);
         formData.append('doctorId', doctor._id);
         formData.append('userInfo', JSON.stringify(userdata));
         formData.append('doctorInfo', JSON.stringify(doctor));

         const res = await axios.post('http://localhost:8001/api/user/getappointment', formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
               'Content-Type': 'multipart/form-data',
            },
         });

         if (res.data.success) {
            message.success(res.data.message);
         } else {
            message.error(res.data.success);
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Inline style objects
   const titleStyle = {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
   };

   const textStyle = {
      fontSize: '14px',
      color: '#555',
   };

   const buttonStyle = {
      display: 'block',
      width: '100%',
      margin: '10px 0',
      backgroundColor: '#A594F9',
      fontWeight: 'bold',
      border: 'none',
      padding: '8px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
   };

   const buttonHoverStyle = {
      backgroundColor: '#0056b3',
   };

   const modalBodyStyle = {
      padding: '20px',
   };

   const formControlStyle = {
      borderRadius: '4px',
      padding: '6px',
   };

   const modalFooterButtonStyle = {
      fontWeight: 'bold',
      padding: '10px 20px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
   };

   return (
      <Card
         style={cardStyle}
         onMouseOver={() =>
            setCardStyle((prevStyle) => ({
               ...prevStyle,
               transform: 'scale(1.05)',
               boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
            }))
         }
         onMouseOut={() =>
            setCardStyle((prevStyle) => ({
               ...prevStyle,
               transform: 'scale(1)',
               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }))
         }
      >
         <Card.Body>
            <Card.Title style={titleStyle}>Dr. {doctor.fullName}</Card.Title>
            <Card.Text style={textStyle}>
               <p>Phone: <b>{doctor.phone}</b></p>
               <p>Address: <b>{doctor.address}</b></p>
               <p>Specialization: <b>{doctor.specialization}</b></p>
               <p>Experience: <b>{doctor.experience} Yrs</b></p>
               <p>Fees: <b>{doctor.fees}</b></p>
               <p>Timing: <b>{doctor.timings[0]} : {doctor.timings[1]}</b></p>
            </Card.Text>
            <Button
               variant="primary"
               onClick={handleShow}
               style={buttonStyle}
               onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
               onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
               Book Now
            </Button>
            <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Booking Appointment</Modal.Title>
               </Modal.Header>
               <Form onSubmit={handleBook}>
                  <Modal.Body style={modalBodyStyle}>
                     <strong><u>Doctor Details:</u></strong>
                     <br />
                     Name: {doctor.fullName}
                     <hr />
                     Specialization: <b>{doctor.specialization}</b>
                     <hr />
                     <Row className="mb-3">
                        <Col md={{ span: 8, offset: 2 }}>
                           <Form.Group controlId="formFileSm" className="mb-3">
                              <Form.Label>Appointment Date and Time:</Form.Label>
                              <Form.Control
                                 name="date"
                                 type="datetime-local"
                                 size="sm"
                                 min={currentDate}
                                 value={dateTime}
                                 onChange={handleChange}
                                 style={formControlStyle}
                              />
                           </Form.Group>
                           <Form.Group controlId="formFileSm" className="mb-3">
                              <Form.Label>Documents</Form.Label>
                              <Form.Control
                                 accept="image/*"
                                 type="file"
                                 size="sm"
                                 onChange={handleDocumentChange}
                                 style={formControlStyle}
                              />
                           </Form.Group>
                        </Col>
                     </Row>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{ ...modalFooterButtonStyle, backgroundColor: '#6c757d', color: 'white' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                     >
                        Close
                     </Button>
                     <Button
                        type="submit"
                        variant="primary"
                        style={{ ...modalFooterButtonStyle, backgroundColor: '#007bff', color: 'white' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                     >
                        Book
                     </Button>
                  </Modal.Footer>
               </Form>
            </Modal>
         </Card.Body>
      </Card>
   );
};

export default DoctorList;
