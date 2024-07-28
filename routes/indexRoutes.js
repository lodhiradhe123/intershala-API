const express = require('express');
const { HomePage, studentSignUp, studentSignIn, studentSignOut, currentUser } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();




router.get('/', isAuthenticated, HomePage)

// Post current user
router.post('/student', isAuthenticated, currentUser)

//post student signup
router.post('/student/signup', studentSignUp)

// post student signIn
router.post('/student/signin', studentSignIn)

// post student signOut
router.get('/student/signout',isAuthenticated, studentSignOut)




module.exports = router;