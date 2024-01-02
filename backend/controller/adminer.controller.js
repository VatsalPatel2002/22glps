const gl_adminer = require('../models/adminer.model');
const status = require('../config/status.config')
const bcrypt = require('bcrypt');

exports.add = async (req, res) => {
    try{
        if (!req.body.email || !req.body.pw) {
            res.json({ success: false,status :status.NOTFOUND, msg: 'Please pass username and password.' });
          }
          else {
              let email_exits = await gl_adminer.findOne({email:req.body.email}).lean().exec();
              if(email_exits){
                  return res.json({ success: false, status: status.OK, msg: 'Email already exists.' });
              }
              else{

                  const salt = bcrypt.genSaltSync(10);  

                  var new_data = new gl_adminer({
                    name :req.body.name,
                    role:req.body.role,
                    villageName:req.body.villageName,
                    email: req.body.email,
                    pw: bcrypt.hashSync(req.body.pw, salt),
                    cpw : bcrypt.hashSync(req.body.cpw, salt)
                  })

                  if(new_data.pw != new_data.cpw)
                  {
                      return res.json({success : false ,status:status.NOTFOUND,msg : "password does not match."})
                  }
          
                  else
                  {
                      let user =  await new_data.save();
                      if(user.role == 'admin')
                      {
                          return res.json({ success: true, status:status.CREATED,msg: 'New Admin Created Successfull.' });
                      } else if(user.role == 'master')
                      {
                          return res.json({ success: true, status:status.CREATED,msg: 'New Master Created Successfull.' });
          
                      }
                      else
                      {
                        return res.json({ success: false, status: status.OK, msg: 'Failed.' });
                      }
                  }
              }  
            }
      }
      catch(err){
             console.log('error ......',err);
             return res.json({ success: false, status: status.OK, msg: err });
      }
      
    }

exports.update = async (req,res)=>{
    var email = req.query.email ;
    try {
        if(!email)
        {
           return res.json({ success: false, msg: 'Email parameter not provided.' });
        }
        else
        {
          let update_user  =  await gl_adminer.findOneAndUpdate({email : email},
                                                {
                                                    $set : {
                                                            name : req.body.name,
                                                            role : req.body.role,
                                                            villageName : req.body.villageName
                                                 }}).lean().exec();
               if(update_user) 
               {
                   return res.json({ success:true, status : status.CREATED, msg: 'updated successfully.' });
               }  
               else{
                   return res.json({ success:false, status : status.NOTMODIFIED, msg: 'updated failed.' });

               }                              
        }
    }
    catch(err)
    {
        return res.json({ success:false, status : status.INVALIDSYNTAX, msg: 'updated failed.' });
    }

} 
exports.delete  = async (req,res) =>{
    var id =  req.query.id
    try{
        if(!id)
        {
        return res.json({success : false , status : status.NOTFOUND, msg:"Id parameter not found"});  
        }
        else{
            let delete_user = await gl_adminer.findByIdAndDelete({_id :id}).lean().exec();
            if(!delete_user)
            {
                return res.json({ success:false, status : status.INVALIDSYNTAX, msg: 'Id Not found.' });
            }
            else
            {
                return res.json({ success:true, status : status.OK, msg: 'Deleted successfully.' });


            }
        }

    }
    catch(err)
    {
        return res.json({ success:false, status : status.INVALIDSYNTAX, msg: 'Deleted failed.' });
    }

  
}

exports.getAll = async(req,res)=>{
    try{
        let data = await gl_adminer.find().lean().exec();
        return res.json({success :true, status :status.OK,data : data})

    }
    catch(err)
    {
        return res.json({success :false, status :status.INVALIDSYNTAX,msg :err});

    }
}



exports.getById = async(req,res)=>{
    var id = req.query.id;
    try{
        if(!id)
        {
        return res.json({success : false , status : status.NOTFOUND, msg:"Id parameter not found"});  

        }
        let data = await gl_adminer.findOne({_id:id}).lean().exec();
        return res.json({success :true, status :status.OK,data : data})

    }
    catch(err)
    {
        return res.json({success :false, status :status.INVALIDSYNTAX,msg :err});

    }
}

exports.getByvillage = async(req,res)=>{
    var village = req.query.village;
    try{
        if(!village)
        {
        return res.json({success : false , status : status.NOTFOUND, msg:"Please Provide Village Name."});  

        }
        let data = await gl_adminer.find({ villageName : village }).lean().exec();
        return res.json({success :true, status :status.OK,data : data})

    }
    catch(err)
    {
        return res.json({success :false, status :status.INVALIDSYNTAX,msg :err});

    }
}
  
  