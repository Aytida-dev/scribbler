const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    createdBy:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
})
const blogModel = mongoose.model("blog", blogSchema);
module.exports = { blogModel };