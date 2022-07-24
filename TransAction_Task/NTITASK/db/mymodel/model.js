const mongoose = require("mongoose")
const validator = require("validator") 
const User = mongoose.model("User", {
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        minlength:3,
        maxlength:20
    }, 
    accountIntialBalance:{
        type:Number,
        required:true,
    }, 
    currentBalnce:{
        type:Number,
    }, 
    transaction: [
        { 
            date:{ type:String, trim:true, default:Date.now()}, 
            typeOfTransaction:{type:String, trim:true} , 
            status:{type:String, trim:true , default:false}
        }
    ]

})
module.exports = User