const mongoose = require('mongoose');

const requestedOrgan = new mongoose.Schema({
    organName:{
        type:String,
        enum:["Heart","Liver","Lungs","Kidney","Eye"]
    },
    bloodGroup:{
        type:String,
        enum:["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]   
    },
    hospitalId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Hospital"
    },
    doctorName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : String,
        enum : ["pending","fullfilled"],
        default : "pending"
    }
})

const RequestedOrgan = mongoose.model('RequestedOrgan' , requestedOrgan);
module.exports = RequestedOrgan;