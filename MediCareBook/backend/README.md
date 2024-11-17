# MediCareBook Backend

## Overview  
Welcome to the **MediCareBook Backend** application! This project serves as the server-side component of the MediCareBook platform, providing the necessary APIs for user management, doctor management, appointment scheduling, and notifications.  

The backend is built with **Node.js** and **Express.js**, offering a **RESTful API** for the frontend and managing user authentication with **JWT (JSON Web Tokens)**.

---

## Table of Contents  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup Instructions](#setup-instructions)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Database Configuration](#database-configuration)  

---

## Features  
- **User Management**: Register, login, and manage user profiles.  
- **Doctor Management**: Register doctors, approve/reject applications, and manage doctor profiles.  
- **Appointment Scheduling**: Users can book appointments, and doctors can manage their schedules.  
- **Notifications**: Send and receive notifications for events like appointment confirmations or status updates.  
- **Authentication**: Secure user authentication using **JWT**.  

---

## Technologies Used  
- **Node.js**: JavaScript runtime for building server-side applications.  
- **Express**: Web application framework for building APIs.  
- **MongoDB**: NoSQL database for storing user, doctor, and appointment data.  
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.  
- **Bcrypt.js**: Library for hashing passwords.  
- **JSON Web Tokens (JWT)**: Secure authentication mechanism.  
- **Multer**: Middleware for handling file uploads.  
- **dotenv**: For managing environment variables.  

---

## Setup Instructions  

1. **Clone the Repository**:  
    ```bash
    git clone [https://github.com/meghanagopinath-60/MediCareBook.git](https://github.com/meghanagopinath-60/MediCareBook-Naan-Mudhalvan-Project/tree/main/MediCareBook)
    ```

2. **Navigate to the Backend Directory**:  
    ```bash
    cd MediCareBook/backend
    ```

3. **Install Dependencies**:  
    ```bash
    npm install
    ```

4. **Create a .env File**:  
    Create a `.env` file in the root of the backend folder and add the following environment variables:  
    ```plaintext
    PORT=8001
    MONGO_DB=your_mongodb_connection_string
    JWT_KEY=your_jwt_secret_key
    ```

5. **Run the Application**:  
    ```bash
    npm start
    ```

6. **Open Your Browser**:  
    The backend server will be running at [http://localhost:8001](http://localhost:8001).  

---

## Usage  
- **Users**:  
  - Register and log in to their accounts.  
  - View available doctors and book appointments.  
  - Receive notifications regarding appointment updates.  
- **Admins**:  
  - Manage users and doctors through the admin dashboard.  

---

## API Endpoints  

### **User Endpoints**  
- `POST /api/user/register`: Register a new user.  
- `POST /api/user/login`: Authenticate a user and return a token.  
- `POST /api/user/getuserdata`: Get user data (requires authentication).  
- `POST /api/user/registerdoc`: Register a new doctor (requires authentication).  
- `POST /api/user/getappointment`: Book an appointment (requires authentication).  
- `GET /api/user/getalldoctorsu`: Get a list of all approved doctors (requires authentication).  
- `POST /api/user/getallnotification`: Get all notifications for the user (requires authentication).  
- `POST /api/user/deleteallnotification`: Delete all notifications for the user (requires authentication).  

### **Doctor Endpoints**  
- `POST /api/doctor/updateprofile`: Update doctor profile (requires authentication).  
- `GET /api/doctor/getdoctorappointments`: Get all appointments for a doctor (requires authentication).  
- `POST /api/doctor/handlestatus`: Handle appointment status (requires authentication).  
- `GET /api/doctor/getdocumentdownload`: Get the document for download (requires authentication).  

---

## Database Configuration  
The backend uses **MongoDB** for data storage.  

Ensure that you have a MongoDB instance running and update the connection string in the `.env` file. The application uses **Mongoose** to interact with the database, enabling easy data manipulation and schema validation.

---  
