require('dotenv').config();

const express = require('express');
const { nextTick } = require('process');
const userRoutes = require('./routes/users');

//  express app
const app = express();

// middleware - handles the bit between the request and the response
// body parser - parses the body of the request so it can be read as req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}, ${req.url}, ${req.path}`);
  next();
});

// routes
app.use('/api/users', userRoutes);

//listen for requests
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

process.env;
