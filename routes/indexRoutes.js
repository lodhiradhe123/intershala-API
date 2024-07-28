const express = require('express');
const { HomePage, studentSignUp } = require('../controllers/indexController');
const router = express.Router();




router.get('/',HomePage)

//post student signup
router.post('/student/signup',studentSignUp)   



 module.exports =router;