const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require('../config/db.config');

const SignUpSchema = new Schema({
    f_name:{type:String,require :true},
    email:{type:String,require :true},
    password:{type:String,require :true},
    c_password:{type:String,require :true}
})

const model = mongoose.model('sign-up', SignUpSchema);
module.exports = model;