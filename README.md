# Session-Based Loan Application System

A backend system built with Node.js and Express that enables users to apply for loans, track the status of their applications, and allows admins to manage and review them. The system uses session-based authentication and provides real-time updates.

---

## Features

- Users can submit loan applications
- Session-based authentication
- Real-time WebSocket updates on application status
- Input validation and rate limiting
- Admin dashboard for reviewing and updating applications
- Email and phone number verification (OTP/token)

---

## Tech Stack

- **Node.js** + **Express**
- **MySQL** + **Sequelize ORM**
- **Express-session** for session handling
- **WebSocket (socket.io)** for live updates


---

## Setup Instructions

```bash
git clone https://github.com/dan-codeit/loan-application-system.git

cd loan-application-system
cp .env.example .env
npm install
npm run dev
```
