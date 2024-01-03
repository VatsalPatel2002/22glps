const User = require("../models/user.model");
const status = require("../config/status.config");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  try {
    let email_exits = await User.findOne({ mailid: req.body.mailid })
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
    const confirm_password = bcrypt.hashSync(req.body.confirm_password, salt);
    // let data = await User.findOne({ _id:id }).select('full_name mob mob2 age married_st paddress laddress qualification occupation').lean().exec();
    var newUser = new User({
      full_name: req.body.full_name,
      mailid: req.body.mailid,
      password: password,
      confirm_password: confirm_password,
      age: req.body.age,
      mob: req.body.mob,
      mob2: req.body.mob2,
      married_st: req.body.married_st,
      village: req.body.married_st,
      paddress: req.body.paddress,
      laddress: req.body.laddress,
      qualification: req.body.qualification,
      occupation: req.body.occupation,
      family_person: req.body.family_person,
    });
    console.log("newUser ...................", newUser);

    let usr = await newUser.save();
    if(usr){
            return res.json({success : true ,status : status.CREATED,msg : ' new user added successfully.'})
    }
    else{
        return res.json({success : false ,status : status.OK,msg : 'user added failed.'})

    }
  } catch (err) {
    console.log(err);
    // return next(err);
    return res.json({
      success: false,
      status: status.INVALIDSYNTAX,
      msg: "failed.",
      err: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  console.log("req.body...................", req.body);
  const id = req.query.id;
  try {
    if (!id) {
      return res.json({
        success: false,
        status: status.NOTFOUND,
        msg: "id parameter not found.",
      });
    } else {
      console.log("id..............", id);
      console.log(req.body.family_person);
      // let data = await User.findOne({ _id:id }).lean().exec();
      // console.log('data ...............',data);
      let update_user = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            full_name: req.body.full_name,
            age: req.body.age,
            mob: req.body.mob,
            mob2: req.body.mob2,
            married_st: req.body.married_st,
            paddress: req.body.paddress,
            laddress: req.body.laddress,
            qualification: req.body.qualification,
            occupation: req.body.occupation,
            family_person: req.body.family_person,
          },
        }
      )
        .lean()
        .exec();

      console.log("update_user .........", update_user);
      if (!update_user) {
        return res.json({
          success: false,
          status: status.NOTFOUND,
          msg: "user upadated failed.",
        });
      } else {
        return res.json({
          success: true,
          status: status.CREATED,
          msg: "user upadated successfully.",
        });
      }
    }
  } catch (err) {
    return res.json({
      success: false,
      status: status.INVALIDSYNTAX,
      msg: "failed.",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.query.id;
  try {
    if (!id) {
      return res.json({
        success: false,
        status: status.NOTFOUND,
        msg: "id parameter not found.",
      });
    } else {
      let delete_user = await User.findByIdAndDelete({ _id: id }).lean().exec();
      if (!delete_user) {
        return res.json({
          success: false,
          status: status.NOTFOUND,
          msg: "user deleted failed.",
        });
      } else {
        return res.json({
          success: true,
          status: status.OK,
          msg: "user deleted successfully.",
        });
      }
    }
  } catch (err) {
    return res.json({
      success: true,
      status: status.INVALIDSYNTAX,
      msg: "Failed.",
    });
  }
};
exports.getAlluser = async (req, res) => {
  try {
    let data = await User.find()
      .select(
        "full_name mob mob2 age married_st paddress laddress qualification occupation"
      )
      .lean()
      .exec();
    res.json({ success: true, status: status.OK, data: data });
  } catch (err) {
    return res.json({
      success: false,
      status: status.OK,
      msg: "something went wrong.",
    });
  }
};

exports.getById = async (req, res) => {
  const id = req.query.id;
  try {
    if (!id) {
      return res.json({
        success: false,
        status: status.NOTFOUND,
        msg: "id parameter not found.",
      });
    } else {
      let data = await User.findOne({ _id: id })
        .select(
          "full_name mob mob2 age married_st paddress laddress qualification occupation"
        )
        .lean()
        .exec();
      res.json({ success: true, status: status.OK, data: data });
    }
  } catch (err) {
    return res.json({
      success: false,
      status: status.OK,
      msg: "something went wrong.",
    });
  }
};

exports.getUserByvillage = async (req, res) => {
  var village = req.query.village;
  try {
    if (!village) {
      return res.json({
        success: false,
        status: status.NOTFOUND,
        msg: "Please Provide Village Name.",
      });
    }
    let data = await User.find({ village: village }).lean().exec();
    return res.json({ success: true, status: status.OK, data: data });
  } catch (err) {
    return res.json({ success: false, status: status.INVALIDSYNTAX, msg: err });
  }
};
