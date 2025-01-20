import React, { useState, useEffect, useContext } from "react";
import globalContext from "../context/global/globalContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { BsPersonCircle } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root"); // Required for accessibility

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accountDeleteModal, setaccountDeleteModal] = useState(false);
  const [updateUserInfoModal, setUpdateUserInfoModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const gcontext = useContext(globalContext);
  const { notify } = gcontext;
  const [rotating, setRotating] = useState(false);

  const navigate = useNavigate();
  const HOST = process.env.REACT_APP_HOST;

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerData = JSON.parse(localStorage.getItem("customerData"));
      if (customerData && customerData.account_number) {
        try {
          const response = await fetch(`${HOST}/customer/dashboard`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              account_number: customerData.account_number,
            }),
          });

          const json = await response.json();
          if (response.ok) {
            setCustomerData(json.data);
            setPaymentHistory(json.data.payment_history);
          } else {
            toast.error(json.detail);
          }
        } catch (err) {
          toast.error("An error occurred while fetching customer data.");
        }
      } else {
        console.log("No customer data found in local storage."); // Debugging log
      }
    };

    fetchCustomerData();
  }, [HOST]);

  const handleDeleteAccountModal = () => {
    setaccountDeleteModal(true);
  };

  const closeDeleteAccountModal = () => {
    setaccountDeleteModal(false);
  };

  const accountDeleteHandler = () => {
    toast.success("Your account has been deleted.");
    navigate("/");
    alert("Your account has been deleted.");
  };

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPayment(null);
  };

  const handlePaymentSelection = (type) => setSelectedPayment(type);

  const handleConfirmPayment = () => {
    notify(`Payment Successful: ${selectedPayment}`, "success");
    closeModal();
  };

  const updateUserModal = () => {
    setUpdateUserInfoModal(true);
  };

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-4xl p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="flex items-center text-4xl font-semibold mb-4">
            <BsPersonCircle className="text-4xl" />
            <span className="ml-2">Welcome, {customerData.name}!</span>
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

          <Modal
            isOpen={updateUserInfoModal}
            onRequestClose={() => setUpdateUserInfoModal(false)}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            <div>
              <p>Name</p>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Name"
              />
              <p>Email</p>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="Account Number"
              />
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">
                Save Changes
              </button>
              <button
                onClick={() => setUpdateUserInfoModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </Modal>

          <p className="text-gray-600 mb-4">
            Last login: {customerData.lastLogin}
          </p>
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold">Account Overview</h3>
            <p>Account Number: {customerData.account_number}</p>
            <p>
              Current Balance: ${customerData.balance?.toFixed(2) || "0.00"}
            </p>
            <p>Due Date: {customerData.dueDate || "N/A"}</p>
            <p>Total Due: ${customerData.due_amount?.toFixed(2) || "0.00"}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={openModal}
            >
              Pay Now
            </button>
          </div>

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
              {paymentHistory.length > 0 ? (
                paymentHistory.map((payment, index) => (
                  <li key={index} className="flex justify-between mb-4">
                    <span>{payment.date}</span>
                    <span
                      className={`font-bold ${
                        payment.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${payment.amount?.toFixed(2) || "0.00"} - {payment.status}
                    </span>
                  </li>
                ))
              ) : (
                <li>No recent transactions</li>
              )}
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
              <li>
                <Link
                  to="/customer/login"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/customer/login");
                  }}
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

          <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
          <div className="flex flex-col gap-4">
            <p>Password</p>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Enter Password"
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={accountDeleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
