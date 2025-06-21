import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskCategory, setTaskCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && taskCategory) {
      onAddTask({
        id: Date.now().toString(), // Generar un ID único
        name: taskName,
        category: taskCategory
      });
      setTaskName('');
      setTaskCategory('');
    } else {
      alert('Por favor, ingresa el nombre y la categoría de la tarea.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Agregar Nueva Tarea Maestra</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-gray-700 mb-2">Nombre de la Tarea</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ej. Revisar informe mensual"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskCategory" className="block text-gray-700 mb-2">Categoría</label>
          <input
            type="text"
            id="taskCategory"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ej. Administración, Desarrollo, Marketing"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
};

export default TaskForm;