const userRepository = require("../repository/userRepo");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/serverConfig");

class userService {
    constructor(){
        this.userRepository = new userRepository;
    }

    async createUser(data){
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error in user service');
        }
    }
    async login(data){
        try{
            const user = await this.userRepository.findUser(data);
            if(!user){
                throw new Error('Email do not exists');
            }
            bcrypt.compare(data.password, user.password, (err, result) => {
                if(err) {
                    throw new Error('Error comparing passwords:');
                }
                if(!result){
                    throw new Error('Passwords do not match');
                }
            });

            const token = jwt.sign({id:user.id,email:user.email,role:user.role},JWT_SECRET,{expiresIn:60*60});
            return token;
        }
        catch(error){
            console.log(error);
        }
    }
    async requestOrgan(data){
        try{
            if(data.role!='DOCTOR'){
                throw new Error("Only Doctor can request organ");
            }
            const doctor = await User.findById(data.userId);
            const requestedOrgan = this.userRepository.createRequest({
                organName:data.organName,
                bloodGroup:data.bloodGroup,
                hospitalId:doctor.hospitalId,
                doctorName:doctor.name
            });
            return requestedOrgan;
            
        }catch(error){  
            console.log("error in organ request");
            throw new Error("error in organ request")
        }
    }
}

module.exports = userService;