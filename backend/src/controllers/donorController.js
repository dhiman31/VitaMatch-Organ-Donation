const { JWT_SECRET } = require("../config/serverConfig");
const donorService = require("../services/donorService");
const jwt = require('jsonwebtoken');
const { findAllAvailable } = require("./doctorController");

const donorServ = new donorService;

const createDonation = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const organName = req.body.organName;
        const bloodGroup = req.body.bloodGroup;
        if(!token){
            throw new error('Not authenticated!!');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const role = decoded.role;

        const donateOrgan = await donorServ.createDonation({
            organName,bloodGroup,userId,role
        })

        return res.status(201).json({
            data : donateOrgan,
            success:true,
            messgae:'Successfully added organ for donation',
            err : {}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            succes : false,
            message : 'Request Failed',
            message : 'Not able to add organ for donation',
            err : error
        })
    }
}

const findAllWaiting = async (req,res) => {
    try {
        const waitingRequests = await donorServ.findAllWaiting(req.organName,req.bloodGroup);
        if(!waitingRequests){
            console.log("No such requests")
        }

        return res.status(201).json({
            data : waitingRequests,
            succes : true,
            message : 'Fetched all such waiting organs requests',
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

const acceptOneRequest = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token){
             throw new Error('Token Not Found');
        }

        const decoded = jwt.verify(token,JWT_SECRET);
        const userId = decoded.id;
        const role=decoded.role;

        const allocation = await donorServ.accept({
            organId : userId,
            donorType : role
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
    createDonation,
    acceptOneRequest,
    findAllWaiting
}