const DonatedOrgan = require('../models/DonatedOrgan');
const Hospital = require('../models/Hospital');
const RequestedOrgan = require('../models/RequestedOrgan');
const User = require('../models/User');
const Allocation = require("../models/Allocation");

class DoctorRepository {

    async createRequest(data){
        try {
            const doctor = await User.findById(data.doctorId);
            if (!doctor) throw new Error("Doctor not found");

            data.doctorName = doctor.name;
            data.address = doctor.address;
            data.hospitalId = doctor.hospitalId;
            data.phoneNumber = doctor.phoneNumber;

            const organ = await RequestedOrgan.create(data);

            if (doctor.hospitalId) {
                await Hospital.findByIdAndUpdate(
                    doctor.hospitalId,
                    { $push: { request: organ._id } }
                );
            }

            return organ;

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async findAllAvailable(data){
        try {
            const organs = await DonatedOrgan.find({
                organName: data.organName,
                bloodGroup: data.bloodGroup,
                status: "AVAILABLE"
            });
            return organs;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getDoctorRequests(doctorId){
        try {
            const requests = await RequestedOrgan.find({ doctorId })
                .sort({ createdAt: -1 });
            return requests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getHospitalRequests(doctorId){
        try {
            const doctor = await User.findById(doctorId);
            if(!doctor) throw new Error("Doctor not found");

            const requests = await RequestedOrgan.find({
                hospitalId: doctor.hospitalId
            }).sort({ createdAt: -1 });

            return requests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getDoctorAllocations(doctorId, statusFilter) {
        try {
            // 1️⃣ Find all requests created by this doctor
            const doctorRequests = await RequestedOrgan.find({ doctorId }).select("_id");
            const requestIds = doctorRequests.map(r => r._id);

            // 2️⃣ Build status filter
            let statusQuery = {};
            if (statusFilter === "ALL_ACTIVE") {
                statusQuery.status = { $in: ["PENDING_CONFIRMATION", "MATCHED", "IN_TRANSIT"] };
            } else if (statusFilter && statusFilter !== "ALL") {
                statusQuery.status = statusFilter;
            }

            // 3️⃣ Fetch allocations only for this doctor's requests
            const allocations = await Allocation.find({
                requestId: { $in: requestIds },
                ...statusQuery
            })
            .populate("organId", "organName bloodGroup status donorId")
            .populate("requestId", "organName urgencyScore status")
            .populate("hospitalId", "name");

            return allocations;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = DoctorRepository;
