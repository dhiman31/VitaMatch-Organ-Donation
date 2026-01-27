const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name : {
        type : String
    },
    city : {
        type : String
    },
    doctor : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :  'Doctor'
        }
    ],
    request : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'RequestedOrgan'
        }
    ],
    donate : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'DonatedOrgan'
        }
    ]
})

const Hospital = mongoose.model('Hospital' , hospitalSchema);
module.exports = Hospital;