const express = require('express');
const { HomePage } = require('../controllers/indexController');
const router = express.Router();


router.get('/',HomePage)

 module.exports =router;