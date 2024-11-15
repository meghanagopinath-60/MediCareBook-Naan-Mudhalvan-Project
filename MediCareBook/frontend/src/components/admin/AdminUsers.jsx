import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container, Form ,Card, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const AdminUsers = () => {
   const [users, setUsers] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [searchName, setSearchName] = useState('');
   const [userType, setUserType] = useState('All');

   const getUsers = useCallback(async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/admin/getallusers', {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });
         if (res.data.success) {
            setUsers(res.data.data);
            setFilteredUsers(res.data.data);
         }
      } catch (error) {
         console.log(error);
      }
   }, []);

   const filterUsers = useCallback(() => {
      let tempUsers = [...users];
      
      // Filter by Name
      if (searchName) {
         tempUsers = tempUsers.filter(user =>
            user.fullName.toLowerCase().includes(searchName.toLowerCase())
         );
      }
      
      // Filter by User Type
      if (userType !== 'All') {
         tempUsers = tempUsers.filter(user => {
            const userTypeNormalized = user.type.toLowerCase();
            return (
               (userType === 'Doctor' && user.isdoctor) ||
               (userType === 'Admin' && userTypeNormalized === 'admin') ||
               (userType === 'User' && userTypeNormalized === 'user')
            );
         });
      }
   
      setFilteredUsers(tempUsers);
   }, [searchName, userType, users]);

   useEffect(() => {
      getUsers();
   }, [getUsers]);

   useEffect(() => {
      filterUsers();
   }, [filterUsers]);


   return (
      <div className="my-4">
         <h2 className='text-center' style={{ color: '#4e73df', fontWeight: '600', textTransform: 'uppercase' }}>All Users</h2>
         <Container>
         <Card className="p-3 my-3 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#f9f9f9' }}>
               <Form>
               <Row className="align-items-center">
                  <Col md={6}>
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
                  <Col md={6}>
                     <Form.Group>
                           <Form.Label>User Type</Form.Label>
                              <Form.Select
                                 value={userType}
                                 onChange={(e) => setUserType(e.target.value)}
                              >
                                 <option value="All">All</option>
                                 <option value="Doctor">Doctor</option>
                                 <option value="Admin">Admin</option>
                                 <option value="User">User</option>
                              </Form.Select>
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
                     <th>Email</th>
                     <th>Phone</th>
                     <th>Role</th>
                     <th>Doctor</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredUsers.length > 0 ? (
                     filteredUsers.map((user) => (
                        <tr key={user._id}>
                           <td>{user.fullName}</td>
                           <td>{user.email}</td>
                           <td>{user.phone}</td>
                           <td>{user.type}</td>
                           <td>{user.isdoctor === true ? 'Yes' : 'No'}</td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5">
                           <Alert variant="info" className="text-center">
                              No Users to show
                           </Alert>
                        </td>
                     </tr>
                  )}
               </tbody>
            </Table>
            </div>
         </Container>
      </div>
   );
};

export default AdminUsers;
