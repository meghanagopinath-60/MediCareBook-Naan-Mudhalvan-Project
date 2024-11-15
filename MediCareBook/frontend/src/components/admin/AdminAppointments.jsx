import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const AdminAppointments = () => {

   const [allAppointments, setAllAppointments] = useState([]);
   const [filteredAppointments, setFilteredAppointments] = useState([]);
   const [doctorFilter, setDoctorFilter] = useState('');
   const [statusFilter, setStatusFilter] = useState('');

   const getAppointments = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/admin/getallAppointmentsAdmin', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            },
         });
         if (res.data.success) {
            setAllAppointments(res.data.data);
            setFilteredAppointments(res.data.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAppointments();
   }, []);

   useEffect(() => {
      let filtered = allAppointments;

      if (doctorFilter) {
         filtered = filtered.filter(app => 
            app.doctorInfo.fullName.toLowerCase().includes(doctorFilter.toLowerCase())
         );
      }

      if (statusFilter) {
         filtered = filtered.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase());
      }

      setFilteredAppointments(filtered);
   }, [doctorFilter, statusFilter, allAppointments]);

   return (
      <Container className="my-4">
         <h2 className='text-center' style={{ color: '#4e73df', fontWeight: '600', textTransform: 'uppercase' }}>All Appointments</h2>

         {/* Filter Card */}
         <Card className="p-3 my-3 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
            <Form>
               <Row className="align-items-center">
                  <Col md={6}>
                     <Form.Group>
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Search by doctor name"
                           value={doctorFilter}
                           onChange={(e) => setDoctorFilter(e.target.value)}
                           style={{
                              border: '1px solid #4e73df',
                              borderRadius: '30px',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                              padding: '10px',
                           }}
                        />
                     </Form.Group>
                  </Col>
                  <Col md={6}>
                     <Form.Label>Status</Form.Label>
                     <div className="d-flex align-items-center">
                        <Form.Check
                           inline
                           label="All"
                           type="radio"
                           name="statusFilter"
                           value=""
                           checked={statusFilter === ''}
                           onChange={(e) => setStatusFilter(e.target.value)}
                        />
                        <Form.Check
                           inline
                           label="Pending"
                           type="radio"
                           name="statusFilter"
                           value="pending"
                           checked={statusFilter === 'pending'}
                           onChange={(e) => setStatusFilter(e.target.value)}
                        />
                        <Form.Check
                           inline
                           label="Approved"
                           type="radio"
                           name="statusFilter"
                           value="approved"
                           checked={statusFilter === 'approved'}
                           onChange={(e) => setStatusFilter(e.target.value)}
                        />
                     </div>
                  </Col>
               </Row>
            </Form>
         </Card>

         {/* Appointments Table */}
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
                     <th>Appointment ID</th>
                     <th>User Name</th>
                     <th>Doctor Name</th>
                     <th>Date</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredAppointments.length > 0 ? (
                     filteredAppointments.map((appointment, index) => (
                        <tr
                           key={appointment._id}
                           style={{
                              backgroundColor: index % 2 === 0 ? '#fdfdfd' : '#f7f7f7',
                           }}
                        >
                           <td>{appointment._id}</td>
                           <td>{appointment.userInfo.fullName}</td>
                           <td>{appointment.doctorInfo.fullName}</td>
                           <td>{appointment.date}</td>
                           <td>
                              <span
                                 style={{
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    backgroundColor: appointment.status.toLowerCase() === 'approved' ? '#28a745' : 
                                                    appointment.status.toLowerCase() === 'pending' ? '#ffc107' : '#6c757d',
                                 }}
                              >
                                 {appointment.status}
                              </span>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan={5}>
                           <Alert variant="info" className="text-center">
                              No Appointments to Show
                           </Alert>
                        </td>
                     </tr>
                  )}
               </tbody>
            </Table>
         </div>
      </Container>
   );
};

export default AdminAppointments;
