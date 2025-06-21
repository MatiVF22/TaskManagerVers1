import React from 'react';

const DashboardCharts = ({ assignments }) => {
  // Datos para el gráfico de pastel (ej. estado de tareas)
  const pending = assignments.filter(a => a.status === 'pending').length;
  const completed = assignments.filter(a => a.status === 'completed').length;
  const inProgress = assignments.filter(a => a.status === 'in-progress').length;
  const total = assignments.length;

  const data = [
    { label: 'Pendientes', value: pending, color: '#facc15' }, // yellow-500
    { label: 'Completadas', value: completed, color: '#22c55e' }, // green-500
    { label: 'En Progreso', value: inProgress, color: '#3b82f6' }, // blue-500
  ];

  // Función para dibujar un círculo de progreso (simulado)
  const PieChart = ({ data, total }) => {
    let cumulativeAngle = 0;
    return (
      <svg width="150" height="150" viewBox="0 0 100 100" className="mx-auto">
        {data.map((slice, index) => {
          const angle = (slice.value / total) * 360;
          const largeArcFlag = angle > 180 ? 1 : 0;
          const radius = 40;
          const centerX = 50;
          const centerY = 50;

          const startX = centerX + radius * Math.cos(Math.PI * (cumulativeAngle - 90) / 180);
          const startY = centerY + radius * Math.sin(Math.PI * (cumulativeAngle - 90) / 180);

          cumulativeAngle += angle;

          const endX = centerX + radius * Math.cos(Math.PI * (cumulativeAngle - 90) / 180);
          const endY = centerY + radius * Math.sin(Math.PI * (cumulativeAngle - 90) / 180);

          const d = [
            `M ${centerX},${centerY}`,
            `L ${startX},${startY}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
            'Z'
          ].join(' ');

          return (
            <path key={index} d={d} fill={slice.color} />
          );
        })}
        <circle cx="50" cy="50" r="25" fill="white" /> {/* Centro blanco */}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold" fill="#333">
          {total}
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Estado de Tareas</h2>
      {total > 0 ? (
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="mb-4 md:mb-0">
            <PieChart data={data} total={total} />
          </div>
          <div className="flex flex-col space-y-2">
            {data.map((slice, index) => (
              <div key={index} className="flex items-center">
                <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: slice.color }}></span>
                <span>{slice.label}: {slice.value} ({((slice.value / total) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No hay tareas para mostrar gráficos.</p>
      )}
    </div>
  );
};

export default DashboardCharts;