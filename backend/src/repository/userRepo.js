const DonatedOrgan = require("../models/DonatedOrgan");
const User = require("../models/User");
const RequestedOrgan = require('../models/RequestedOrgan');

class userRepository {

    async createUser (data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error in user repository');
        }
    }
    async findUser(data){
        try {
            const user = await User.findOne({email:data.email});
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while logging in');
        }
    }

    async createRequest(data){
        try{
            const requestedOrgan = RequestedOrgan.create(data);
            return requestedOrgan;
        }catch(error){
            console.log(error);
            throw new Error('Error while logging in');
        }
    }

    async createDonation(data){
        try {
            const donation = await DonatedOrgan.create(data);
            return donation;
        } catch (error) {
            console.log(error);
            throw new Error('Error in donation creation');
        }
    }
}

module.exports = userRepository;