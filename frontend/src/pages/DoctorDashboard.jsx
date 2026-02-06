import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("donors");
  const [showMedicalForm, setShowMedicalForm] = useState(false);
  const [showNeedForm, setShowNeedForm] = useState(false);
  const [showWalkInForm, setShowWalkInForm] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  /* ---------------- DONOR REQUESTS (ONLINE + WALK-IN) ---------------- */

  const [donorRequests, setDonorRequests] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      organ: "Kidney",
      blood: "O+",
      city: "Delhi",
      status: "Pending",
      source: "online",
    },
    {
      id: 2,
      name: "Anita Verma",
      organ: "Liver",
      blood: "A+",
      city: "Jaipur",
      status: "Approved",
      source: "walk-in",
    },
  ]);

  /* ---------------- HOSPITAL NEEDS (GLOBAL) ---------------- */

  const [hospitalNeeds, setHospitalNeeds] = useState([
    {
      id: 1,
      hospital: "AIIMS Delhi",
      organ: "Heart",
      blood: "B+",
      urgency: "High",
    },
    {
      id: 2,
      hospital: "Apollo Chennai",
      organ: "Liver",
      blood: "A+",
      urgency: "Medium",
    },
  ]);

  /* ---------------- HANDLERS ---------------- */

  function approveDonor(donor) {
    setDonorRequests((prev) =>
      prev.map((d) =>
        d.id === donor.id ? { ...d, status: "Approved" } : d
      )
    );
  }

  function rejectDonor(id) {
    setDonorRequests((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Rejected" } : d
      )
    );
  }

  function sendEmail(donor) {
    alert(`Email sent to ${donor.name} to visit hospital 📧`);
  }

  function openMedicalForm(donor) {
    setSelectedDonor(donor);
    setShowMedicalForm(true);
  }

  function saveMedicalDetails(e) {
    e.preventDefault();
    setShowMedicalForm(false);
    alert("Medical details updated successfully 🩺");
  }

  function createHospitalNeed(e) {
    e.preventDefault();
    const form = e.target;

    setHospitalNeeds((prev) => [
      ...prev,
      {
        id: Date.now(),
        hospital: "Your Hospital",
        organ: form.organ.value,
        blood: form.blood.value,
        urgency: form.urgency.value,
      },
    ]);

    setShowNeedForm(false);
  }

  function registerWalkInDonor(e) {
    e.preventDefault();
    const form = e.target;

    setDonorRequests((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name.value,
        organ: form.organ.value,
        blood: form.blood.value,
        city: form.city.value,
        status: "Pending",
        source: "walk-in",
      },
    ]);

    setShowWalkInForm(false);
    setActiveTab("donors");
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex bg-white text-gray-800">

      {/* SIDEBAR */}
      <aside className="w-64 border-r p-6 hidden md:flex flex-col">
        <div
          className="flex items-center gap-2 cursor-pointer mb-10"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-10" />
          {/* <h2 className="text-xl font-bold">VitaMatch</h2> */}
        </div>

        <nav className="flex flex-col gap-4">
          <button onClick={() => setActiveTab("donors")}>🧑‍🤝‍🧑 Donor Requests</button>
          <button onClick={() => setActiveTab("needs")}>🏥 Hospital Needs</button>
          <button onClick={() => setShowWalkInForm(true)}>
            🚶 Walk-in Donor
          </button>

          <button className="mt-auto text-red-500" onClick={() => navigate("/")}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-8 py-10">

        <h1 className="text-4xl font-bold mb-8">Doctor Dashboard 👨‍⚕️</h1>

        {/* ---------------- DONOR REQUESTS ---------------- */}
        {activeTab === "donors" && (
          <div className="grid md:grid-cols-2 gap-6">
            {donorRequests.map((donor) => (
              <motion.div
                key={donor.id}
                whileHover={{ scale: 1.02 }}
                className="border rounded-xl p-6 shadow"
              >
                <h3 className="text-xl font-semibold">{donor.name}</h3>
                <p>Organ: {donor.organ}</p>
                <p>Blood: {donor.blood}</p>
                <p>City: {donor.city}</p>

                <span className="text-xs text-gray-500">
                  Source: {donor.source === "walk-in" ? "Walk-in (Hospital)" : "Online"}
                </span>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      donor.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : donor.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donor.status}
                  </span>

                  {donor.status === "Pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveDonor(donor)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectDonor(donor.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {donor.status === "Approved" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => sendEmail(donor)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Send Email
                      </button>
                      <button
                        onClick={() => openMedicalForm(donor)}
                        className="px-3 py-1 bg-gray-800 text-white rounded"
                      >
                        Update Details
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ---------------- HOSPITAL NEEDS ---------------- */}
        {activeTab === "needs" && (
          <div>
            <button
              onClick={() => setShowNeedForm(true)}
              className="mb-6 bg-blue-600 text-white px-5 py-2 rounded"
            >
              + Create Hospital Need
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {hospitalNeeds.map((need) => (
                <div key={need.id} className="border rounded-xl p-5 shadow">
                  <h3 className="font-bold">{need.hospital}</h3>
                  <p>Organ: {need.organ}</p>
                  <p>Blood: {need.blood}</p>
                  <span className="text-sm font-semibold text-red-600">
                    {need.urgency} Urgency
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- WALK-IN DONOR MODAL ---------------- */}
        {showWalkInForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <form
              onSubmit={registerWalkInDonor}
              className="bg-white p-6 rounded-xl w-[420px]"
            >
              <h3 className="font-bold mb-4">Register Walk-in Donor</h3>
              <input name="name" className="border w-full p-2 mb-2" placeholder="Donor Name" required />
              <input name="organ" className="border w-full p-2 mb-2" placeholder="Organ" required />
              <input name="blood" className="border w-full p-2 mb-2" placeholder="Blood Group" required />
              <input name="city" className="border w-full p-2 mb-3" placeholder="City" required />
              <button className="bg-green-600 text-white w-full py-2 rounded">
                Register Donor
              </button>
            </form>
          </div>
        )}

        {/* ---------------- MEDICAL DETAILS MODAL ---------------- */}
        {showMedicalForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <form
              onSubmit={saveMedicalDetails}
              className="bg-white p-6 rounded-xl w-[420px]"
            >
              <h3 className="font-bold mb-3">
                Medical Details – {selectedDonor?.name}
              </h3>
              <textarea className="border w-full p-2 mb-3" placeholder="Medical history" required />
              <textarea className="border w-full p-2 mb-3" placeholder="Required tests" required />
              <input type="date" className="border w-full p-2 mb-3" required />
              <button className="bg-blue-600 text-white w-full py-2 rounded">
                Save Details
              </button>
            </form>
          </div>
        )}

        {/* ---------------- CREATE NEED MODAL ---------------- */}
        {showNeedForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <form
              onSubmit={createHospitalNeed}
              className="bg-white p-6 rounded-xl w-[400px]"
            >
              <h3 className="font-bold mb-3">Create Hospital Need</h3>
              <input name="organ" className="border w-full p-2 mb-2" placeholder="Organ" required />
              <input name="blood" className="border w-full p-2 mb-2" placeholder="Blood Group" required />
              <select name="urgency" className="border w-full p-2 mb-3">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <button className="bg-blue-600 text-white w-full py-2 rounded">
                Create Need
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

export default DoctorDashboard;
