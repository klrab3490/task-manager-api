// config.js (Node)
import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager',
  apiUrl: process.env.API_URL || 'http://localhost:5000/api/tasks'
};

export default config;
