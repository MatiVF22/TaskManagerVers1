import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_wne9jec'; // Reemplaza con tu verdadero Service ID gmail o  Outlook otro servicio de EmailJS
const TEMPLATE_ID = 'template_mgunxfp';   
const USER_ID = 'dZUvFlLCINkEYWp8U';

export const sendAssignmentEmail = async (assignment, staffMember) => {
  const templateParams = {
    to_name: staffMember.name,
    to_email: staffMember.email,
    task: assignment.task,
    description: assignment.description,
    deadline: assignment.deadline,
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
    console.log('Correo enviado:', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return false;
  }
 };