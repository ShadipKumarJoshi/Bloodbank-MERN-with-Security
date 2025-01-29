import React from 'react';

const DashboardCard = ({ icon, count, label }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md p-6 rounded-lg">
      <div className="text-4xl text-gray-700">{icon}</div>
      <div className="text-3xl text-gray-900 font-bold mt-4">{count}</div>
      <div className="text-xl text-gray-600">{label}</div>
    </div>
  );
};

export default DashboardCard;
