const DoctorRepository = require('../repository/doctorRepo');
const Allocation = require("../models/Allocation");
const DonatedOrgan = require("../models/DonatedOrgan");
const RequestedOrgan = require("../models/RequestedOrgan");
const Notification = require("../models/Notification");
const DistanceService = require("./distanceService");
const User = require("../models/User");

class DoctorService {

  constructor() {
    this.DoctorRepository = new DoctorRepository();
    this.distanceService = new DistanceService();
  }

  async requestOrgan(data) {
    return await this.DoctorRepository.createRequest(data);
  }

  async findAllAvailable(data, doctorId) {

    const organs =
      await this.DoctorRepository.findAllAvailable(data);

    const doctor = await User.findById(doctorId);

    if (!doctor || !doctor.location)
      throw new Error("Doctor location missing");

    const enrichedOrgans = await Promise.all(
      organs.map(async (organ) => {

        if (!organ.location) {
          return {
            ...organ.toObject(),
            distance: null,
            duration: null
          };
        }

        const route =
          await this.distanceService.getDistance(
            doctor.location,
            organ.location
          );

        return {
          ...organ.toObject(),
          distance: route.distance,
          duration: route.duration
        };
      })
    );

    return enrichedOrgans;
  }

  async acceptOrgan({ organId, requestId }) {

    const organ =
      await DonatedOrgan.findById(organId).populate("consentId");

    if (!organ) throw new Error("Organ not found");
    if (organ.status !== "AVAILABLE")
      throw new Error("Organ not available");

    if (!organ.consentId ||
        organ.consentId.status !== "VERIFIED")
      throw new Error("Consent not verified");

    const request =
      await RequestedOrgan.findById(requestId);

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

    organ.status = "RESERVED";
    request.status = "PENDING_CONFIRMATION";
    request.allocationId = allocation._id;

    await organ.save();
    await request.save();

    await Notification.create({
      userId: organ.donorId,
      message: "Hospital has requested transplant. Confirm or reject.",
      allocationId: allocation._id
    });

    return allocation;
  }

  async doctorDashboard(doctorId) {
    const myRequests =
      await this.DoctorRepository.getDoctorRequests(doctorId);

    const hospitalRequests =
      await this.DoctorRepository.getHospitalRequests(doctorId);

    return { myRequests, hospitalRequests };
  }

  async getDoctorAllocations(doctorId, status) {
    return await this.DoctorRepository
      .getDoctorAllocations(doctorId, status);
  }
}

module.exports = DoctorService;
