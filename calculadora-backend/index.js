const express = require('express');
const cors = require('cors');
const path = require('path');
const funcionesRoutes = require('./routes/funciones.routes');


const app = express();
const PORT = 3500;

app.use(cors());

app.use(express.json());
app.use('/api', funcionesRoutes);
// Configurar carpeta para archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'matlab', 'graficas')));

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
