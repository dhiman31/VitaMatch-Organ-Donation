import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-6 md:px-12 py-20">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          Learn More About Organ Donation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover how organ donation works, why it matters, and how{" "}
          <span className="text-blue-600 font-semibold">VitaMatch</span> connects
          donors and hospitals to save lives ethically and securely.
        </p>
      </motion.div>

      {/* Why Donation */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Organ Donation Matters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Save Lives",
              desc: "One organ donor can save up to 8 lives and improve many more through tissue donation.",
            },
            {
              title: "Critical Shortage",
              desc: "Thousands of patients wait every year due to lack of timely organ availability.",
            },
            {
              title: "Lasting Impact",
              desc: "Donation creates hope, healing families and communities for generations.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center mb-14">
          How VitaMatch Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Donor Registration",
              desc: "Donors register securely and give consent through the VitaMatch platform.",
            },
            {
              step: "02",
              title: "Hospital Verification",
              desc: "Only verified hospitals can access the system, ensuring ethical compliance.",
            },
            {
              step: "03",
              title: "Smart Matching",
              desc: "Advanced matching connects donors and recipients quickly and safely.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="absolute -top-6 left-6 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Safety & Ethics */}
      <div className="max-w-4xl mx-auto mt-28 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Safety, Privacy & Ethics
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          VitaMatch strictly follows national organ donation regulations. All
          donor data is encrypted, hospitals are verified, and every match is
          handled transparently with respect and medical ethics.
        </p>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-32 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your single decision today can give someone a second chance at life.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
          >
            Become a Donor
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LearnMore;