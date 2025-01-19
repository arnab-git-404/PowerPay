
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateContactInfo = () => {
  const [contactInfo, setContactInfo] = useState({
  
    house_no: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    branch: "",
  });

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/branches");
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();

    setBranches([ { id: 1, name: "Branch 1" }, { id: 2, name: "Branch 2" } ]);
  }, []);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/update-contact", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Contact Information Updated Successfully!");
      } else {
        toast.error(`Error: ${result.message || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Error updating contact info:", error);
      toast.error("Failed to update contact information.");
    }
    console.log(contactInfo);
    navigate("/customer");

  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Update Address Information</h2>

      <form onSubmit={handleSubmit}>
        {["house_no", "street", "city", "state", "zip"].map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-600">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={contactInfo[field]}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
        ))}

        {/* Branch Dropdown */}
        <div className="mb-4">
          <label htmlFor="branch" className="block text-sm font-medium text-gray-600">
            Select Branch
          </label>
          <select
            id="branch"
            name="branch"
            value={contactInfo.branch}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Select a Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Update
        </button>
      </form>

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UpdateContactInfo;

