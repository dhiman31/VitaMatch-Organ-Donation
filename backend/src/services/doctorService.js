const DoctorRepository = require('../repository/doctorRepo');
const Allocation = require("../models/Allocation");
const DonatedOrgan = require("../models/DonatedOrgan");
const RequestedOrgan = require("../models/RequestedOrgan");
const Notification = require("../models/Notification");

class DoctorService {
  constructor() {
    this.DoctorRepository = new DoctorRepository();
  }

  async requestOrgan(data) {
    try {
      const organ = await this.DoctorRepository.createRequest(data);
      return organ;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAllAvailable(data) {
    try {
      const organs = await this.DoctorRepository.findAllAvailable(data);
      return organs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async acceptOrgan({ organId, requestId }) {

    const organ = await DonatedOrgan.findById(organId).populate("consentId");
    if (!organ) throw new Error("Organ not found");

    if (organ.status !== "AVAILABLE")
      throw new Error("Organ not available");

    if (!organ.consentId || organ.consentId.status !== "VERIFIED")
      throw new Error("Consent not verified");

    const request = await RequestedOrgan.findById(requestId);
    if (!request) throw new Error("Request not found");

    if (request.status !== "WAITING")
      throw new Error("Request not valid");

    const allocation = await Allocation.create({
      organId,
      requestId,
      hospitalId: request.hospitalId,
      matchScore: 100,
      status: "PENDING_CONFIRMATION"
    });

    // Reserve organ and update request
    organ.status = "RESERVED";
    request.status = "PENDING_CONFIRMATION";
    request.allocationId = allocation._id;

    await organ.save();
    await request.save();

    // Notify donor
    await Notification.create({
      userId: organ.donorId,
      message: "Hospital has requested transplant. Confirm or reject.",
      allocationId: allocation._id
    });

    return allocation;
  }

  async doctorDashboard(doctorId){
    try {
        const myRequests = await this.DoctorRepository.getDoctorRequests(doctorId);
        const hospitalRequests = await this.DoctorRepository.getHospitalRequests(doctorId);
        return { myRequests, hospitalRequests };
    } catch (error) {
        throw error;
    }
}

async getDoctorAllocations(doctorId, status){
    try {
        return await this.DoctorRepository.getDoctorAllocations(doctorId, status);
    } catch (error) {
        throw error;
    }
}

}

module.exports = DoctorService;
