const mongoose=require("mongoose");

const organSchema= new mongoose.Schema({
    organName:{
        type:String,
        enum:["Heart","Liver","Lungs","Kidney","Eye"]
    },
    bloodGroup:{
        type:String,
        enum:["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]   
    },
})

module.exports = mongoose.models("Organ",organSchema);