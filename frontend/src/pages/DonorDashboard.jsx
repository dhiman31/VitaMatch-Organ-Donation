import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import impact from "../assets/impact.json";
import logo from "../assets/logo.png";

const DonorDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("needs");
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [hospitalNeeds, setHospitalNeeds] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const [formData, setFormData] = useState({
    organ: "",
    bloodgroup: "",
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
      await axios.post(
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

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-xl">

            <form onSubmit={submitDonation} className="space-y-3">

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

              <button className="bg-blue-600 text-white w-full py-2 rounded">
                Donate
              </button>

            </form>
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
