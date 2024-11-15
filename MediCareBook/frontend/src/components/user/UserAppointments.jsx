import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Button, Row, Col, Form ,Card} from 'react-bootstrap';
import axios from 'axios';
import { DatePicker } from 'antd';


const UserAppointments = () => {
  const [userid, setUserId] = useState();
  const [type, setType] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [name, setName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);


  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      const { _id, isdoctor } = user;
      setUserId(_id);
      setType(isdoctor);
    } else {
      alert('No user to show');
    }
  };

  const getUserAppointment = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/user/getuserappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: userid,
          name,
          appointmentDate: appointmentDate ? appointmentDate.format('YYYY-MM-DD') : '',
          status: statusFilter,
        },
      });
      if (res.data.success) {
        setUserAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userid, name, appointmentDate, statusFilter]); // Add dependencies

  const getDoctorAppointment = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/doctor/getdoctorappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: userid,
          name,
          appointmentDate: appointmentDate ? appointmentDate.format('YYYY-MM-DD') : '',
          status: statusFilter,
        },
      });
      if (res.data.success) {
        setDoctorAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userid, name, appointmentDate, statusFilter]); // Add dependencies

  const handleStatus = async (userid, appointmentId, status) => {
    try {
      const res = await axios.post('http://localhost:8001/api/doctor/handlestatus', {
        userid,
        appointmentId,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        getDoctorAppointment();
        getUserAppointment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (url, appointId) => {
    try {
      const res = await axios.get('http://localhost:8001/api/doctor/getdocumentdownload', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        params: { appointId },
        responseType: 'blob'
      });
      if (res.data) {
        const fileUrl = window.URL.createObjectURL(new Blob([res.data], { "type": "application/pdf" }));
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute("href", fileUrl);
        const fileName = url.split("/").pop();
        downloadLink.setAttribute("download", fileName);
        downloadLink.style.display = "none";
        downloadLink.click();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userid]);

  useEffect(() => {
    if (type === true) {
      getDoctorAppointment();
    } else {
      getUserAppointment();
    }
  }, [type, getDoctorAppointment, getUserAppointment]);

  useEffect(() => {
    // Filter userAppointments or doctorAppointments based on current filters
    let filtered = type ? doctorAppointments : userAppointments;

    if (name) {
      filtered = filtered.filter(app => {
        const fullName = type ? app.userInfo?.fullName : app.docName; // Adjust for both types of users
        return fullName.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (appointmentDate) {
      filtered = filtered.filter(app => app.date && app.date.includes(appointmentDate.format('YYYY-MM-DD')));
    }

    if (statusFilter) {
      filtered = filtered.filter(app => app.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredAppointments(filtered);
  }, [doctorAppointments, userAppointments, name, appointmentDate, statusFilter, type]);


  return (
    <Container className="my-4">
      <h2 className='text-center' style={{ color: '#4e73df', fontWeight: '600', textTransform: 'uppercase' }}>All Appointments</h2>
      
      {/* Filters Section */}
      <Card className="p-3 my-3 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
          <Form>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A4A4A', marginBottom: '20px' }}>Filters</h4>
            <Row className="align-items-center">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      border: '2px solid #4e73df',
                      borderRadius: '30px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      padding: '10px',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Date of Appointment</Form.Label>
                  <DatePicker
                    style={{
                      width: '100%',
                      borderRadius: '30px',
                      padding: '10px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    }}
                    value={appointmentDate}
                    onChange={(date) => setAppointmentDate(date)}
                    placeholder="Filter by Date"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
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
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card>


{/* Appointments Table */}
<div style={{ overflowX: 'auto' }}>
  <Table className="my-3" striped bordered hover responsive style={{
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
        <th>Date of Appointment</th>
        {type === true && <th>Phone</th>}
        {type === true && <th>Document</th>}
        <th>Status</th>
        {type === true && <th>Action</th>}
      </tr>
    </thead>
    <tbody>
      {type === true ? (
        filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.userInfo.fullName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.userInfo.phone}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => handleDownload(appointment.document.path, appointment._id)}
                  style={{
                    color: '#007bff',
                    textDecoration: 'none',
                    padding: '0',
                  }}
                >
                  {appointment.document.filename}
                </Button>
              </td>
              <td>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '20px',
                    color: '#fff',
                    fontWeight: 'bold',
                    backgroundColor: appointment.status === 'approved' ? '#28a745' :
                                      appointment.status === 'pending' ? '#ffc107' : '#6c757d',
                  }}
                >
                  {appointment.status === 'approved' ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td>
                {appointment.status === 'approved' ? null : (
                  <Button
                    variant="success"
                    onClick={() => handleStatus(appointment.userInfo._id, appointment._id, 'approved')}
                    style={{
                      borderRadius: '30px',
                      padding: '5px 15px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    }}
                  >
                    Approve
                  </Button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <Alert variant="info" className="text-center">
                No Appointments to Show
              </Alert>
            </td>
          </tr>
        )
      ) : (
        filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.docName}</td>
              <td>{appointment.date}</td>
              <td>
                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '20px',
                    color: '#fff',
                    fontWeight: 'bold',
                    backgroundColor: appointment.status === 'approved' ? '#28a745' :
                                      appointment.status === 'pending' ? '#ffc107' : '#6c757d',
                  }}
                >
                  {appointment.status === 'approved' ? 'Approved' : 'Pending'}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>
              <Alert variant="info" className="text-center">
                No Appointments to Show
              </Alert>
            </td>
          </tr>
        )
      )}
    </tbody>
  </Table>
</div>
    </Container>
  );
};

export default UserAppointments;
