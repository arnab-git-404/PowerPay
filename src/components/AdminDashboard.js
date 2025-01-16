import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data for customers
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', balance: 100.00 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', balance: 50.00 },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    balance: 0.00,
  });

  const [totalBills, setTotalBills] = useState(150.00); // Total of pending bills

  // Handle adding a new customer
  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.balance >= 0) {
      setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
      setTotalBills(totalBills + newCustomer.balance); // Add the new balance to the total pending bills
      setNewCustomer({ name: '', email: '', balance: 0.00 }); // Reset form fields
    }
  };

  // Handle deleting a customer
  const handleDeleteCustomer = (id, balance) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    setTotalBills(totalBills - balance); // Subtract the deleted customer's balance from total bills
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add New Customer Form */}
      <div className="bg-green-400  p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 ">Add New Customer</h2>    
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Balance"
            value={newCustomer.balance}
            onChange={(e) => setNewCustomer({ ...newCustomer, balance: parseFloat(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleAddCustomer}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add Customer
          </button>
        </div>
      </div>

      {/* Total Pending Bills */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Total Pending Bills</h2>
        <p className="text-lg">${totalBills.toFixed(2)}</p>
      </div>

      {/* Customers List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">All Customers ({customers.length}) </h2>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Balance</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4">{customer.name}</td>
                <td className="py-2 px-4">{customer.email}</td>
                <td className="py-2 px-4">${customer.balance.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeleteCustomer(customer.id, customer.balance)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
