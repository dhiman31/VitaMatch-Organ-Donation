const Allocation = require("../models/Allocation");
const RequestedOrgan = require("../models/RequestedOrgan");
const User = require("../models/User");
const DonorRepository = require("../repository/donorRepo");
const requestOrgan = require("../repository/doctorRepo");
const userRepository = require("../repository/userRepo");
const Notification = require("../models/Notification");
const DonatedOrgan = require("../models/DonatedOrgan");
const GeocodingService = require("./geocodingService");

class DonorService {
    constructor(){
        this.userRepository = new userRepository
        this.DonorRepository = new DonorRepository
        this.requestOrganRepo = new requestOrgan
        this.geocodingService = new GeocodingService();
    }

    async createDonation(data) {
      const donor = await User.findById(data.donorId);
      if (!donor) throw new Error("Donor not found");

      data.address = donor.address;
      data.location = donor.location;
      data.phoneNumber = donor.phoneNumber;

      return await this.DonorRepository.createDonation(data);
    }

    async confirmDonation(donatedOrganId,donorId,consentType) {
      try {
        const confirmed = await this.DonorRepository.confirmDonation(donatedOrganId,donorId,consentType);
        return confirmed;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    async findAllRequests(data){
      try {
        const requests = await this.DonorRepository.findAllRequests(data);
        return requests;
      } catch (error) {
        console.log(error);
        console.log(error);
      }
    }

    async confirmAllocation(allocationId) {
    const allocation = await Allocation.findById(allocationId);
    const organ = await DonatedOrgan.findById(allocation.organId);
    const request = await RequestedOrgan.findById(allocation.requestId);

    allocation.status = "MATCHED";
    organ.status = "ALLOCATED";
    request.status = "MATCHED";

    await allocation.save();
    await organ.save();
    await request.save();

    await Notification.create({
    userId: request.createdByDoctorId,
    message: "Donor has CONFIRMED the organ transplant request.",
    allocationId: allocation._id
    });

    return allocation;
  }

  async rejectAllocation(allocationId) {
    const allocation = await Allocation.findById(allocationId);
    const organ = await DonatedOrgan.findById(allocation.organId);
    const request = await RequestedOrgan.findById(allocation.requestId);

    allocation.status = "REJECTED";
    organ.status = "AVAILABLE";
    request.status = "WAITING";
    request.allocationId = null;

    await allocation.save();
    await organ.save();
    await request.save();

    await Notification.create({
    userId: request.createdByDoctorId,
    message: "Donor has REJECTED the transplant request. Organ returned to pool.",
    allocationId: allocation._id
    });

    return allocation;
  }

  async findAll(donorId){
    try {
      const all = await this.DonorRepository.findAll(donorId);
      return all;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

module.exports = DonorService;