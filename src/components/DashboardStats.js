import React from 'react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm">Tareas Pendientes</h3>
        <p className="text-2xl font-bold">{stats.pending}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm">Tareas Completadas</h3>
        <p className="text-2xl font-bold">{stats.completed}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm">Tareas Vencidas</h3>
        <p className="text-2xl font-bold">{stats.overdue}</p>
      </div>
    </div>
  );
};

export default DashboardStats;