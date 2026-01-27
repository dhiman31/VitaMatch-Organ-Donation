const { JWT_SECRET } = require("../config/serverConfig");
const jwt = require('jsonwebtoken');
const userService = require("../services/userService")
const userServ = new userService;

const signup = async (req,res) => {
    try {
        const user = await userServ.createUser(req.body);
        return res.status(201).json({
            data : user,
            succes : true,
            message : 'User Signed up successfully',
            err : {}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            succes : false,
            message : 'User signup failed',
            err : error
        })
    }
}

const login = async (req,res) => {
    try {
        const token = await userServ.login(req.body);
        return res.status(201).json({
            data : token,
            succes : true,
            message : 'User Logged in successfully',
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            succes : false,
            message : 'User Login failed',
            err : error
        })
    }
}

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

        const requestOrgan =await userServ.requestOrgan({
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

        const donateOrgan = await userServ.createDonation({
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

module.exports = {
    signup,
    login,
    requestedOrgan,
    createDonation
}