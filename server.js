const config = require('dotenv').config().parsed;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = config.PORT;

// Middleware
app.use(express.json());        // parse JSON bodies
app.use(cors());                // enable CORS for all origins

// Basic route for testing
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// Check MongoDB URL
if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is missing in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Routers
const taskRoute = require('./routes/taskRoutes');
app.use('/tasks', taskRoute);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server (skip in test mode)
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}

module.exports = app;
