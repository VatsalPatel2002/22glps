const signup = require("../models/sign-up.model");
const status = require("../config/status.config");
const bcrypt = require("bcrypt");

exports.signUp = async (req,res) => {
    try {
        let email_exits = await signup.findOne({ email: req.body.email })
          .lean()
          .exec();
        if (email_exits) {
          return res.json({
            success: false,
            status: status.OK,
            msg: "email already exits.",
          });
        }
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        const confirm_password = bcrypt.hashSync(req.body.c_password, salt);

        var newUser = new signup({
            f_name:req.body.f_name,
            email: req.body.email,
            password: password,
            c_password: confirm_password
        })

        console.log("newUser ...................", newUser);

    let usr = await newUser.save();
    if(usr){
            return res.json({success : true ,status : status.CREATED,msg : ' new user added successfully.'})
    }
    else{
        return res.json({success : false ,status : status.OK,msg : 'user added failed.'})

    }
    }
    catch{
        console.log("error");
        // return next(err);
        return res.json({
          success: false,
          status: status.INVALIDSYNTAX,
          msg: "failed.",
          
        });
    }
}