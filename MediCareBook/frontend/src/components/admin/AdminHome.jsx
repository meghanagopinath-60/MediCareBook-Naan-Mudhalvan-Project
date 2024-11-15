import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Layout, Menu } from 'antd';
import Notification from '../common/Notification';
import AdminUsers from './AdminUsers';
import AdminDoctors from './AdminDoctors';
import AdminAppointments from './AdminAppointments';

const { Header, Sider, Content } = Layout;

const AdminHome = () => {
   const [userdata, setUserData] = useState({});
   const [activeMenuItem, setActiveMenuItem] = useState('');
   const [collapsed, setCollapsed] = useState(false);

   const getUserData = async () => {
      try {
         await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token')
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user) setUserData(user);
   };

   useEffect(() => {
      getUserData();
      getUser();
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

               <Menu.Item key="1" icon={<CalendarMonthIcon />} onClick={() => handleMenuItemClick('adminusers')}>
                  Users
               </Menu.Item>
               <Menu.Item key="2" icon={<MedicationIcon />} onClick={() => handleMenuItemClick('admindoctors')}>
                  Doctors
               </Menu.Item>
               <Menu.Item key="3" icon={<LogoutIcon />} onClick={logout}>
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
               <span>Hi, {userdata.fullName}</span>
            </Header>

            {/* Content */}
            <Content style={{ margin: '20px', padding: '20px', background: '#f0f2f5', borderRadius: '8px' }}>
               {activeMenuItem === 'notification' && <Notification />}
               {activeMenuItem === 'adminusers' && <AdminUsers />}
               {activeMenuItem === 'admindoctors' && <AdminDoctors />}
               {!activeMenuItem && <AdminAppointments />}
            </Content>
         </Layout>
      </Layout>
   );
};

export default AdminHome;
