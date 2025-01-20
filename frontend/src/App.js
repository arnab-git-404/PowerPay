import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomerLogin from "./components/CustomerLogin";
import CustomerSignUp from "./components/CustomerSignUp";
import CompanyLogin from "./components/CompanyLogin";
import CompanySignUp from "./components/CompanySignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import CustomerDashboard from "./components/CustomerDashboard";
import UpdateContactInfo from "./components/UpdateContactInfo";
import BillingHistory from "./components/BillingHistory";
import AdminDashboard from "./components/AdminDashboard";

// Main App Component
export default function App() {
  document.title = "PowerPay";

  return (
    <Router>
      {/* <div className="min-h-screen bg-lime-400 font-poppins"> */}
      <div className="min-h-screen  bg-gradient-to-b from-blue-500 via-purple-600 to-red-500 font-poppins">
        <Navbar />
        <Routes>
          {/* HomePage route */}
          <Route path="/" element={<Home />} />

          {/* User Entry Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/signup" element={<CustomerSignUp />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route
            path="/customer/update-contact"
            element={<UpdateContactInfo />}
          />
          <Route
            path="/customer/billing-history"
            element={<BillingHistory />}
          />

          {/* User Forget-Password Route */}
          <Route
            path="/customer/forgot_password"
            element={<ForgotPassword type={"Customer"} />}
          />

          {/* User Reset-Password Route */}
          <Route
            path="/customer/reset_password/:token"
            element={<ResetPassword type={"Customer"} />}
          />

          {/* Company Entry Routes */}
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<CompanySignUp />} />
          <Route path="/company" element={<AdminDashboard />} />

          {/* Company Reset-Password Route */}
          <Route
            path="/company/forgot_password"
            element={<ForgotPassword type={"Company"} />}
          />

          <Route
            path="/company/reset_password/:token"
            element={<ResetPassword type={"Company"} />}
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
