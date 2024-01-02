const bussines_post = require('../models/business-post.model');
const fs = require('fs');
var multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  exports.upload = multer({ storage: storage }).single("file");

exports.add = async (req,res) =>{
    try {
        await upload(req, res);
        console.log(req.files);
    
        if (req.files.length <= 0) {
          return res
            .status(400)
            .send({ message: "You must select at least 1 file." });
        }
    
        return res.status(200).send({
          message: "Files have been uploaded.",
        });
    
        // console.log(req.file);
    
        // if (req.file == undefined) {
        //   return res.send({
        //     message: "You must select a file.",
        //   });
        // }
    
        // return res.send({
        //   message: "File has been uploaded.",
        // });
      } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).send({
            message: "Too many files to upload.",
          });
        }
        return res.status(500).send({
          message: `Error when trying upload many files: ${error}`,
        });
    
        // return res.send({
        //   message: "Error when trying upload image: ${error}",
        // });
      }
    };
    



// module.exports = upload;

