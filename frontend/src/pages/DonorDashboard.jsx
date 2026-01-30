import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import impact from "../assets/impact.json";
import logo from "../assets/logo.png";

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState("needs");
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [myRequests, setMyRequests] = useState([]);

  const [formData, setFormData] = useState({
    organ: "",
    bloodgroup: "",
    consent: false,
  });

  const navigate = useNavigate();

  const hospitalNeeds = [
    { id: 1, hospital: "AIIMS Delhi", organ: "Kidney", blood: "O+", city: "Delhi", urgency: "High" },
    { id: 2, hospital: "Apollo Hospital", organ: "Liver", blood: "A+", city: "Chennai", urgency: "Medium" },
    { id: 3, hospital: "Fortis Hospital", organ: "Heart", blood: "B+", city: "Mumbai", urgency: "High" },
  ];

  function openDonationForm(req) {
    setSelectedRequest(req);
    setFormData({
      organ: req.organ || "",
      bloodgroup: req.blood || "",
      consent: false,
    });
    setShowForm(true);
  }

  function submitDonation(e) {
    e.preventDefault();
    setMyRequests(prev => [
      ...prev,
      {
        ...selectedRequest,
        organ: formData.organ,
        blood: formData.bloodgroup,
        status: "Pending",
        type: selectedRequest.type || "hospital-request",
      },
    ]);
    setShowForm(false);
    setActiveTab("myRequests");
  }

  return (
    <div className="min-h-screen flex bg-white text-gray-800">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-100 border-r p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="h-10" />
          {/* <h2 className="text-xl font-extrabold">VitaMatch</h2> */}
        </div>

        <nav className="flex flex-col gap-4">
          <button onClick={() => setActiveTab("needs")} className={`text-left ${activeTab === "needs" && "font-bold text-blue-600"}`}>
            🏥 Hospital Needs
          </button>
          <button onClick={() => setActiveTab("voluntary")} className={`text-left ${activeTab === "voluntary" && "font-bold text-blue-600"}`}>
            ❤️ Willing Donation
          </button>
          <button onClick={() => setActiveTab("myRequests")} className={`text-left ${activeTab === "myRequests" && "font-bold text-blue-600"}`}>
            📄 My Requests
          </button>

          <button className="mt-auto text-left text-red-500" onClick={() => navigate("/login")}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-6 py-12 overflow-y-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-900">Welcome Donor ❤️</h1>
          <p className="text-gray-600 mt-2">Choose how you want to help save lives.</p>
        </motion.div>

        {/* FORM */}
        {showForm && (
          <motion.div className="max-w-xl bg-white rounded-3xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {selectedRequest?.type === "voluntary" ? "Voluntary Donation" : "Donate to Hospital"}
            </h2>

            <form onSubmit={submitDonation} className="space-y-4">
              <input
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Organ Name"
                value={formData.organ}
                onChange={(e) => setFormData({ ...formData, organ: e.target.value })}
                required
              />

              <select
                className="w-full border rounded-lg px-4 py-2"
                value={formData.bloodgroup}
                onChange={(e) => setFormData({ ...formData, bloodgroup: e.target.value })}
                required
              >
                <option value="">Select Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </select>

              <label className="flex gap-2 text-sm text-gray-600">
                <input type="checkbox" required />
                I voluntarily consent to donate this organ.
              </label>

              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold">
                  Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* HOSPITAL NEEDS */}
        {activeTab === "needs" && !showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitalNeeds.map(req => (
              <motion.div
                key={req.id}
                className="bg-white border rounded-2xl p-6 shadow"
              >
                {req.urgency === "High" && (
                  <span className="text-xs text-red-600 font-bold">URGENT</span>
                )}
                <h3 className="text-xl font-bold">{req.hospital}</h3>
                <p>Organ: {req.organ}</p>
                <p>Blood: {req.blood}</p>
                <p>City: {req.city}</p>

                <button
                  onClick={() => openDonationForm({ ...req, type: "hospital-request" })}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  I Can Donate
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* VOLUNTARY */}
        {activeTab === "voluntary" && !showForm && (
          <div className="max-w-xl bg-white rounded-2xl p-8 shadow">
            <h2 className="text-2xl font-bold mb-4">Voluntary Donation</h2>
            <button
              onClick={() => openDonationForm({ type: "voluntary" })}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              Proceed to Donate
            </button>

            <Lottie animationData={impact} loop className="w-72 mx-auto mt-6" />
          </div>
        )}

        {/* MY REQUESTS */}
        {activeTab === "myRequests" && (
          <div className="bg-white rounded-2xl p-8 shadow max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">My Requests</h2>

            {myRequests.length === 0 ? (
              <p className="text-gray-500">No requests yet.</p>
            ) : (
              myRequests.map((req, i) => (
                <div key={i} className="border rounded-lg p-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{req.hospital || "Voluntary Donation"}</p>
                    <p className="text-sm text-gray-500">{req.organ} • {req.blood}</p>
                  </div>
                  <span className="text-yellow-600 font-semibold">{req.status}</span>
                </div>
              ))
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default DonorDashboard;
