import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillingHistory = () => {
  const [billingHistory, setBillingHistory] = useState([]);
  const HOST = process.env.REACT_APP_HOST;

  useEffect(() => {
    const fetchBillingHistory = async () => {
      const customerData = JSON.parse(localStorage.getItem("customerData"));
      if (customerData && customerData.account_number) {
        try {
          const response = await fetch(`${HOST}/customer/billing_history`, {
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
            setBillingHistory(json.data);
          } else {
            toast.error(json.detail);
          }
        } catch (err) {
          toast.error("An error occurred while fetching billing history.");
        }
      } else {
        console.log("No customer data found in local storage."); // Debugging log
      }
    };

    fetchBillingHistory();
  }, [HOST]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold mb-4">Billing History</h2>
      <ul>
        {billingHistory.length > 0 ? (
          billingHistory.map((bill, index) => (
            <li key={index} className="flex justify-between mb-4">
              <span>{bill.date}</span>
              <span
                className={`font-bold ${
                  bill.status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                ${bill.amount.toFixed(2)} - {bill.status}
              </span>
            </li>
          ))
        ) : (
          <li>No billing history available</li>
        )}
      </ul>
    </div>
  );
};

export default BillingHistory;
