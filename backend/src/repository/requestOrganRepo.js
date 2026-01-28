const DonatedOrgan = require('../models/DonatedOrgan');
const Hospital = require('../models/Hospital');
const RequestedOrgan = require('../models/RequestedOrgan');

class requestOrgan {
    async createRequest(data){
        try {
            const requestOrgan = await RequestedOrgan.create(data);
            let hospital = await Hospital.findById(requestOrgan.hospitalId)

            hospital = await Hospital.findByIdAndUpdate(requestOrgan.hospitalId,{
                $push : {
                    request : requestOrgan._id
                }
            },
            { new: true })

           return requestOrgan;
        } catch (error) {
            console.log(error)
            throw new Error('Problem in repository')
        }
    }

    async findAllByHospitalId(hospitalId){
        try {
            const requestedOrgans = await RequestedOrgan.find({hospitalId:hospitalId})
            return requestedOrgans;
            // will return array of requestedOrgan model instance

        } catch (error) {
            console.log(error)
            throw new Error('Problem in repository')
        }
    }

    // find all by organ and bloodGroup
    async findAllWaiting(organName , bloodGroup){
        try {
            const organs = await RequestedOrgan.find({organName , bloodGroup , status : "WAITING"})
            return organs
        } catch (error) {
            console.log(error)
            throw new Error('Problem in repository')
        }
    }

}

module.exports = requestOrgan;