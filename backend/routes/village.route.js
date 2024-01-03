const villageController = require("../controller/village.contoller");
// const authManager  = require('../middlewares/authJwt');
const express = require('express');
const  router = express.Router();

router.route('/').post(villageController.addVillage)
                 .put(villageController.updateVillage)
                 .delete(villageController.deleteVillage)
                 .get(villageController.getAll);

router.route('/vlgid').get(villageController.getById);
router.route('/village_name').get(villageController.getByName)


module.exports =  router;