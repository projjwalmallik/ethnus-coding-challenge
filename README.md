# MERN Transaction Dashboard

A transaction dashboard built with the MERN stack and styled with Tailwind CSS.

## Features

- Initialize database with seed data from a third-party API
- List transactions with search and pagination
- Display statistics of transactions
- Bar chart of transactions based on price range
- Pie chart of transactions based on categories
- Combined API to fetch all data in one request

## Getting Started

### Backend

1. Navigate to the `backend` directory
2. Install dependencies: `npm install`
3. Create a `.env` file and add your MongoDB URI:
   ```
   MONGO_URI=your_mongodb_uri
   PORT=5000
   ```
4. Start the server: `npm start`

### Frontend

1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the React app: `npm start`

## Folder Structure

- `backend/`: Express server and API endpoints
- `frontend/`: React frontend with Tailwind CSS styling

## License

This project is licensed under the MIT License.
