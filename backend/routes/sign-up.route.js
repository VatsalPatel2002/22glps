const signupController = require ("../controller/sign-up.controller");
const express = require('express');
const  router = express.Router();

router.route('/').post(signupController.signUp);

module.exports =  router;