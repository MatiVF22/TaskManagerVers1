import React, { useState, useEffect } from 'react';

import { sendAssignmentEmail } from './utils/emailService';
import { getLocalStorage, setLocalStorage, useExcelData } from './utils/storage';
import TaskAssignmentForm from './components/TaskAssignmentForm';
import TaskList from './components/TaskList';
import DashboardStats from './components/DashboardStats';
import GoogleLoginButton from './components/GoogleLoginButton';
import ExcelService from './utils/excelService';
import ExcelUpload from './components/ExcelUpload';
import PersonnelList from './components/PersonnelList';
import EmailHistory from './components/EmailHistory';
import TaskForm from './components/TaskForm';
import DashboardCharts from './components/DashboardCharts';
import PersonnelTasks from './components/PersonnelTasks';

const App = () => {
  // Inicializamos con arrays vacíos, esperando la carga del Excel
  const { data: assignments, addRow: addAssignment, setData: setAssignments } = useExcelData('assignments', []);
  const { data: personal, addRow: addPersonal, setData: setPersonal } = useExcelData('personal', []);
  const { data: masterTasks, addRow: addMasterTask, setData: setMasterTasks } = useExcelData('masterTasks', []);
  const { data: emailLogs, addRow: addEmailLog, setData: setEmailLogs } = useExcelData('emailLogs', []);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      setUser({
        name: 'Admin Google',
        email: 'admin.google@empresa.com',
        isAdmin: true,
        token: token
      });
    }
  }, []);

  useEffect(() => {
    setLocalStorage('assignments', assignments);
  }, [assignments]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('googleToken');
    setUser(null);
  };

  const handleAddStaff = (newPerson) => {
    if (!personal.some(p => p.email === newPerson.email)) {
      addPersonal(newPerson);
      alert(`Nuevo responsable "${newPerson.name}" agregado.`);
    } else {
      alert(`El responsable con correo "${newPerson.email}" ya existe.`);
    }
  };

  const handleAddTask = (newTask) => {
    if (!masterTasks.some(t => t.name === newTask.name)) {
      addMasterTask(newTask);
      alert(`Nueva tarea "${newTask.name}" agregada a la lista maestra.`);
    } else {
      alert(`La tarea "${newTask.name}" ya existe en la lista maestra.`);
    }
  };

  const handleAssignTask = async (newAssignment) => {
    try {
      const staffMember = personal.find(p => p.email === newAssignment.responsible);
      
      const emailSent = await sendAssignmentEmail(newAssignment, staffMember);
      
      const logEntry = {
        assignmentId: newAssignment.id,
        subject: `Nueva tarea asignada: ${newAssignment.task}`,
        recipientEmail: staffMember ? staffMember.email : 'Correo no encontrado',
        sentAt: new Date().toISOString(),
        status: emailSent ? 'Enviado' : 'Error'
      };
      addEmailLog(logEntry);

      if (emailSent) {
        addAssignment({ ...newAssignment, status: 'pending' });
        console.log('Enviando correo real a:', staffMember.email);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error assigning task:', error);
      const logEntry = {
        assignmentId: newAssignment.id,
        subject: `Nueva tarea asignada: ${newAssignment.task}`,
        recipientEmail: newAssignment.responsible,
        sentAt: new Date().toISOString(),
        status: 'Error'
      };
      addEmailLog(logEntry);
      return false;
    }
  };

  const handleExportAssignments = () => {
    const dataToExport = assignments.map(assignment => ({
      ID: assignment.id,
      Tarea: assignment.task,
      Descripcion: assignment.description,
      Responsable: assignment.responsible,
      'Fecha Límite': assignment.deadline,
      Estado: assignment.status,
      'Fecha Creación': assignment.createdAt || new Date().toISOString().split('T')[0]
    }));
    console.log('Datos para exportar a Excel (Asignaciones):', dataToExport);

    const personalToExport = personal.map(person => ({
      Área: person.area,
      Ubicación: person.ubicacion,
      Nombre: person.name,
      Correo: person.email,
      Función: person.funcion
    }));
    console.log('Datos para exportar a Excel (Personal):', personalToExport);

    const emailLogsToExport = emailLogs.map(log => ({
      'ID Tarea': log.assignmentId,
      Asunto: log.subject,
      Destinatario: log.recipientEmail,
      'Fecha Envío': log.sentAt,
      Estado: log.status
    }));
    console.log('Datos para exportar a Excel (Historial de Correos):', emailLogsToExport);

    const masterTasksToExport = masterTasks.map(task => ({
      ID: task.id,
      Nombre: task.name,
      Categoría: task.category
    }));
    console.log('Datos para exportar a Excel (Tareas Maestras):', masterTasksToExport);

    alert('Simulando exportación a Excel. Revisa la consola para ver los datos de Asignaciones, Personal, Historial de Correos y Tareas Maestras.');
  };

  const handleExcelFileUpload = (sheetsData) => {
    // Asumiendo que las hojas del Excel se llaman 'Asignaciones', 'Personal', 'Tareas'
    if (sheetsData.Asignaciones) {
      setAssignments(sheetsData.Asignaciones);
      alert('Datos de Asignaciones cargados desde Excel.');
    }
    if (sheetsData.Personal) {
      setPersonal(sheetsData.Personal);
      alert('Datos de Personal cargados desde Excel.');
    }
    if (sheetsData.Tareas) { // Asumiendo que la hoja de tareas maestras se llama 'Tareas'
      setMasterTasks(sheetsData.Tareas);
      alert('Datos de Tareas Maestras cargados desde Excel.');
    }
    // Puedes añadir lógica para otras hojas como Historial o Errores si las necesitas cargar
  };

  const stats = {
    pending: assignments.filter(a => a.status === 'pending').length,
    completed: assignments.filter(a => a.status === 'completed').length,
    overdue: assignments.filter(a => 
      new Date(a.deadline) < new Date() && a.status !== 'completed'
    ).length
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
          <GoogleLoginButton onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">TaskMaster</h1>
          <p className="text-gray-600">Gestión de tareas integrada con Outlook</p>
        </div>
        {user && (
          <div className="text-right flex items-center space-x-4">
            <p className="text-gray-700">Bienvenido, {user.name}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>

      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'assign' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('assign')}
        >
          Asignar Tarea
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'tasks' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Lista de Tareas
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'export' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('export')}
        >
          Exportar
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('upload')}
        >
          Cargar Excel
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'personnel' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('personnel')}
        >
          Ver Personal
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'emailHistory' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('emailHistory')}
        >
          Historial Correos
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'addTask' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addTask')}
        >
          Agregar Tarea
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'personnelTasks' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('personnelTasks')}
        >
          Tareas por Personal
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div>
          <DashboardStats stats={stats} />
          <DashboardCharts assignments={assignments} />
          <TaskList tasks={assignments.slice(0, 5)} />
        </div>
      )}

      {activeTab === 'assign' && (
        <div className="max-w-2xl mx-auto">
          <TaskAssignmentForm 
            tasks={masterTasks} 
            staff={personal} 
            onAssign={handleAssignTask} 
            onAddStaff={handleAddStaff}
          />
        </div>
      )}

      {activeTab === 'tasks' && (
        <div>
          <TaskList tasks={assignments} />
        </div>
      )}

      {activeTab === 'export' && (
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">Exportar Datos</h2>
          <ExcelService onExport={handleExportAssignments} />
          <p className="mt-4 text-gray-600">
            Al hacer clic en "Exportar a Excel", los datos de las asignaciones y personal se simularán en la consola.
            En una aplicación real, esto generaría un archivo .xlsx.
          </p>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="max-w-2xl mx-auto">
          <ExcelUpload onFileUpload={handleExcelFileUpload} />
        </div>
      )}

      {activeTab === 'personnel' && (
        <div className="max-w-4xl mx-auto">
          <PersonnelList staff={personal} />
        </div>
      )}

      {activeTab === 'emailHistory' && (
        <div className="max-w-4xl mx-auto">
          <EmailHistory emails={emailLogs} />
        </div>
      )}

      {activeTab === 'addTask' && (
        <div className="max-w-2xl mx-auto">
          <TaskForm onAddTask={handleAddTask} />
        </div>
      )}

      {activeTab === 'personnelTasks' && (
        <div className="max-w-4xl mx-auto">
          <PersonnelTasks staff={personal} assignments={assignments} />
        </div>
      )}
    </div>
  );
};

export default App;
// DONE