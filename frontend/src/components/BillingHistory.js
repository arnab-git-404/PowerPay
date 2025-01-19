import React from 'react';

const BillingHistory = () => {
  const billingHistory = [
    { date: "October 20, 2024", amount: 150.00, status: "Paid" },
    { date: "September 20, 2024", amount: 125.00, status: "Paid" },
    { date: "August 20, 2024", amount: 135.00, status: "Paid" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Billing History</h2>
      <ul>
        {billingHistory.map((bill, index) => (
          <li key={index} className="flex justify-between mb-4">
            <span>{bill.date}</span>
            <span className={`font-bold ${bill.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
              ${bill.amount.toFixed(2)} - {bill.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillingHistory;
