const Village = require('../models/villgae.model');
const status = require('../config/status.config');


exports.addVillage = async (req,res) =>{
    var village_name = req.body.villageName;
    var vlg_id = req.body.vlgid;
    try{
          if(!village_name || !vlg_id)
           {
              return res.json({success :false ,status:status.NOTFOUND,msg : 'Please Provide Village Name And Village Id.'})
           }
          else
            {
                    var new_village = new Village({
                        vlgid : vlg_id,
                        villageName :village_name,
                        
                    }) 
                    let village =  await new_village.save();
                    
                    if(village)
                    {
                        return res.json({success :true ,status :status.CREATED, msg : 'Village Added SuccessFully.'})
                    }
                    else{
                        return res.json({success :true ,status :status.INVALIDSYNTAX, msg : 'Village Added Failed.'});

                    }

              }
    }
    catch(err)
    {
        console.log('eror .....',err);
        return res.json({success :false ,status :status.INVALIDSYNTAX, msg : 'Failed.'})

    }
};


exports.updateVillage = async (req,res) => {
        var vlg_id =  req.body.vlgid ; 
    try{
        if(!vlg_id)
        {
            return res.json({success : false , status : status.NOTFOUND, msg:"village Id parameter not found"});  
        }
        else
        {
            let update_village =  await Village.findOneAndUpdate({vlgid :vlg_id},{$set:{villageName:req.body.villageName}}).lean().exec();

            if(update_village)
            {
            return res.json({success : true , status : status.CREATED, msg:"village updated successfully."});  

            }
            else
            {
            return res.json({success : false , status : status.NOTMODIFIED, msg:"village updated failed."});  

            }
        }

    }catch(err){
        return res.json({success : false , status : status.INVALIDSYNTAX, msg:"failed."});  


    }

}

exports.deleteVillage = async (req,res) =>{

    var vlg_id =  req.query.vlgid ; 
    try{
        if(!vlg_id)
        {
            return res.json({success : false , status : status.NOTFOUND, msg:"village Id parameter not found"});  
        }

        else
        {
            let delete_village = await Village.findOneAndDelete({vlgid :vlg_id}).lean().exec();
            if(delete_village)
            {
            return res.json({success : true ,status : status.OK, msg:"village delete successfully"});  
            }
            else
            {
            return res.json({success : false ,status : status.NOTMODIFIED, msg:"village delete failed"});  

            }
        }
        
    }catch(err)
    {
        return res.json({success : false ,status : status.INVALIDSYNTAX, msg:"Failed."});  

    }

}

exports.getAll = async(req,res)=>{
    try{
        let data = await Village.find().lean().exec();
        return res.json({success :true, status :status.OK,data : data})

    }
    catch(err)
    {
        return res.json({success :false, status :status.INVALIDSYNTAX,msg :err});

    }
}

exports.getById = async(req,res)=>{
    var id = req.query.vlgid;
    try{
        if(!id)
        {
        return res.json({success : false , status : status.NOTFOUND, msg:"village Id parameter not found"});  

        }
        let data = await Village.find({vlgid:id}).lean().exec();
        return res.json({success :true, status :status.OK,data : data})

    }
    catch(err)
    {
        return res.json({success :false, status :status.INVALIDSYNTAX,msg :err});

    }
}

exports.getByName = async(req,res)=>{
    var villageName = req.query.villageName;
    try{
        if(!villageName)
        {
        return res.json({success : false , status : status.NOTFOUND, msg:"village name parameter not found"});  

        }
        let data = await Village.find({villageName:villageName}).lean().exec();
        return res.json({success :true, status :status.OK,data : data})

    }
    catch(err)
    {
        return res.json({success :false, status :status.INVALIDSYNTAX,msg :err});

    }
}

