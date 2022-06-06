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
            type:Number
        },
        chestPainType: {
            type:Number
        },
        pressure: {
            type:Number
        },
        cholestrol: {
            type:Number
        },
        sugar: {
            type:Number
        },
        ecg: {
            type:Number
        },
        heartRate: {
            type:Number
        },
        angina: {
            type:Number
        },
        thal:{
            type:Number
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