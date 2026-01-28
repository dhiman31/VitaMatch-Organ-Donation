const mongoose = require("mongoose");

const donatedOrganSchema = new mongoose.Schema({
    organName: {
        type: String,
        enum: ["Heart", "Liver", "Lungs", "Kidney", "Eye"]
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    donor: {
        type: String,
        enum: ["User", "Hospital"],
        required: true
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "donor"
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    address :{
        type : String
    },
    status: {
        type: String,
        enum: ["AVAILABLE", "ALLOCATED", "TRANSPLANTED", "EXPIRED"],
        default: "AVAILABLE"
    },
    allocationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Allocation"
    }
}, { timestamps: true });

module.exports = mongoose.model("DonatedOrgan", donatedOrganSchema);
