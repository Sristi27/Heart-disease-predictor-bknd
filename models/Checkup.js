const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const CheckupSchema = new mongoose.Schema({  
    user:{
        type:ObjectId,
        ref:'User'
    },
    data:[{
        age: {
            type:Number
        },
        sex: {
            type:String
        },
        chestPainType: {
            type:String
        },
        pressure: {
            type:Number
        },
        cholestrol: {
            type:Number
        },
        sugar: {
            type:String
        },
        ecg: {
            type:String
        },
        heartRate: {
            type:Number
        },
        angina: {
            type:String
        },
        thal:{
            type:String
        },
        result:{
            type:String
        },
        date:{
            type:Date
        }
    }]
    
})
module.export = mongoose.model("Checkup",CheckupSchema)