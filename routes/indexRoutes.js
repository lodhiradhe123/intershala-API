const express = require('express');
const { HomePage, studentSignUp, studentSignIn, studentSignOut } = require('../controllers/indexController');
const router = express.Router();




router.get('/',HomePage)

//post student signup
router.post('/student/signup',studentSignUp)  

// post student signIn
router.post('/student/signin',studentSignIn)  

// post student signOut
router.post('/student/signout',studentSignOut)  




 module.exports =router;