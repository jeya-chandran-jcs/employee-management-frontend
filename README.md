# Employee Management System

## Overview
The **Employee Management System** is a web application where admins can assign tasks to employees, monitor their progress, and update their status. Employees receive assigned tasks, complete them, and submit a completion URL. The system provides a user-friendly interface with secure authentication for both admin and employees.

## Features
- **Admin Features:**
  - Assign tasks to employees.
  - Monitor task progress.
  - Update task status upon completion.
- **Employee Features:**
  - View assigned tasks.
  - Submit task completion URL.
  - Track task status.
- **Authentication & Security:**
  - Separate login protection for Admin and Employees.
  - Secure token-based authentication.
- **Technologies Used:**
  - **Frontend:** Next.js, React, TypeScript, Tailwind CSS
  - **Backend:** Node.js, Express.js, Mongoose (MongoDB)

## Admin Credentials
```
Email: admin1@example.com
Password: admin123
```

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/jeya-chandran-jcs/employee-management-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your-mongodb-url
   JWT_SECRET=your-secret-key
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Admin assigns tasks to employees.
- Employees complete tasks and submit completion URLs.
- Admin monitors and updates task statuses.

## License
This project is open-source and free to use.

