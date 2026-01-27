const mongoose= require('mongoose');
const dbConnect =require('../config/db');
const User = require('../models/User')
const Hospital =require("../models/Hospital")

const seedDoctor = async () => {
  try {
    // Find a hospital to assign doctor
    const hospital = await Hospital.findOne({ name: "AIIMS Delhi" });

    if (!hospital) {
      throw new Error("Hospital not found. Seed hospitals first.");
    }

    // Remove old doctor if exists
    await User.deleteOne({ email: "doctor@vitamatch.com" });

    const doctor = await User.create({
      name: "Dr. Arjun Mehta",
      email: "doctor@vitamatch.com",
      password: "doctor123", // Will be auto-hashed
      role: "DOCTOR",
      hospitalId: hospital._id,
      phoneNumber: 9876543210,
      address: "AIIMS Campus, New Delhi"
    });

    console.log("Doctor created:", doctor.email);
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

dbConnect()
seedDoctor();