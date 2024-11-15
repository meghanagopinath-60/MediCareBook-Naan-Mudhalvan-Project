import { Col, Form, Input, Row, TimePicker, message, Select } from 'antd';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

function ApplyDoctor({ userId }) {
   const [doctor, setDoctor] = useState({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      specialization: '',
      experience: '',
      fees: '',
      timings: '',
   });

   const handleTimingChange = (_, timings) => {
      setDoctor({ ...doctor, timings });
   };

   const handleChange = (e) => {
      setDoctor({ ...doctor, [e.target.name]: e.target.value });
   };

   const handleSpecializationChange = (value) => {
      setDoctor({ ...doctor, specialization: value });
   };

   const handleSubmit = async () => {
      try {
         const res = await axios.post('http://localhost:8001/api/user/registerdoc', { doctor, userId: userId }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         });
         if (res.data.success) {
            message.success(res.data.message);
         } else {
            message.error(res.data.message);
         }
      } catch (error) {
         console.log(error);
         message.error('Something went wrong');
      }
   };

   return (
      <Container style={{
         maxWidth: '700px', 
         padding: '30px', 
         backgroundColor: '#e3f7f9', 
         borderRadius: '12px', 
         boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)', 
         marginTop: '20px'
      }}>
         <h2 className="text-center" style={{
            color: '#007bff', 
            marginBottom: '20px', 
            fontWeight: '700',
            fontSize: '24px'
         }}>Apply for Doctor</h2>
         
         <Form onFinish={handleSubmit} layout="vertical">
            <h5 style={{
               fontWeight: '600', 
               marginBottom: '10px',
               color: '#0056b3'
            }}>Personal Details:</h5>
            <Row gutter={16}>
               <Col xs={24} md={12}>
                  <Form.Item label="Full Name" required>
                     <Input 
                        name='fullName' 
                        value={doctor.fullName} 
                        onChange={handleChange} 
                        placeholder='Enter name' 
                        style={{ padding: '10px', borderRadius: '8px' }} 
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12}>
                  <Form.Item label="Email" required>
                     <Input 
                        name='email' 
                        value={doctor.email} 
                        onChange={handleChange} 
                        type='email' 
                        placeholder='Your email' 
                        style={{ padding: '10px', borderRadius: '8px' }} 
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12}>
                  <Form.Item label="Phone" required>
                     <Input 
                        name='phone' 
                        value={doctor.phone} 
                        onChange={handleChange} 
                        type='text' 
                        placeholder='Your phone number' 
                        style={{ padding: '10px', borderRadius: '8px' }} 
                     />
                  </Form.Item>
               </Col>

            </Row>
            
            <Form.Item label="Address" required>
               <Input 
                  name='address' 
                  value={doctor.address} 
                  onChange={handleChange} 
                  type='text' 
                  placeholder='Your address' 
                  style={{ padding: '10px', borderRadius: '8px' }} 
               />
            </Form.Item>
            
            <h5 style={{
               fontWeight: '600', 
               marginBottom: '10px',
               color: '#0056b3'
            }}>Professional Details:</h5>
            
            <Row gutter={16}>
               <Col xs={24} md={12}>
                  <Form.Item label="Specialization" required>
                     <Select
                        value={doctor.specialization}
                        onChange={handleSpecializationChange}
                        placeholder="Select your specialization"
                        style={{ width: '100%', borderRadius: '8px' }}
                     >
                        <Select.Option value="Cardiologists">Cardiologists</Select.Option>
                        <Select.Option value="Audiologists">Audiologists</Select.Option>
                        <Select.Option value="Dentist">Dentist</Select.Option>
                        <Select.Option value="ENT Specialist">ENT Specialist</Select.Option>
                        <Select.Option value="Gynecologist">Gynecologist</Select.Option>
                        <Select.Option value="Orthopedic Surgeon">Orthopedic Surgeon</Select.Option>
                        <Select.Option value="Paediatrician">Paediatrician</Select.Option>
                        <Select.Option value="Psychiatrists">Psychiatrists</Select.Option>
                        <Select.Option value="Veterinarian">Veterinarian</Select.Option>
                        <Select.Option value="Radiologist">Radiologist</Select.Option>
                        <Select.Option value="Pulmonologist">Pulmonologist</Select.Option>
                        <Select.Option value="Endocrinologist">Endocrinologist</Select.Option>
                        <Select.Option value="Oncologist">Oncologist</Select.Option>
                        <Select.Option value="Neurologist">Neurologist</Select.Option>
                        <Select.Option value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</Select.Option>
                     </Select>
                  </Form.Item>
               </Col>
               <Col xs={24} md={12}>
                  <Form.Item label="Experience" required>
                     <Input 
                        name='experience' 
                        value={doctor.experience} 
                        onChange={handleChange} 
                        type='number' 
                        placeholder='Years of experience' 
                        style={{ padding: '10px', borderRadius: '8px' }} 
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12}>
                  <Form.Item label="Fees" required>
                     <Input 
                        name='fees' 
                        value={doctor.fees} 
                        onChange={handleChange} 
                        type='number' 
                        placeholder='Your fees' 
                        style={{ padding: '10px', borderRadius: '8px' }} 
                     />
                  </Form.Item>
               </Col>
               <Col xs={24} md={12}>
                  <Form.Item label="Timings" required>
                     <TimePicker.RangePicker 
                        format="HH:mm" 
                        onChange={handleTimingChange} 
                        style={{ width: '100%', borderRadius: '8px' }} 
                     />
                  </Form.Item>
               </Col>
            </Row>
            
            <div className="d-flex justify-content-end mt-3">
               <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{
                     padding: '10px 25px', 
                     fontSize: '16px', 
                     fontWeight: 'bold', 
                     borderRadius: '8px', 
                     backgroundColor: '#007bff', 
                     border: 'none', 
                     transition: 'background-color 0.3s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                  onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
               >
                  Submit
               </button>
            </div>
         </Form>
      </Container>
   );
}

export default ApplyDoctor;
