import React from 'react';

const StatCard = ({ icon, title, count, color }) => {
  return (
    <div className={`bg-white shadow-md p-6 rounded-lg text-${color}-600`}>
      <div className="flex items-center justify-between">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
