import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { Badge, Layout, Menu } from 'antd';
import Notification from '../common/Notification';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Container } from 'react-bootstrap';

import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';

const { Header, Sider, Content } = Layout;

const UserHome = () => {
   const [doctors, setDoctors] = useState([]);
   const [userdata, setUserData] = useState({});
   const [activeMenuItem, setActiveMenuItem] = useState('');
   const [collapsed, setCollapsed] = useState(false); 

   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user) {
         setUserData(user);
      }
   };

   const getUserData = async () => {
      try {
         await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token'),
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   const getDoctorData = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/user/getalldoctorsu', {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token'),
            },
         });
         if (res.data.success) {
            setDoctors(res.data.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUser();
      getUserData();
      getDoctorData();
   }, []);

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/";
   };

   const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
   };

   return (
      <Layout style={{ minHeight: '100vh' }}>
         {/* Sidebar */}
         <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="dark">
            <div className="logo" style={{ padding: '16px', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
               MediCareBook
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               
                  <Menu.Item icon={<CalendarMonthIcon />}  onClick={() => handleMenuItemClick('userappointments')}>
                  <div className={`${activeMenuItem === 'userappointments' ? 'active' : ''}`}>
                     Appointments
                  </div>
                  </Menu.Item>
                  {userdata.isdoctor === true ? null : (
                  <Menu.Item icon={<MedicationIcon />} onClick={() => handleMenuItemClick('applyDoctor')}>
                  
                  <div className={`${activeMenuItem === 'applyDoctor' ? 'active' : ''}`}>Apply Doctor    
                        </div> 
                  </Menu.Item>) }
               <Menu.Item  icon={<LogoutIcon />} onClick={logout}>
                  Logout
               </Menu.Item>
            </Menu>
         </Sider>

         {/* Main Layout */}
         <Layout className="site-layout">
            {/* Header */}
            <Header style={{
                  padding: 0,
                  background: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)'
               }}>
                  <Badge count={userdata?.notification ? userdata.notification.length : 0} onClick={() => handleMenuItemClick('notification')}>
                     <NotificationsIcon style={{ fontSize: '24px', cursor: 'pointer' }} />
                  </Badge>
                  <span>
                     {userdata.isdoctor ? `Dr. ${userdata.fullName}` : `Hi, ${userdata.fullName}`}
                  </span>
               </Header>


            {/* Content */}
            <Content style={{ margin: '20px', padding: '20px', background: '#f0f2f5', borderRadius: '8px' }}>
               {activeMenuItem === 'applyDoctor' && <ApplyDoctor userId={userdata._id} />}
               {activeMenuItem === 'notification' && <Notification />}
               {activeMenuItem === 'userappointments' && <UserAppointments />}
               {activeMenuItem !== 'applyDoctor' && activeMenuItem !== 'notification' && activeMenuItem !== 'userappointments' && (
                  <Container>
                     <h2 className="text-center p-2">Home</h2>
                     {userdata.isdoctor === true ? null : (
                        <Row>
                           {doctors && doctors.map((doctor, i) => {
                              let notifyDoc = doctor.userId;
                              return (
                                 <DoctorList userDoctorId={notifyDoc} doctor={doctor} userdata={userdata} key={i} />
                              );
                           })}
                        </Row>
                     )}
                  </Container>
               )}
            </Content>
         </Layout>
      </Layout>
   );
};

export default UserHome;
