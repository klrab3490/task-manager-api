// config.js

// Node.js/CommonJS/ESM export
const config = {
  port: typeof process !== "undefined" && process.env && process.env.PORT ? process.env.PORT : 5000,
  mongoURI: typeof process !== "undefined" && process.env && process.env.MONGODB_URL ? process.env.MONGODB_URL : 'mongodb://127.0.0.1:27017/taskmanager',
  apiUrl: typeof process !== "undefined" && process.env && process.env.API_URL ? process.env.API_URL : `http://localhost:3000/api`
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = config; // CommonJS
} else if (typeof define === "function" && define.amd) {
  define([], function() { return config; }); // AMD
} else if (typeof window !== "undefined") {
  window.config = { API_URL: config.apiUrl }; // For browser
}
