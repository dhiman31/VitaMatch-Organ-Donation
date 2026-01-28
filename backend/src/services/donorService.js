const Allocation = require("../models/Allocation");
const RequestedOrgan = require("../models/RequestedOrgan");
const User = require("../models/User");
const donateRepo = require("../repository/donateOrganRepo");
const requestOrgan = require("../repository/requestOrganRepo");
const userRepository = require("../repository/userRepo");

class donorService {
    constructor(){
        this.userRepository = new userRepository
        this.donateRepo = new donateRepo
        this.requestOrganRepo = new requestOrgan
    }

    async createDonation(data) {
        try {
          const { organName, bloodGroup, role, userId } = data;
    
          if (role === "DONOR") {
            return await this.donateRepo.createDonate({
              organName,
              bloodGroup,
              donor: "User",
              donorId: userId,
            });
          }
    
          const doctorObject = await User.findById(userId).select("hospitalId");
    
          if (!doctorObject) {
            throw new Error("User not found");
          }
    
          return await this.donateRepo.createDonate({
            organName,
            bloodGroup,
            donor: "Hospital",
            donorId: doctorObject.hospitalId,
          });
        } catch (error) {
          console.log(error);
          throw error;
        }
    }

    async findAllWaiting(organName,bloodGroup){
      try {
        const availableOrgans = await this.requestOrganRepo.findAllWaiting(organName , bloodGroup)
        return availableOrgans;
      } catch (error) {
        console.log(error);
        throw new Error("Error in service");
      }
    }

    async accept(data){
        try {
          const requestedOrgan = await RequestedOrgan.findById(data.organId)
          const allocation = await Allocation.create({
          donorType : data.type,
          donorId : data.donorId,
          requestDoctorName : requestedOrgan.doctorName,
          hospitalId : requestedOrgan.hospitalId,
          status : "Matched"
        })
    
        requestedOrgan.status = "MATCHED"
        requestedOrgan.allocationId = allocation.id
        requestedOrgan.save();
            
        return allocation;
            
      } catch (error) {
        console.log(error);
        throw new Error("Error in service");
      }
    }
}

module.exports = donorService;