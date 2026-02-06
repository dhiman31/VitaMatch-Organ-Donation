import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import impact from "../assets/impact.json";
import logo from "../assets/logo.png";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [organId,setOrganId]= useState(null);
  const [consent, setConsent] = useState(false);
  const [consentType, setConsentType] = useState("");

  const [activeTab, setActiveTab] = useState("needs");
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [hospitalNeeds, setHospitalNeeds] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const [formData, setFormData] = useState({
    organ: "",
    bloodgroup: "",
    consent:false
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchNeeds();
    fetchMyRequests();
  }, []);

  /* ================= API ================= */

  const fetchNeeds = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/donor/waitingOrgans",
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          },
        }
      );
  
      setHospitalNeeds(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/donor/all",
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          },
        }
      );

      setMyRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitDonation = async (e) => {
    e.preventDefault();


    try {

      const res = await axios.post(
        "http://localhost:5000/api/v1/donor/donateOrgan",
        {
          organName: formData.organ,
          bloodGroup: formData.bloodgroup,
          requestId: selectedRequest?._id,
        },
        {
          headers: {
           "x-access-token": localStorage.getItem("token")
          },
        }
      );
      console.log(res.data);
      setOrganId(res.data.data._id);
      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };

const submitConsent = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/v1/donor/confirmDonation",
        {
          organId:organId,
          consentType:consentType
        },
        {
          headers: {
           "x-access-token": localStorage.getItem("token")
          },
        }
      );

      setShowForm(false);
      fetchMyRequests();
      setActiveTab("myRequests");
    } catch (err) {
      console.log(err);
    }
  };  

  const openDonationForm = (req) => {
  setSelectedRequest(req);
  setFormData({
    organ: req?.organName || "",
    bloodgroup: req?.bloodGroup || "",
  });

  setConsent(false);
  setConsentType("");
  setStep(1);
  setShowForm(true);
};


  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <aside className="w-64 border-r p-6 hidden md:flex flex-col">
        <img
          src={logo}
          className="h-10 mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <nav className="flex flex-col gap-4">
          <button onClick={() => setActiveTab("needs")}>🏥 Hospital Needs</button>
          <button onClick={() => setActiveTab("voluntary")}>❤️ Willing Donation</button>
          <button onClick={() => setActiveTab("myRequests")}>📄 My Requests</button>

          <button
            className="mt-auto text-red-500"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">Welcome Donor ❤️</h1>

       {showForm && (
  <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-xl">

    {/* STEP 1 */}
    {step === 1 && (
      <form onSubmit={submitDonation} className="space-y-3">
        <h2 className="text-xl font-bold">Donation Details</h2>

        <input
          className="border w-full p-2"
          placeholder="Organ"
          value={formData.organ}
          onChange={(e) =>
            setFormData({ ...formData, organ: e.target.value })
          }
          required
        />

        <input
          className="border w-full p-2"
          placeholder="Blood Group"
          value={formData.bloodgroup}
          onChange={(e) =>
            setFormData({ ...formData, bloodgroup: e.target.value })
          }
          required
        />

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Continue
        </button>
      </form>
    )}

    {/* STEP 2 */}
    {step === 2 && (
      <form onSubmit={submitConsent} className="space-y-4">
        <h2 className="text-xl font-bold">Consent</h2>

        <select
          className="border w-full p-2"
          value={consentType}
          onChange={(e) => setConsentType(e.target.value)}
          required
        >
          <option value="">Select Consent Type</option>
          <option value="LIVING">Living Donation</option>
          <option value="POST_DEATH">Deceased Donation</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          I voluntarily consent to donate my organ.
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 border py-2 rounded"
          >
            Back
          </button>

          <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">
            Confirm Donation
          </button>
        </div>
      </form>
    )}
  </div>
)}



        {/* NEEDS */}
        {activeTab === "needs" && !showForm && (
          <div className="grid md:grid-cols-2 gap-6">
            {hospitalNeeds.map((h) => (
              <motion.div key={h._id} className="border p-6 rounded-xl shadow">
                <h3 className="font-bold">{h.organName}</h3>
                <p>{h.bloodGroup}</p>

                <button
                  onClick={() => openDonationForm(h)}
                  className="bg-blue-600 text-white mt-3 px-3 py-1 rounded"
                >
                  I Can Donate
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* VOLUNTARY */}
        {activeTab === "voluntary" && !showForm && (
          <div className="max-w-xl">
            <button
              onClick={() => openDonationForm({})}
              className="bg-green-600 text-white w-full py-3 rounded"
            >
              Proceed to Donate
            </button>

            <Lottie animationData={impact} loop className="w-72 mx-auto mt-6" />
          </div>
        )}

        {/* MY REQUESTS */}
        {activeTab === "myRequests" && (
          <div className="max-w-3xl">
            {myRequests.length === 0 ? (
              <p>No requests yet</p>
            ) : (
              myRequests.map((r) => (
                <div key={r._id} className="border p-4 mb-3 rounded shadow">
                  <p>{r.organName}</p>
                  <span>{r.status}</span>
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
