const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/db.config')

// var connection = mongoose.createConnection(config.DB);
// autoIncrement.initialize(connection);

const masterUserSchema = new Schema({
    name : {
            type : String,
            required:true,
           },
    role:  { 
               type : String,
               required:true,
            },
   villageName:  { 
                type : String,
                required:true,
               },
    email:  { 
                type : String,
                required:true,
                unique :true
               },

    pw:       { 
                type : String,
                required:true,
               },
    cpw:       { 
                type : String,
                required:true,
               },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
}

)
// masterUserSchema.pre(save, function(next) {
//   var user = this;

// // only hash the password if it has been modified (or is new)
// if (!user.isModified('password')) return next();

// // generate a salt
// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//   if (err) return next(err);

//   // hash the password using our new salt
//   bcrypt.hash(user.pw, salt, function(err, hash) {
//       if (err) return next(err);

//       // override the cleartext password with the hashed one
//       user.pw = hash;
//       next();
//   });
// });


// });

// masterUserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.pw, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//   });
// };



// UserSchema.plugin(autoIncrement.plugin, { model: 'Users'  });
const model = mongoose.model('gl_adminer', masterUserSchema);
module.exports = model;