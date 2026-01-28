import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import heart from "../assets/heart.json";

const Home = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-6 md:px-12">

      {/* Dark Mode Button */}
      <button
        onClick={toggleDark}
        className="fixed top-4 right-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-black px-3 py-1 rounded-md transition"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-24">
        
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            A Second Chance at Life
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">
            We connect registered donors and hospitals to help patients receive critical organ transplants in time.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </motion.div>

        {/* Right Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Lottie animationData={heart} loop={true} className="w-[320px] md:w-[420px]" />
        </motion.div>
      </div>

      {/* Why Section */}
      <div className="text-center py-14 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Why Organ Donation Matters?</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Every year, thousands of people wait for organ transplant surgeries, but many never receive them. A single donor can save{" "}
          <span className="font-semibold">up to 8 lives</span> and dramatically improve many others.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        {[
          { value: "8+", label: "Lives Saved per Donor" },
          { value: "50,000+", label: "Patients Waiting" },
          { value: "1 Act", label: "Can Change a Life" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center"
          >
            <div className="text-4xl font-bold text-blue-600 mb-1">{s.value}</div>
            <div className="text-gray-700 dark:text-gray-300">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-600 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} VitaMatch — Organ Donation Platform
      </div>
    </div>
  );
};

export default Home;
