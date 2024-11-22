const {Router} = require('express');
const { query1Controllers } = require('../controllers/query1Controllers');

const queryStudentsUsers = Router();

queryStudentsUsers.get('/', async(req, res) => {
    let studentUser;
    try {
        studentUser = await query1Controllers()
        res.status(200).json(studentUser)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = queryStudentsUsers