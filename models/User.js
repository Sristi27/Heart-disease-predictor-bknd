const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
 
    name:{type:String,required:true},
    email:{type:String,required:true}
})

module.export = mongoose.model("User", userSchema)