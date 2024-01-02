const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/db.config')

// var connection = mongoose.createConnection(config.DB);
// autoIncrement.initialize(connection);
const familyPersonSchema = new Schema({
    fp_name:  {  type : String,required:true },
    fp_age:  {    type : Date, required:true,trim :true },
    fp_married_st:  {  type : String,required:true },
    fp_qualification:  {  type : String,required:true},
    fp_occupation:  {  type : String,required:true },
},
 {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
 }
)

const UserSchema = new Schema({
    full_name : { type : String,required:true},
    mailid : { type : String,required:true}, 
    password : { type : String,  required:true },
    confirm_password : { type : String, required:true},
    age : {   type : Date,   required:true,trim :true},
    mob:  {  type : String,required:true},
    mob2:  {  type : String,required:true},
    married_st:  {  type : String, required:true},
    village:  {  type : String, required:true},
    paddress:  {  type : String,required:true },
    laddress:  {  type : String,required:true },
    qualification:  {  type : String,required:true },
    occupation:  {  type : String,required:true },
    family_person :[familyPersonSchema]
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

// UserSchema.plugin(autoIncrement.plugin, { model: 'Users'  });
const model = mongoose.model('gl_user', UserSchema);
module.exports = model;