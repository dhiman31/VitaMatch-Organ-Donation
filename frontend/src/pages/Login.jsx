import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate=useNavigate();
  const [role, setRole] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* choices to choose between doctor and donor */}
        <div className="flex mb-6">
          <button
            onClick={() => setRole("doctor")}
            className={`w-1/2 py-2 rounded-l-lg font-medium ${
              role === "doctor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Doctor
          </button>

          <button
            onClick={() => setRole("donor")}
            className={`w-1/2 py-2 rounded-r-lg font-medium ${
              role === "donor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Donor
          </button>
        </div>

       {/* login form  */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login as {role}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account? <span className="text-blue-600 cursor-pointer" onClick={()=>navigate('/signup')}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
