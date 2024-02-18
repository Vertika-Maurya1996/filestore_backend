const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: String,
    path: String,
    userID:String,
    code:String,
  },
  {
    collection: 'userFiles',
    timestamps:true
  }
  );
  
  const Files = mongoose.model('Files', fileSchema);
   
  module.exports= Files