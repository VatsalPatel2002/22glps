const loginController = require("../controller/login.controller");
const express = require('express');
const  router = express.Router();

router.route('/login').post(loginController.login)
                //  .put(AdminerController.update)
                //  .delete(AdminerController.delete)
                //  .get(AdminerController.getAll);


module.exports =  router;