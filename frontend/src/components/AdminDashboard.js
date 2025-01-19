import React, { useState } from "react";
import Modal from "react-modal";
import { BsPersonCircle } from "react-icons/bs";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

Modal.setAppElement("#root"); // Required for accessibility

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      ac_no: 7985,
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St, NY",
      dueBalance: 100.0,
      dueDate: "2023-04-15",
    },
    {
      id: 2,
      ac_no: 7986,
      name: "Jane Smith",
      email: "jane@example.com",
      address: "456 Oak St, LA",
      dueBalance: 50.0,
      dueDate: "2023-05-20",
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [totalBills, setTotalBills] = useState(150.0);

  // Open modal and set user data
  const handleModifyUser = (customer) => {
    setEditingCustomer(customer);
    setModalIsOpen(true);
  };

  // Update user data
  const handleSaveChanges = () => {
    setCustomers(
      customers.map((cust) =>
        cust.id === editingCustomer.id ? editingCustomer : cust
      )
    );
    setModalIsOpen(false);
  };

  const handleDeleteCustomer = (id, balance) => {
      setCustomers(customers.filter((customer) => customer.id !== id));
      setTotalBills(totalBills - balance);
      console.log("sjdgsdkngsn");
  };

  return (
    <div className="container mx-auto p-6">

    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">

        <h2 className="flex items-center text-xl font-semibold mb-4 gap-2">
          
          <RiMoneyRupeeCircleFill className="text-2xl" />
          Total Pending Bills
        </h2>
        <p className="text-lg">${totalBills.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">


        <h2 className="flex items-center text-xl font-semibold mb-4 gap-2">
          <BsPersonCircle className="text-2xl" />
          All Customers ({customers.length})
        </h2>


        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Account No</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Due Balance</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4">{customer.ac_no}</td>
                <td className="py-2 px-4">{customer.name}</td>
                <td className="py-2 px-4">${customer.dueBalance.toFixed(2)}</td>
                <td className="py-2 px-4">{customer.dueDate}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleModifyUser(customer)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg mx-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteCustomer(customer.id, customer.dueBalance)}
                    className="bg-red-600 text-white px-4 py-1 rounded-lg mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Edit User Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        {editingCustomer && (
          <div>
            <p>Name</p>
            <input
              type="text"
              value={editingCustomer.name}
              onChange={(e) =>
                setEditingCustomer({ ...editingCustomer, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Name"
            />

              <p>Account Number</p>
            <input
              type="text"
              value={editingCustomer.ac_no}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  ac_no: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Account Number"
            />

            <p>Address</p>
            <input
              type="text"
              value={editingCustomer.address}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Address"
            />
            <p>Due Balance</p>
            <input
              type="number"
              value={editingCustomer.dueBalance}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  dueBalance: parseFloat(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Due Balance"
            />
            
            <p>Due Date</p>
            <input
              type="date"
              value={editingCustomer.dueDate}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  dueDate: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
