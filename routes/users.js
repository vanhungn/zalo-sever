var express = require('express');
var router = express.Router();
const sendPhone=require('../controllers/sendPhoneMSM')
const registerUser=  require('../controllers/usersControllers')
/* GET users listing. */
router.post('/register', registerUser.RegisterUser);
router.post('/login',registerUser.LoginUser)
module.exports = router;
