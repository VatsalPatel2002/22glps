const userController = require("../controller/user.controller");
// const authManager  = require('../middlewares/authJwt');
const express = require('express');
const  router = express.Router();

router.route('/').post(userController.addUser)
                 .put(userController.updateUser)
                 .delete(userController.deleteUser)
                 .get(userController.getAlluser);

router.route('/:id').get(userController.getById);
router.route('/glps__vlgusers').get(userController.getUserByvillage);


module.exports =  router;