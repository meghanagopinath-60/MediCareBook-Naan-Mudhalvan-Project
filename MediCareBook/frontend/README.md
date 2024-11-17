# MediCareBook Frontend

## Overview  
The frontend is structured as a **Single-Page Application (SPA)** using React. This architecture delivers an interactive user experience by dynamically loading and updating content without requiring full page reloads.  

The frontend follows a component-based structure, with each component representing specific parts of the application, such as user profiles, appointment booking forms, and doctor listings. It communicates with the backend through **RESTful APIs**, enabling seamless data exchange. Additionally, libraries such as **Ant Design** and **Bootstrap** are utilized for styling and layout, ensuring a modern and user-friendly interface.

---

## Table of Contents  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup Instructions](#setup-instructions)  
- [Usage](#usage)  
- [API Integration](#api-integration)  
- [Demo](#demo)  

---

## Features  
- User registration and login functionality.  
- Admin dashboard for managing users and doctors.  
- User dashboard for booking appointments with doctors.  
- Notifications for users regarding appointments and other updates.  
- Responsive design for accessibility on various devices.  

---

## Technologies Used  
- **React**: JavaScript library for building user interfaces.  
- **React Router**: For routing and navigation within the application.  
- **Ant Design**: A design system with a set of high-quality React components.  
- **Axios**: For making HTTP requests to the backend API.  
- **React Bootstrap**: For responsive layout and UI components.  
- **MUI Icons**: For incorporating Material Design icons.  

---

## Setup Instructions  
To get started with the MediCareBook frontend, follow these steps:

1. **Clone the Repository**:  
    ```bash
    git clone https://github.com/meghanagopinath-60/MediCareBook.git
    ```
2. **Navigate to the Frontend Directory**:  
    ```bash
    cd MediCareBook/frontend
    ```
3. **Install Dependencies**:  
    ```bash
    npm install
    ```
4. **Run the Application**:  
    ```bash
    npm start
    ```
5. **Open Your Browser**:  
   Go to [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## Usage  
- **Users**:  
  - Register and log in to their accounts.  
  - View available doctors and book appointments.  
  - Receive notifications regarding appointment updates.  
- **Admins**:  
  - Manage users and doctors from the admin dashboard.  

---

## API Integration  
The frontend communicates with the backend API to perform various operations such as user authentication, fetching doctors, and managing appointments. The API endpoints are accessed using **Axios** for HTTP requests.

### Example API Calls:  
- **Login**:  
    `POST /api/user/login` with user credentials.  
- **Register**:  
    `POST /api/user/register` with user details.  
- **Get All Doctors**:  
    `GET /api/user/getalldoctors` to fetch the list of doctors.  
- **Book Appointment**:  
    `POST /api/user/getappointment` with appointment details.  

---

## Demo  
[MediCareBook Demo](https://drive.google.com/file/d/1-RSa2yp2xc60g5JZwF6f-A63LTF0OhFP/view)

