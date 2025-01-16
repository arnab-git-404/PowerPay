import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import globalContext from '../context/global/globalContext';
import heroImage from '../assests/homeimg.jpg';

function Home() {
  const gcontext = useContext(globalContext);
  const { isCustomerLoggedIn, isAdminLoggedIn } = gcontext;

  return (
    <div className="text-center py-8 bg-gradient-to-b from-blue-500 via-purple-600 to-red-500
 min-h-screen">
      <div className="relative max-w-7xl mx-auto">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full min-h-20 max-h-80 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            PowerPay
          </h1>
          <p className="text-xl sm:text-2xl text-white drop-shadow-lg">
            Your Trusted Electric Bill Payment System
          </p>
        </div>
      </div>
      <div className="mt-12">
        <p className="text-lg sm:text-xl mb-8 text-black">
          Choose a portal to get started:
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to={isCustomerLoggedIn ? '/customer' : '/customer/login'}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Customer Portal
          </Link>
          <Link
            to= {isAdminLoggedIn ? '/company' : '/company/login'}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Company Portal
          </Link>
          <Link
            to="/paybill"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Pay Bill
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
