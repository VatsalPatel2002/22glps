const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/db.config')

// var connection = mongoose.createConnection(config.DB);
// autoIncrement.initialize(connection);



const busiessPostSchema = new Schema({
    name : {  type : String,  required:true },
    description :{  type : String,  required:true },
    img :{   data: Buffer, contentType: String },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}

)
// UserSchema.plugin(autoIncrement.plugin, { model: 'Users'  });
const model = mongoose.model('gl_business', busiessPostSchema);
module.exports = model;