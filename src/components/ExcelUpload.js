import React, { useState } from 'react';
import { readExcelFile } from '../utils/excelReader';

const ExcelUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setMessage('Cargando y procesando archivo...');
      try {
        const data = await readExcelFile(selectedFile);
        onFileUpload(data); // Pasa los datos procesados a App.js
        setMessage(`Archivo "${selectedFile.name}" cargado y procesado con éxito.`);
        setSelectedFile(null); // Limpiar el input
      } catch (error) {
        setMessage(`Error al procesar el archivo: ${error.message}`);
        console.error('Error al procesar Excel:', error);
      }
    } else {
      setMessage('Por favor, selecciona un archivo Excel primero.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cargar Archivo Excel</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={!selectedFile}
      >
        Subir Excel
      </button>
      {message && (
        <p className={`mt-3 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
      <p className="mt-4 text-gray-600 text-sm">
        Carga tu archivo Excel para actualizar los datos de la aplicación.
        Asegúrate de que las hojas tengan los nombres correctos (Asignaciones, Personal, Tareas, etc.).
      </p>
    </div>
  );
};

export default ExcelUpload;