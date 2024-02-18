
const Files = require("../models/Files")
const uploadFile = async(req,res) =>{
    // Access uploaded file details using req.file
    let {userID}= req?.body;
    let filename=req?.file?.filename||"";
    try {
       let code=await generateRandomCode()
        const getUniqueCode = await Files.find({code:code})
        if(!getUniqueCode){
            code= await generateRandomCode()
        }
        const userFiles = new Files({filename:filename,path:"",userID:userID,code:code})
        await userFiles.save();
        res.status(201).json({status:true,message:'File uploaded successfully',uniqueCode:code});
      } catch (error) {
        console.log("Error",error)
        res.status(500).json({status:false,message:"Internal server error"});
      }
}
const generateRandomCode = ()=>{
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    return randomCode;
}
const verifyCode = async(req,res)=>{
  let {userID,code}=req.body
  try{
    const verifiedUser = await Files.find({userID:userID,code:code})
    if(verifiedUser.length >0){
      res.status(200).json({message:"Access granted",status:true})
    }
    else{
      res.status(200).json({message:"Unauthorised",status:false})
    }
  }
  catch(err){
    console.log("err",err)
    res.status(500).json({status:false,message:"Internal server error"});
  }
}
const deleteFile = async(req,res)=>{
  let {id}= req.body;
  try{
    const user = await Files.deleteOne({_id:id})
    if(user.deletedCount > 0 ){
      res.status(200).json({status:true,message:"Item deleted successfully"})
    }
    else{
      res.status(400).json({status:false,message:"No record"})
    }
  }
  catch(error){
    res.status(500).json({status:false,message:"Internal server error"});
  }

}
module.exports={uploadFile,verifyCode,deleteFile}