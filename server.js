require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

//  express app
const app = express();

app.use(cors());

// middleware - handles the bit between the request and the response
// body parser - parses the body of the request so it can be read as req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}, ${req.path}`);
  next();
});

// routes
app.use('/api/user', userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests once connected to db
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
