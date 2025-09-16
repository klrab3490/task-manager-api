// config.js

// This file supports CommonJS, AMD, and browser global exports for maximum compatibility.
// Consider using a module bundler (like Webpack or Rollup) for production environments.

const config = {
  port: typeof process !== "undefined" && process.env && process.env.PORT ? process.env.PORT : 5000,
  mongoURI: typeof process !== "undefined" && process.env && process.env.MONGODB_URL ? process.env.MONGODB_URL : 'mongodb://127.0.0.1:27017/taskmanager',
  apiUrl: typeof process !== "undefined" && process.env && process.env.API_URL ? process.env.API_URL : `http://localhost:3000/api`
};

// Export config for different environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = config; // CommonJS (Node.js)
} else if (typeof define === "function" && define.amd) {
  define([], function() { return config; }); // AMD (RequireJS)
} else if (typeof window !== "undefined") {
  window.config = config; // Browser global
}
