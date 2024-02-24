require('dotenv').config();

const express = require('express');
const { nextTick } = require('process');

//  express app
const app = express();

// middleware - handles the bit between the request and the response
app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}, ${req.path}`);
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the app'});
});

//listen for requests
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

process.env
