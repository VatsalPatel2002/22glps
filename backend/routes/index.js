const express = require('express');
const villageRouter = require('../routes/village.route');
const adminerRouter = require('../routes/adminer.route');
const userRouter = require('../routes/user.route');
const businessRouter = require('../routes/business.route');
const signupRouter = require ('../routes/sign-up.route');
const loginRouter = require ('../routes/login.route');
const router = express.Router();




router.use('/glps__villages22',villageRouter);
router.use('/glps__masters22',adminerRouter);
router.use('/glps__nuser22',userRouter);
router.use('/glps__businesspost22',businessRouter);
router.use('/glps__signup22',signupRouter);
router.use('/glps__login22',loginRouter);








module.exports = router;
