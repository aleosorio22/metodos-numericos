# Calculadora de Métodos Numéricos

Aplicación web que integra una calculadora avanzada para métodos numéricos, funciones analíticas y problemas de física, utilizando MATLAB como motor de cálculo.

## 📋 Características

- 🧮 **Matemáticas Numéricas**
  - Aritmética básica
  - Resolución de ecuaciones y raíces
  - Álgebra lineal

- 📐 **Funciones Analíticas**
  - Trigonometría
  - Potencias y raíces
  - Logaritmos

- 📏 **Geometría**
  - Cálculos de volumen
  - Cálculos de área
  - Cálculos de perímetro

- 🧠 **Cálculo**
  - Derivadas
  - Límites
  - Integrales

- 📈 **Visualización**
  - Graficación de funciones matemáticas

- 🔬 **Física**
  - MRUA (Movimiento Rectilíneo Uniformemente Acelerado)
  - Caída libre
  - Movimiento de proyectiles
  - Leyes de Newton

## 🛠️ Requisitos Previos

- Node.js >= 14.x
- MATLAB instalado y configurado en el PATH del sistema
- npm o yarn como gestor de paquetes

## ⚙️ Instalación

### Backend

1. Navegar al directorio del backend:
   ```bash
   cd calculadora-backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Verificar que MATLAB esté accesible:
   ```bash
   matlab -batch "disp('MATLAB está funcionando')"
   ```

4. Iniciar el servidor (modo desarrollo):
   ```bash
   npm run dev
   ```

El servidor backend se ejecutará en http://localhost:3500

### Frontend

1. Navegar al directorio del frontend:
   ```bash
   cd calculadora-frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear archivo .env con la configuración:
   ```
   VITE_API_URL=http://localhost:3500/api
   ```

4. Iniciar la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

La aplicación frontend estará disponible en http://localhost:5173

## 🔧 Estructura del Proyecto

### Backend

```
calculadora-backend/
├── index.js              # Punto de entrada del servidor
├── controllers/          # Controladores de la API
├── routes/              # Rutas de la API
├── utils/               # Utilidades (integración con MATLAB)
└── matlab/              # Scripts de MATLAB
    ├── ejecutar.m       # Script principal
    └── funciones/       # Funciones MATLAB individuales
```

### Frontend

```
calculadora-frontend/
├── src/
│   ├── components/      # Componentes React reutilizables
│   ├── pages/          # Páginas/Rutas principales
│   │   ├── matematicas/# Calculadoras matemáticas
│   │   ├── fisica/     # Calculadoras de física
│   │   └── ...
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Punto de entrada
└── public/             # Archivos estáticos
```

## 🔄 Integración con MATLAB

La aplicación utiliza MATLAB como motor de cálculo a través de la línea de comandos. El proceso es el siguiente:

1. El frontend envía una petición al backend con los parámetros necesarios
2. El backend utiliza `ejecutarMatlab.js` para invocar MATLAB
3. Los scripts de MATLAB procesan los datos y devuelven resultados
4. El backend formatea y envía los resultados al frontend
5. El frontend muestra los resultados y/o gráficas generadas

### Ejemplo de integración

```javascript
// Backend: ejecutarMatlab.js
const resultado = await ejecutarMatlab('nombre_funcion', [param1, param2]);

// MATLAB: nombre_funcion.m
function resultado = nombre_funcion(param1, param2)
    % Procesamiento...
    resultado = ...;
end
```

## 📦 Dependencias Principales

### Backend
- Express.js: Framework web
- CORS: Middleware para habilitar CORS

### Frontend
- React: Biblioteca UI
- React Router: Enrutamiento
- Better-React-MathJax: Renderizado de fórmulas matemáticas
- Tailwind CSS: Framework CSS
- Axios: Cliente HTTP

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request
