import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UpdateContactInfo = () => {
  const [contactInfo, setContactInfo] = useState({
    account_number: "",
    house_no: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    branch: "",
  });

  const HOST = process.env.REACT_APP_HOST;
  let navigate = useNavigate();
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${HOST}/branch/branch_codes`);
        const json = await response.json();
        if (response.ok) {
          setBranches(json.data);
        } else {
          toast.error(json.message);
        }
      } catch (err) {
        toast.error("An error occurred while fetching branch codes.");
      }
    };

    fetchBranches();

    // Get account number from local storage
    const customerData = JSON.parse(localStorage.getItem("customerData"));
    if (customerData && customerData.account_number) {
      setContactInfo((prevInfo) => ({
        ...prevInfo,
        account_number: customerData.account_number,
      }));
    }
  }, [HOST]);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${HOST}/customer/set_address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });

      const json = await response.json();
      if (response.ok) {
        toast.success("Address saved successfully");
        navigate("/customer/dashboard");
      } else {
        toast.error(json.detail);
      }
    } catch (err) {
      toast.error("An error occurred while saving the address.");
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg pb-5 pt-2 mt-5">
          <div className="px-5 pt-4">
            <form className="mb-3 mt-4" onSubmit={handleSubmit}>
              <div className="text-3xl sm:text-4xl mb-5 font-semibold text-center">
                Update Contact Info
              </div>
              <div className="mb-3">
                <label
                  htmlFor="account_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="account_number"
                  name="account_number"
                  value={contactInfo.account_number}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="house_no"
                  className="block text-sm font-medium text-gray-700"
                >
                  House No
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="house_no"
                  name="house_no"
                  value={contactInfo.house_no}
                  onChange={handleChange}
                  placeholder="Enter house number"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="street"
                  name="street"
                  value={contactInfo.street}
                  onChange={handleChange}
                  placeholder="Enter street"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="city"
                  name="city"
                  value={contactInfo.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="state"
                  name="state"
                  value={contactInfo.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="zip"
                  name="zip"
                  value={contactInfo.zip}
                  onChange={handleChange}
                  placeholder="Enter ZIP code"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="branch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Branch
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="branch"
                  name="branch"
                  value={contactInfo.branch}
                  onChange={handleChange}
                >
                  <option value="">Select branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactInfo;
