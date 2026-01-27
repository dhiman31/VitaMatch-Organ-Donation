const mongoose= require("mongoose");

const donatedOrganSchema= new mongoose.Schema({
    organId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organ"
    },
    donor:{
        type:String,
        enum:["User","Hospital"],
        required:true
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "donor" 
    },
    status:{
        type:String,
        enum:["pending","donated"]
    }
})

module.exports = mongoose.model("DonatedOrgan",donatedOrganSchema);