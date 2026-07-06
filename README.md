
# TeamFlow – Collaborative Project Management Platform

## Project Overview

TeamFlow is a full-stack collaborative project management platform developed using the MERN stack (MongoDB, Express.js, React, and Node.js). The application enables software engineering teams to efficiently manage projects, tasks, notifications, reports, Root Cause Analysis (RCA), and team collaboration within a unified system.

The platform replaces the need for multiple disconnected tools by integrating project planning, execution, communication, and reporting into a single application.

---

# Technologies Used

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Chart.js
* React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* Socket.IO
* Nodemailer
* Multer

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas
* Version Control: GitHub

---

# Features Implemented

### User Management

* User Registration
* User Login
* JWT Authentication
* Profile Management
* Role-Based Access Control

### Dashboard

* Project Summary
* Task Statistics
* Recent Activities
* Charts and Analytics
* Priority Overview

### Project Management

* Create Project
* Edit Project
* Delete Project
* View Project Details
* Assign Team Members

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Task Priorities
* Due Dates
* Task Status Tracking
* Task Dependencies
* Comments

### Team Management

* Create Teams
* Add Members
* Remove Members
* Assign Roles

### Notifications

* Real-time Notifications
* Email Notifications
* Read/Unread Status

### Reports

* Project Reports
* Task Reports
* Dashboard Analytics
* Export Reports

### Root Cause Analysis (RCA)

* Create RCA
* Update RCA
* Reviewer Approval
* RCA Tracking

### Chat

* Real-time Messaging
* Socket.IO Communication

### Activity Tracking

* User Activity Logs
* Audit Trail

### File Upload

* Upload Attachments
* Task Documents
* RCA Documents

---

# Project Structure

```text
TeamFlow/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Setup Instructions

## Clone the Repository

```bash
git clone https://github.com/pavitra-yakkali/teamflow01.git
```

Navigate to the project folder:

```bash
cd TeamFlow
```

---

## Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the **server** directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

---

# Assumptions Made

* Users have a stable internet connection.
* MongoDB Atlas is available throughout application usage.
* Email credentials are correctly configured for notifications.
* JWT tokens are securely stored by the client.
* Users have appropriate permissions based on their assigned roles.
* Modern web browsers are used for accessing the application.

---

# Known Limitations

* Offline mode is not currently supported.
* Free-tier hosting may introduce cold-start delays.
* Limited file storage capacity.
* No mobile application is available.
* Automated testing has not been implemented.
* Multi-region deployment is not supported.

---

# Future Enhancements

* AI-powered task recommendations
* Offline-first functionality
* Docker containerization
* Kubernetes deployment
* CI/CD pipeline
* Mobile application
* Multi-language support
* Multi-region deployment
* Audit reporting
* AI-based project analytics

---

# Deployment

**Frontend**

* Vercel

**Backend**

* Render

**Database**

* MongoDB Atlas

---

# Author

**Pavitra Yakkali**

Systems Engineering Assignment

---

