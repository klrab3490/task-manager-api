require('dotenv').config();   // <--- add this line
const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = config.port;

// Middleware
app.use(express.json());        // parse JSON bodies
app.use(cors());                // enable CORS for all origins

// Basic route for testing
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// Serve dynamic config.js for frontend
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.config = { API_URL: '${config.apiUrl}' };`);
});

// Check MongoDB URI
if (!config.mongoURI) {
  console.error("❌ mongoURI is missing in config");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Routers
const taskRoute = require('./routes/taskRoutes');
app.use('/api', taskRoute);

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
