const { JWT_SECRET } = require("../config/serverConfig");
const User = require("../models/User");
const doctorService = require("../services/doctorService");
const jwt = require('jsonwebtoken');

const doctorServ = new doctorService;

const requestedOrgan = async (req,res) => {
    try {
        const organName = req.body.organName ; 
        const bloodGroup = req.body.bloodGroup;
        const token = req.headers['x-access-token'];
        if(!token){
             throw new Error('Token Not Found');
        }

        const decoded = jwt.verify(token,JWT_SECRET);
        const userId = decoded.id;
        const role=decoded.role;

        const requestOrgan = await doctorServ.requestOrgan({
            organName,bloodGroup,userId,role
        });
        return res.status(201).json({
            data : requestOrgan,
            succes : true,
            message : 'Requested Successfully',
            err : {}
        })
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            succes : false,
            message : 'Request failed',
            err : error
        })
    }
}

const findAllAvailable = async (req,res) => {
    try {
        const availableOrgans = await doctorServ.findAllAvailable(req.organName,req.bloodGroup);
        if(!availableOrgans){
            console.log("No such available organs")
        }

        return res.status(201).json({
            data : availableOrgans,
            succes : true,
            message : 'Fetched all available organs for donation',
            err : {}
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            succes : false,
            message : 'Could not load',
            err : error
        })
    }
}

const acceptOneOrgan = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token){
             throw new Error('Token Not Found');
        }

        const decoded = jwt.verify(token,JWT_SECRET);
        const userId = decoded.id;
        const role=decoded.role;

        if(role != "DOCTOR"){
            throw new Error('Unauthorized!!')
        }

        const doctor = await User.findById(userId);

        const allocation = await doctorServ.accept({
            organId : req.body.organId,
            doctorName : doctor.name,
            hospitalId : doctor.hospitalId
        })

        return allocation;

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : {},
            succes : false,
            message : 'Could not accept',
            err : error
        })
    }
}

module.exports = {
    requestedOrgan,
    findAllAvailable,
    acceptOneOrgan
}