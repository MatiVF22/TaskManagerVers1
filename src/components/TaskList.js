import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Asignaciones Recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Tarea</th>
              <th className="text-left p-2">Responsable</th>
              <th className="text-left p-2">Fecha Límite</th>
              <th className="text-left p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{task.task}</td>
                <td className="p-2">{task.responsible}</td>
                <td className="p-2">{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status === 'completed' ? 'Completada' : 
                     task.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;