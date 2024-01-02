const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/db.config')

// var connection = mongoose.createConnection(config.DB);
// autoIncrement.initialize(connection);



const villageSchema = new Schema({
    vlgid :{
            type : Number,
            required:true,
            unique : true
    
          },
    villageName:  { 
               type : String,
               required:true,
               unique : true
              }
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}

)
// UserSchema.plugin(autoIncrement.plugin, { model: 'Users'  });
const model = mongoose.model('Village', villageSchema);
module.exports = model;