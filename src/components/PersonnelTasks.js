import React from 'react';

const PersonnelTasks = ({ staff, assignments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tareas Asignadas por Personal</h2>
      {staff.length === 0 ? (
        <p className="text-gray-500">No hay personal registrado.</p>
      ) : (
        <div className="space-y-6">
          {staff.map(person => {
            const personAssignments = assignments.filter(
              assignment => assignment.responsible === person.email
            );
            return (
              <div key={person.email} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-blue-700 mb-2">{person.name} ({person.email})</h3>
                <p className="text-gray-600 text-sm mb-3">Área: {person.area} | Función: {person.funcion}</p>
                {personAssignments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tiene tareas asignadas.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-2">
                    {personAssignments.map(assignment => (
                      <li key={assignment.id} className="text-gray-700 text-sm">
                        <strong>{assignment.task}</strong>: {assignment.description} (Fecha límite: {new Date(assignment.deadline).toLocaleDateString()}) - Estado: 
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          assignment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {assignment.status === 'completed' ? 'Completada' : 
                           assignment.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PersonnelTasks;