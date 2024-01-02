const loginUser = require('../models/login.model');
const gl_adminer = require('../models/adminer.model');
const status = require('../config/status.config')
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {

  console.log("req.body", req.body);

  gl_adminer.findOne({email:req.body.email}).then((data) => {
    console.log("find user by email"+data);
 

 

    if (data == null){
      res.json({ success: false,status :status.NOTFOUND, msg: 'user not found!!..' });
    }

    else {

      bcrypt.compare(req.body.password, data.pw,async function(err,isMatch) {
        if(isMatch){
          return res.json({ success: true, status:status.CREATED,msg: 'Login Successfull.' });
          
        }
        if(!isMatch){
          return res.json({ success: false,status :status.NOTFOUND, msg: 'password not match!!..' });
        }
         });
        }
  
});
}
