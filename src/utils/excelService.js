import React from 'react';

const ExcelService = ({ onExport }) => {
  const handleExport = () => {
    onExport();
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-5 15h10V5H5v10zM6 6h8v8H6V6z"/>
      </svg>
      <span>Exportar a Excel</span>
    </button>
  );
};

export default ExcelService;