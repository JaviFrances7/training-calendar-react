# Training Calendar React

Aplicación web desarrollada con React para gestionar calendarios semanales de entrenadores personales.

## 📖 Descripción

Este proyecto nace a partir de una necesidad real. Un amigo entrenador personal gestionaba todas sus sesiones mediante WhatsApp, notas y capturas de pantalla, lo que dificultaba la organización de clientes y horarios.

Para solucionar este problema desarrollé una aplicación que permite organizar de forma visual los entrenamientos semanales, gestionar clientes y exportar el calendario a PDF.

Esta es la evolución de una primera versión desarrollada con JavaScript Vanilla, reconstruida completamente en React para mejorar la escalabilidad, la organización del código y la experiencia de usuario.

---

## ✨ Funcionalidades

### Gestión de clientes

- Añadir clientes.
- Eliminar clientes.
- Borrar todos los clientes de un entrenador.
- Clientes independientes por entrenador.

### Gestión del calendario

- Asignar clientes a franjas horarias.
- Eliminar clientes de una sesión.
- Máximo de clientes por sesión.
- Calendario independiente para cada entrenador.
- Borrado completo del calendario.
- Bloqueo de franjas horarias mediante clic derecho.
- Desbloqueo de franjas horarias.

### Persistencia de datos

- Guardado automático mediante Local Storage.
- Recuperación automática al recargar la página.
- Persistencia de:
  - Clientes.
  - Calendarios.
  - Horarios bloqueados.
  - Semana seleccionada.

### Exportación PDF

- Exportación del calendario completo.
- Inclusión de logo personalizado.
- Nombre del entrenador.
- Semana seleccionada.
- Horarios bloqueados resaltados en rojo.
- Diseño optimizado para impresión.

### Interfaz

- Diseño responsive.
- Tema oscuro moderno.
- Optimizado para portátiles y escritorio.
- Componentes reutilizables.

---

## 🛠️ Tecnologías utilizadas

- React
- JavaScript
- Tailwind CSS
- jsPDF
- jspdf-autotable
- Local Storage

---

## 🎯 Objetivos del proyecto

Durante este proyecto he trabajado especialmente:

- Componentización en React.
- Gestión de estado con Hooks.
- Manipulación de arrays y objetos.
- Persistencia de datos.
- Exportación de documentos PDF.
- Diseño responsive.
- Experiencia de usuario.
- Resolución de problemas reales mediante software.

---

## 🚀 Posibles mejoras futuras

### V3

- Backend con Node.js.
- Base de datos.
- Sistema de usuarios.
- Autenticación.

### V4

- Integración con Google Calendar.
- Reservas automáticas por parte de los clientes.
- Gestión online de sesiones.
- Notificaciones automáticas.

---

## 🌐 Demo

https://gym-scheduler-rt.netlify.app/

---

## 📂 Repositorio

Este proyecto forma parte de mi proceso de aprendizaje en desarrollo web Full Stack y está enfocado en la creación de herramientas útiles para resolver problemas reales.

---

## 👨‍💻 Autor

Javier Francés

LinkedIn:
https://www.linkedin.com/in/javier-frances

GitHub:
https://github.com/JaviFrances7
