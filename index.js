const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const prisma = require('./DB/db.config'); // Import Prisma client instance
const routes = require('./Routes/user'); // Import user routes

// Middleware
app.use(express.json()); // JSON parser middleware
app.use('/api', routes); // Use routes with a base path

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
