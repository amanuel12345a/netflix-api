const mongoose = require("mongoose");

const userInfo = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
 password:{
    type: String,
    required:true
 },
 verify:{
    type:Boolean, default:false
 },
 token:{
    type:String
 }
});
module.exports = mongoose.model("usersInfo", userInfo);