const mongoose = reqiure('mongoose');

const allocationSchema = new mongoose.Schema({
    donorType: {
            type: String,
            enum: ["User", "Hospital"],
            required: true
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "donorType"
    },
    requestDoctorName : {
        type : String
    },
    hospitalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    status : {
        enum : ["matched","transplanted"]
    }
})

const Allocation = mongoose.model('Allocation',allocationSchema)
module.exports = Allocation