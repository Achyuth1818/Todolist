import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import addTaskRouter from './routers/addTask.js'; 
import cors from "cors";

// Import router for handling task-related requests

dotenv.config();  // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 8080;  // Default to port 8080 if not specified
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

//cors was used to configure both backend and frontend at a time and to use backend apis in the frontend
//* is url
//add to the package.json file too
//"client":"npm start --prefix client"
//"start":"concureently \"npm run dev\"\"npm run client\""
//both backend and frontend both runs simutaneously
app.use(cors({
  origin : '*'
}))
// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Basic home route
app.get('/', (req, res) => {
  res.send("<h1>Hello! You are at the home route.</h1>");

});

// Use the addTaskRouter for handling task-related routes
app.use('/api', addTaskRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
