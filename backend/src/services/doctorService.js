const User = require("../models/User");
const requestOrgan = require("../repository/requestOrganRepo");

class doctorService{
    constructor(){
        this.requestOrganRepo = new requestOrgan;
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



}

module.exports = doctorService;
