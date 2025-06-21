import React, { useState } from 'react';

const TaskAssignmentForm = ({ tasks, staff, onAssign, onAddStaff }) => {
  const [formData, setFormData] = useState({
    task: '',
    description: '',
    responsible: '',
    deadline: ''
  });
  const [showNewStaffInput, setShowNewStaffInput] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'responsible' && value === 'addNew') {
      setShowNewStaffInput(true);
    } else if (name === 'responsible') {
      setShowNewStaffInput(false);
    }
  };

  const handleNewStaffChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newStaffName') {
      setNewStaffName(value);
    } else if (name === 'newStaffEmail') {
      setNewStaffEmail(value);
    }
  };

  const handleAddStaff = () => {
    if (newStaffName && newStaffEmail) {
      const newPerson = {
        area: 'Desconocida', // Valor por defecto
        ubicacion: 'Desconocida', // Valor por defecto
        name: newStaffName,
        email: newStaffEmail,
        funcion: 'Desconocida' // Valor por defecto
      };
      onAddStaff(newPerson);
      setFormData(prev => ({ ...prev, responsible: newStaffEmail }));
      setShowNewStaffInput(false);
      setNewStaffName('');
      setNewStaffEmail('');
    } else {
      alert('Por favor, ingresa el nombre y correo del nuevo responsable.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({
      ...formData,
      id: Date.now().toString()
    });
    setFormData({
      task: '',
      description: '',
      responsible: '',
      deadline: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tarea</label>
        <select
          name="task"
          value={formData.task}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecciona una tarea</option>
          {tasks.map(task => (
            <option key={task.id} value={task.name}>{task.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows="3"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Responsable</label>
        <select
          name="responsible"
          value={formData.responsible}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecciona o agrega un responsable</option>
          {staff.map(person => (
            <option key={person.email} value={person.email}>{person.name} ({person.email})</option>
          ))}
          <option value="addNew">-- Agregar nuevo responsable --</option>
        </select>
      </div>

      {showNewStaffInput && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-md font-semibold mb-2">Nuevo Responsable</h3>
          <input
            type="text"
            name="newStaffName"
            placeholder="Nombre del responsable"
            value={newStaffName}
            onChange={handleNewStaffChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="email"
            name="newStaffEmail"
            placeholder="Correo del responsable"
            value={newStaffEmail}
            onChange={handleNewStaffChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <button
            type="button"
            onClick={handleAddStaff}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors text-sm"
          >
            Agregar a la lista
          </button>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha límite</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        
      >
        Asignar y Notificar
      </button>
    </form>
  );
};

export default TaskAssignmentForm;