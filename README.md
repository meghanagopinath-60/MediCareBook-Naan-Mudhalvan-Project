# MediCareBook: Book A Doctor Application  

## Project Overview  
MediCareBook is a robust web application designed to enhance the healthcare experience by facilitating seamless communication between patients and doctors.  

The platform includes features for:  
- **Users**: Registering, managing profiles, and booking appointments.  
- **Doctors**: Managing profiles, scheduling appointments, and updating appointment statuses.  
- **Admins**: Overseeing user and doctor registrations, approving or rejecting doctor applications, and managing appointments.  

With secure session handling enabled by **JWT tokens** and **bcrypt-secure password hashing**, MediCareBook ensures data privacy and seamless functionality.  

---
## Demo  
[MediCareBook Demo](https://drive.google.com/file/d/1-RSa2yp2xc60g5JZwF6f-A63LTF0OhFP/view?usp=drive_link)

## Report  
[MediCareBook Report](https://docs.google.com/document/d/11kNDfC1DV_kue4m3MX7GSQ-Fsf7JLki2ntltZS_V744/edit?usp=sharing)

---

## Team Members  
- **Isha R**: Project Coordinator  
- **Meghana G**: Frontend Developer  
- **Rangapriya R**: Backend Developer  
- **Shwetha C**: Database Manager  

---

## Table of Contents  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup Instructions](#setup-instructions)  
- [API Endpoints](#api-endpoints)  
- [Database Configuration](#database-configuration)  
- [Running Tests](#running-tests)  

---

## Features  
- **User Registration & Login**: Users can create accounts and log in to access their dashboards.  
- **Admin Dashboard**: Admins can manage users, doctors, and appointments.  
- **User Dashboard**: Users can view, book, and manage appointments.  
- **Notifications**: Users receive updates on appointment bookings and changes.  
- **Responsive Design**: The app works seamlessly across devices of various screen sizes.  

---

## Technologies Used  

### **Frontend**  
- **React**: For building dynamic user interfaces.  
- **React Router**: For client-side routing.  
- **Ant Design**: UI components library.  
- **Axios**: For HTTP requests to the backend API.  
- **React Bootstrap**: For responsive UI design.  
- **Material-UI Icons**: For Material Design icons.  

### **Backend**  
- **Node.js**: Server-side JavaScript runtime.  
- **Express**: Backend framework for building APIs.  
- **MongoDB**: NoSQL database for data storage.  
- **Mongoose**: ODM library for MongoDB.  
- **Bcrypt.js**: For secure password hashing.  
- **JSON Web Tokens (JWT)**: For authentication.  
- **Multer**: Middleware for file uploads.  
- **dotenv**: For managing environment variables.  

---

## Setup Instructions  
To set up and run the MediCareBook application, follow these steps:
### 1. Pre-Requisites  
1. **Node.js (Version 20.x)**: Install from [Node.js Official Website](https://nodejs.org).
   Verify installation using:
   ```bash
   node -v
   npm -v
   ```
2. **MongoDB**: Set up MongoDB using MongoDB Compass for a local instance or create a MongoDB Atlas account for a cloud-based setup.
3. **Git**: Install Git from Git downloads for version control.
4. **npm** - Node Package Manager (comes with Node.js).
5. **Code Editor** - Visual Studio Code or another preferred IDE.

### 2. Download Project Files:
- Clone the repository or download the project files.
- Place all project files in a dedicated project directory on your local machine.

### 3. Install Dependencies:
Open a terminal, navigate to the project directory (client and server side separated), and install the required dependencies by running:

1. **Server Dependencies**
```bash
cd backend 
npm install
```
2. **Client  Dependencies**
```bash
cd frontend
npm install
```
### 4. Set Up Environment Variables
In the server, create a `.env` file to store environment-specific variables: database connection strings and JWT secrets. The contents in the `.env` file should be as follows:
```bash
PORT=8001  
MONGO_URI=<mongodb-connection-string>
JWT_SECRET=<jwt-secret>
```

### 5. Run the Application
To start the application in development mode:
1. **Start the backend server:**
```bash
cd backend 
npm start
```
2. **Start the frontend:**
```bash
cd frontend
npm start
```

**Open Your Browser**:  
   Go to [http://localhost:3000](http://localhost:3000) to see the application in action.

# API Endpoints

## User Endpoints  
- **POST** `/api/user/register`: Register a new user.  
- **POST** `/api/user/login`: Authenticate a user and return a token.  
- **POST** `/api/user/getuserdata`: Get user data (requires authentication).  
- **POST** `/api/user/registerdoc`: Register a new doctor (requires authentication).  
- **POST** `/api/user/getappointment`: Book an appointment (requires authentication).  
- **GET** `/api/user/getalldoctorsu`: Get a list of all approved doctors (requires authentication).  
- **POST** `/api/user/getallnotification`: Get all notifications for the user (requires authentication).  
- **POST** `/api/user/deleteallnotification`: Delete all notifications for the user (requires authentication).  

## Doctor Endpoints  
- **POST** `/api/doctor/updateprofile`: Update doctor profile (requires authentication).  
- **GET** `/api/doctor/getdoctorappointments`: Get all appointments for a doctor (requires authentication).  
- **POST** `/api/doctor/handlestatus`: Handle appointment status (requires authentication).  
- **GET** `/api/doctor/getdocumentdownload`: Get the document for download (requires authentication).  

---

# Database Configuration  
The backend uses **MongoDB** for data storage.  
- Ensure that you have a MongoDB instance running.  
- Update the connection string in the `.env` file.  
- The application uses **Mongoose** to interact with MongoDB, allowing for easy data manipulation and schema validation.  

---

# Running Tests  
To run tests for the backend application, use the following command:  
```bash
npm test
```








