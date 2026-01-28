const mongoose = require('mongoose');

const requestedOrganSchema = new mongoose.Schema({
    organName: {
        type: String,
        enum: ["Heart", "Liver", "Lungs", "Kidney", "Eye"]
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    doctorName: {
        type : String
    },
    address : {
        type : String
    },
    urgencyScore: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    },
    waitingSince: {
        type: Date,
        default: Date.now
    },
    allocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Allocation"
    },
    status: {
        type: String,
        enum: ["WAITING", "MATCHED", "TRANSPLANTED", "CANCELLED"],
        default: "WAITING"
    }
}, { timestamps: true });

module.exports = mongoose.model('RequestedOrgan', requestedOrganSchema);
