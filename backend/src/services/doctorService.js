const Allocation = require("../models/Allocation");
const DonatedOrgan = require("../models/DonatedOrgan");
const User = require("../models/User");
const donateRepo = require("../repository/donateOrganRepo");
const requestOrgan = require("../repository/requestOrganRepo");

class doctorService{
    constructor(){
        this.requestOrganRepo = new requestOrgan;
        this.donateOrganRepo = new donateRepo;
    }
    async requestOrgan(data) {
        try {
          const doctor = await User.findById(data.userId);
          if (!doctor) {
            throw new Error("Doctor not found");
          }
          return await this.requestOrganRepo.createRequest({
            organName: data.organName,
            bloodGroup: data.bloodGroup,
            hospitalId: doctor.hospitalId,
            doctorName: doctor.name
          });
        } catch (error) {
          console.log(error);
          throw new Error("Error in organ request");
        }
    }

    async findAllAvailable(organName,bloodGroup){
      try {
        const availableOrgans = await this.donateOrganRepo.findAllAvailable(data.organName , data.bloodGroup)
        return availableOrgans;
      } catch (error) {
        console.log(error);
        throw new Error("Error in service");
      }
    }

    async accept(data){
      try {
        const selectedOrgan = await DonatedOrgan.findById(data.organId)
        const allocation = await Allocation.create({
          donorType : selectedOrgan.type,
          donorId : selectedOrgan.donorId,
          requestDoctorName : data.doctorName,
          hospitalId : data.hospitalId,
          status : "Matched"
        })

        selectedOrgan.status = "ALLOCATED"
        selectedOrgan.allocationId = allocation.id
        selectedOrgan.save();

        return allocation;

      } catch (error) {
        console.log(error);
        throw new Error("Error in service");
      }
    }

}

module.exports = doctorService;
