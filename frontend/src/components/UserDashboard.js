
import React, { useState, useContext } from "react";
import globalContext from "../context/global/globalContext";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { BsPersonCircle } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root"); // Required for accessibility

const UserDashboard = () => {
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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accountDeleteModal, setaccountDeleteModal] = useState(false);
  const [updateUserInfoModal, setUpdateUserInfoModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const gcontext = useContext(globalContext);
  const { notify } = gcontext;
  const [rotating, setRotating] = useState(false);

  const navigate = useNavigate();

  const handleDeleteAccountModal = () => {
    setaccountDeleteModal(true);
    // console.log("account deleted");
  };


  const closeDeleteAccountModal = () => {
    setaccountDeleteModal(false);
  };


  const accountDeleteHandler = () => {
    toast.success("Your account has been deleted.");
    navigate("/");
    alert("Your account has been deleted.");
  };


  // Open Payment Modal
  const openModal = () => setModalIsOpen(true);


  // Close Payment Modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPayment(null);
  };


  // Handle Payment Selection
  const handlePaymentSelection = (type) => setSelectedPayment(type);


  // Confirm Payment
  const handleConfirmPayment = () => {
    notify(`Payment Successful: ${selectedPayment}`, "success");
    // alert("Payment Successful");
    closeModal();
  };

  const updateUserModal = () => {
    setUpdateUserInfoModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-4xl p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Header */}

          <h2 className="flex items-center text-4xl font-semibold mb-4">
            <BsPersonCircle className="text-4xl" />
            <span className="ml-2">Welcome, {user.name}!</span>
            {/* Rotating Settings Icon */}
            <IoSettings
              className={`ml-auto text-4xl cursor-pointer transition-transform duration-500 ${
                rotating ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => {
                setRotating(!rotating);
                updateUserModal();
              }}
            />
          </h2>

          {/* Update User Info Modal */}
          <Modal
            isOpen={updateUserInfoModal}
            onRequestClose={() => setUpdateUserInfoModal(false)}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>

            {
              <div>
                <>
                  <p>Name</p>
                  <input
                    type="text"
                    // value={editingCustomer.name}

                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Name"
                  />
                </>

                <>
                  <p>Email</p>
                  <input
                    type="text"
                    // value={editingCustomer.ac_no}

                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Account Number"
                  />
                </>

                {/* <>
                  <p>Address</p>
                  <input
                    type="text"
                    // value={editingCustomer.address}

                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Address"
                  />
                </> */}

                <button
                  // onClick={}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setUpdateUserInfoModal(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            }
          </Modal>

          <p className="text-gray-600 mb-4">Last login: {user.lastLogin}</p>
          {/* Account Overview */}
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold">Account Overview</h3>
            <p>Account Number: {user.accountNumber}</p>
            <p>Current Balance: ${user.balance.toFixed(2)}</p>
            <p>Due Date: {user.dueDate}</p>
            <p>Total Due: ${user.dueAmount.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={openModal}
            >
              Pay Now
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 flex justify-between">
              Recent Transactions
              <Link
                to="/customer/billing-history"
                className="text-blue-600 hover:underline"
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

          {/* Account Settings */}
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
              <li className="mt-2">
                <Link
                  className="text-red-600 hover:underline"
                  onClick={handleDeleteAccountModal}
                >
                  Delete Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg"
            onClick={closeModal}
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
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={accountDeleteModal}
        onRequestClose={closeDeleteAccountModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg"
            onClick={closeDeleteAccountModal}
          >
            &times;
          </button>

          <>
            <h2 className="text-xl font-semibold mb-4">Delete Account</h2>

            <div className="flex flex-col gap-4">
              <>
                <p>Password</p>
                <input
                  type="password"
                  // value={}
                  // onChange={()}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="Enter Password"
                />
              </>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={accountDeleteHandler}
              >
                Delete
              </button>
            </div>
          </>
        </div>
      </Modal>


    </div>
  );
};

export default UserDashboard;
