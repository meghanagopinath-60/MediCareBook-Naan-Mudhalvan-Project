import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import {Form, Row, Col, Card } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { message } from 'antd';

const AdminDoctors = () => {

   const [doctors, setDoctors] = useState([]);
   const [filteredDoctors, setFilteredDoctors] = useState([]);
   const [searchName, setSearchName] = useState('');
   const [specializationFilter, setSpecializationFilter] = useState('');
   const [feesRange, setFeesRange] = useState([0, 1000]);
   const [selectedTime, setSelectedTime] = useState('');

   const getDoctors = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/admin/getalldoctors', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })
         if (res.data.success) {
            setDoctors(res.data.data)
            setFilteredDoctors(res.data.data);
         }
      } catch (error) {
         console.log(error)
         message.error('something went wrong')
      }
   }

   const handleApprove = async (doctorId, status, userid) => {
      console.log(doctorId, status, userid)
      try {
         const res = await axios.post('http://localhost:8001/api/admin/getapprove', { doctorId, status, userid }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })

         if (res.data.success) {
            message.success(res.data.message)
            getDoctors();
         }
         console.log(res)
      } catch (error) {
         console.log(error)
         message.error('something went wrong')
      }
   }

   const handleReject = async (doctorId, status, userid) => {
      console.log(doctorId, status, userid)
      try {
         const res = await axios.post('http://localhost:8001/api/admin/getreject', { doctorId, status, userid }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })

         if (res.data.success) {
            message.success(res.data.message)
            getDoctors();
         }
         console.log(res)
      } catch (error) {
         console.log(error)
         message.error('something went wrong')
      }
   }


   useEffect(() => {
      getDoctors()

   }, [])
   useEffect(() => {
      // Apply filters to doctors list
      let filtered = doctors;

      if (searchName) {
         filtered = filtered.filter(doctor =>
            doctor.fullName.toLowerCase().includes(searchName.toLowerCase())
         );
      }

      if (specializationFilter) {
         filtered = filtered.filter(doctor => doctor.specialization === specializationFilter);
      }

      if (feesRange) {
         filtered = filtered.filter(doctor => doctor.fees >= feesRange[0] && doctor.fees <= feesRange[1]);
      }

      if (selectedTime) {
         filtered = filtered.filter(doctor =>
            doctor.timings[0] <= selectedTime && doctor.timings[1] >= selectedTime
         );
      }

      setFilteredDoctors(filtered);
   }, [searchName, specializationFilter, feesRange, selectedTime, doctors]);



   return (
      <div>
         <h2 className='text-center' style={{ color: '#4e73df', fontWeight: '600', textTransform: 'uppercase' }}>All Doctors</h2>
         <Card className="p-3 my-3 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
               <Form>
               <Row className="align-items-center">
                  <Col md={3}>
                     <Form.Group>
                        <Form.Label>Name</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="Filter by Name"
                                 value={searchName}
                                 onChange={(e) => setSearchName(e.target.value)}
                                 style={{
                                    border: '1px solid #4e73df',
                                    borderRadius: '30px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    padding: '10px',
                                 }}
                              />
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group>
                        <Form.Label>Specialization</Form.Label>
                        <Form.Select
                           value={specializationFilter}
                           onChange={(e) => setSpecializationFilter(e.target.value)}
                        >
                           <option value="">All</option>
                           <option value="Cardiologists">Cardiologists</option>
                        <option value="Audiologists">Audiologists</option>
                        <option value="Dentist">Dentist</option>
                        <option value="ENT Specialist">ENT Specialist</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                        <option value="Paediatrician">Paediatrician</option>
                        <option value="Psychiatrists">Psychiatrists</option>
                        <option value="Veterinarian">Veterinarian</option>
                        <option value="Radiologist">Radiologist</option>
                        <option value="Pulmonologist">Pulmonologist</option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="Oncologist">Oncologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Cardiothoracic Surgeon">Cardiothoracic Surgeon</option>
                        </Form.Select>
                     </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group>
                        <Form.Label>Fees Range (Rs.)</Form.Label>
                        <Row>
                           <Col>
                              <Form.Control
                                 type="number"
                                 placeholder="Min"
                                 value={feesRange[0]}
                                 onChange={(e) => setFeesRange([+e.target.value, feesRange[1]])}
                              />
                           </Col>
                           <Col>
                              <Form.Control
                                 type="number"
                                 placeholder="Max"
                                 value={feesRange[1]}
                                 onChange={(e) => setFeesRange([feesRange[0], +e.target.value])}
                              />
                           </Col>
                        </Row>
                        </Form.Group>
                  </Col>
                  <Col md={3}>
                     <Form.Group>
                        <Form.Label>Available at Time</Form.Label>
                        <Form.Control
                           type="time"
                           value={selectedTime}
                           onChange={(e) => setSelectedTime(e.target.value)}
                        />
                     </Form.Group>
                  </Col>
               </Row>
               </Form>
            </Card>
         <div style={{ overflowX: 'auto' }}>
            <Table className='my-3' striped bordered hover responsive style={{
               maxWidth: '100%',
               borderRadius: '15px',
               boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}>
               <thead style={{
                  backgroundColor: '#4e73df',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
               }}>
                  <tr>
                     <th>Name</th>
                     <th>Specialization</th>
                     <th>Experience</th>
                     <th>Fees</th>
                     <th>Timing</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
               {filteredDoctors.length > 0 ? (
                     filteredDoctors.map((doctor) => (
                           <tr key={doctor._id}>
                           <td>{doctor.fullName}</td>
                           <td>{doctor.specialization}</td>
                           <td>{doctor.experience} years</td>
                           <td>Rs.{doctor.fees}</td>
                           <td>{doctor.timings[0]} - {doctor.timings[1]}</td>
                           <td>
                              {doctor.status === 'pending' ? (
                                 <Button onClick={() => handleApprove(doctor._id, 'approved', doctor.userId)} size='sm' variant="outline-success">
                                    Approve
                                 </Button>
                              ) : (
                                 <Button onClick={() => handleReject(doctor._id, 'rejected', doctor.userId)} size='sm' variant="outline-danger">
                                    Reject
                                 </Button>
                              )}
                           </td>
                        </tr>
                        )
                     )
                  ) : (
                     <tr>
                        <td colSpan={6}>
                           <Alert variant="info" className="text-center">
                              <Alert.Heading>No Doctors to show</Alert.Heading>
                           </Alert>
                        </td>
                     </tr>

                  )}
               </tbody>
            </Table>
         </div>
      </div>
   )
}

export default AdminDoctors
