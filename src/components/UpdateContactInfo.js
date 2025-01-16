import React, { useState } from "react";

const UpdateContactInfo = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contact Information Updated!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-2xl font-semibold mb-4">
        Update Contact Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={contactInfo.address}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateContactInfo;
