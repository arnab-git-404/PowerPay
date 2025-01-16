import React, { useState, useContext } from "react";
import globalContext from "../context/global/globalContext";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  // Demo data
  const user = {
    name: "John Doe",
    lastLogin: "November 22, 2024",
    accountNumber: "123-456-7890",
    balance: 150.0,
    dueAmount: 175.0,
    dueDate: "November 30, 2024",
  };

  const paymentHistory = [
    { date: "October 20, 2024", amount: 150.0, status: "Paid" },
    { date: "September 20, 2024", amount: 125.0, status: "Paid" },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const gcontext = useContext(globalContext);
  const { notify } = gcontext;

  // Function to handle payment modal
  const handlePayment = () => {
    setShowModal(true);
    setSelectedPayment(null);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  // Function to handle payment selection
  const handlePaymentSelection = (type) => {
    setSelectedPayment(type);
  };

  // Function to handle confirmation
  const handleConfirmPayment = () => {
    console.log(`Confirmed: ${selectedPayment}`);

    notify("Payment Successful", "success");
    alert("Payment Successful");

    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-4">Last login: {user.lastLogin}</p>

          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold">Account Overview</h3>
            <p>Account Number: {user.accountNumber}</p>
            <p>Current Balance: ${user.balance.toFixed(2)}</p>
            <p>Due Date: {user.dueDate}</p>
            <p>Total Due: ${user.dueAmount.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-6 ">
            <h3 className="text-xl font-semibold mb-4 flex justify-between ">
              Recent Transactions
              <Link
                to="/customer/billing-history"
                className="text-blue-600 hover:underline "
              >
                View All
              </Link>
            </h3>

            <ul>
              {paymentHistory.map((payment, index) => (
                <li key={index} className="flex justify-between mb-4">
                  <span>{payment.date}</span>
                  <span
                    className={`font-bold ${
                      payment.status === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${payment.amount.toFixed(2)} - {payment.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-violet-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <ul>
              <li className="mb-2">
                <Link
                  to="/customer/update-contact"
                  className="text-blue-600 hover:underline"
                >
                  Update Contact Info
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/customer/reset_password/:token"
                  className="text-blue-600 hover:underline"
                >
                  Change Password
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/customer/billing-history"
                  className="text-blue-600 hover:underline"
                >
                  Billing History
                </Link>
              </li>

              <li>
                <Link
                  to="/customer/login"
                  className="text-blue-600 hover:underline"
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {selectedPayment ? (
              // Confirmation Screen
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Confirm {selectedPayment}
                </h2>
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    onClick={handleConfirmPayment}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => setSelectedPayment(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              // Payment Selection Screen
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Select Payment Method
                </h2>
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    onClick={() => handlePaymentSelection("Online Payment")}
                  >
                    Online Payment
                  </button>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                    onClick={() => handlePaymentSelection("Offline Payment")}
                  >
                    Offline Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
