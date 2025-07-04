# AI Expense Tracker

A full-stack web application for tracking expenses and income, providing insightful analytics and AI-powered financial insights. Built with a React frontend and Node.js/Express backend, with support for cloud storage and AI integration.

## Demo

https://github.com/user-attachments/assets/217e132f-c8a0-4ccc-ac35-4f8878090921

## Features

- User authentication (sign up, login)
- Add, edit, and delete expenses and income
  
  Income 
  <img width="1502" alt="Screenshot 2025-07-04 at 10 57 22 PM" src="https://github.com/user-attachments/assets/ad97d41f-6763-4d59-b8a7-6fba538e939c" />
  Expense
  <img width="1510" alt="Screenshot 2025-07-04 at 10 58 05 PM" src="https://github.com/user-attachments/assets/9e7335ed-c7e0-4ab7-a171-694620cdbf1d" />

- Dashboard with charts and summaries
  <img width="1509" alt="Screenshot 2025-07-04 at 10 55 50 PM" src="https://github.com/user-attachments/assets/37f8ba40-751b-4e5c-80d9-74731add6ee5" />

- AI-powered financial insights (via Gemini API)
  <img width="1511" alt="Screenshot 2025-07-04 at 10 56 42 PM" src="https://github.com/user-attachments/assets/3afd6601-f606-40dc-aa24-77ea225f5970" />
  
- Profile management with photo upload
- Secure RESTful API
- Cloudinary integration for image uploads
## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** (MongoDB or other, as configured in `/backend/config/db.js`)
- **Cloud Storage:** Cloudinary
- **AI Integration:** Gemini API (Google)
- **Authentication:** JWT

## Project Structure

```
ai-expense-tracker/
├── backend/
│   ├── config/           # DB and cloudinary configs
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth and upload middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Main server file
│   └── *.xlsx            # Sample data files
├── frontend/
│   └── expense-tracker/  # React app (Vite)
│       ├── src/
│       ├── public/
│       └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)
- Gemini API credentials

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend app:
   ```sh
   cd frontend/expense-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

- `/api/v1/auth` – Authentication routes
- `/api/v1/income` – Income management
- `/api/v1/expense` – Expense management
- `/api/v1/dashboard` – Dashboard data
- `/api/v1/insights` – AI-powered insights

## License

This project is for educational and personal use.


Thanks for reading this till here!
