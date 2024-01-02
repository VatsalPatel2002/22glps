const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require('../config/db.config')

const loginSchema = new Schema({
    email : {  type : String,  required:true },
    password :{  type : String,  required:true }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}

)

const model = mongoose.model('login', loginSchema);
module.exports = model;