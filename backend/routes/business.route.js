const bussinessController = require("../controller/business-post.controller");
// const authManager  = require('../middlewares/authJwt');
const express = require('express');
const  router = express.Router();

router.route('/').post(bussinessController.add)
                //  .put(AdminerController.update)
                //  .delete(AdminerController.delete)
                //  .get(AdminerController.getAll);
// router.route('/:id').get(AdminerController.getById);

// router.route('/glps__vlgusers').get(AdminerController.getByvillage);

module.exports =  router;