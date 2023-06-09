const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true , unique:true},
    bio:{type:String, required:true},
    image:{type:String},
    blogs:{type:Number, default:0},
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };