const mongoose = require('mongoose');

const requestedOrgan = new mongoose.Schema({
    organId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organ"
    },
    hospitalId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Hospital"
    },
    status : {
        type : String,
        enum : ["pending","fullfilled"]
    }
})

const RequestedOrgan = mongoose.model('RequestedOrgan' , requestedOrgan);
module.exports = RequestedOrgan;