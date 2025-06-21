
# 📋 TaskManager Versión 1

**TaskManager** es una aplicación web desarrollada en React con integración de inicio de sesión por Google, carga de archivos Excel, visualización de tareas, asignación de responsables y simulación/envío de correos electrónicos usando EmailJS.

---

## 🚀 Funcionalidades principales

- ✅ Inicio de sesión con Google
- 📂 Carga de tareas, personal y tareas maestras desde archivos Excel (`.xlsx`)
- 📬 Envío de notificaciones por Email (EmailJS)
- 📊 Dashboard con estadísticas (pendientes, completadas, vencidas)
- 👤 Visualización de tareas por responsable
- 📤 Exportación de datos simulada (consola)
- 🔐 Control de sesión con persistencia

---

## 🛠️ Tecnologías utilizadas

- React 18
- TailwindCSS
- Capacitor (para empaquetado móvil)
- EmailJS
- XLSX (sheet processing)
- Google OAuth (con `@react-oauth/google`)

---

## 📦 Instalación local

```bash
git clone https://github.com/MatiVF22/TaskManagerVers1.git
cd TaskManagerVers1
npm install
npm start
```

---

## 🔑 Configuración

### Google OAuth
Debes crear un Client ID desde [Google Cloud Console](https://console.cloud.google.com/apis/credentials) y colocarlo en:

```js
// src/index.js
const clientId = 'TU_CLIENT_ID_AQUI';
```

### EmailJS
Debes configurar tu cuenta en [EmailJS](https://www.emailjs.com/) y completar los valores en:

```js
// src/utils/emailService.js
const serviceID = 'TU_SERVICE_ID';
const templateID = 'TU_TEMPLATE_ID';
const publicKey = 'TU_PUBLIC_KEY';
```

---

## 📥 Estructura esperada del Excel

### Hoja "Personal"

| name         | email                  | area     | ubicacion     | funcion           |
|--------------|------------------------|----------|---------------|--------------------|
| Juan Venegas | juan@example.com       | Finanzas | Oficina Central | Analista de Datos  |

### Hoja "Asignaciones"

| id | task              | description         | responsible           | deadline     |
|----|-------------------|---------------------|------------------------|--------------|
| 1  | Revisión de gastos| Revisar plan de gasto| juan@example.com       | 2025-06-20   |

---

## 📱 Demo móvil (con Capacitor)

```bash
npm run build
npx cap sync android
npx cap open android
```

> Requiere Android Studio para compilar el `.apk`.

---

## 🌐 Versión web

Puedes ver la aplicación desplegada en:

👉 [https://tuusuario.github.io/TaskManagerVers1](https://tuusuario.github.io/TaskManagerVers1) *(en caso de publicar con GitHub Pages)*

---

## 🧪 Estado actual

- [x] Funcional para escritorio
- [x] Integración con Excel y EmailJS
- [x] Interfaz adaptable
- [ ] Optimización para móvil en progreso

---

## 🤝 Créditos

Desarrollado por [@MatiVF22](https://github.com/MatiVF22) – Junio 2025  
Licencia MIT
