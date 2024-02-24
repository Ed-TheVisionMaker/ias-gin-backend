const express = require('express');

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    res.json({message: 'GET all users'})
})

// GET a single user
router.get('/:id', (req, res) => {
    res.json({message: 'GET a single user'})
})

// POST a new user
router.post('/', (req, res) => {
    res.json({message: 'POST a new user'})
})

// DELETE a new user
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a new user'})
})


// UPDATE a new user
router.patch('/:id', (req, res) => {
    res.json({message: 'UPDATE a new user'})
})



module.exports = router;