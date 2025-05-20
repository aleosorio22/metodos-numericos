const express = require('express');
const funcionesRoutes = require('./routes/funciones.routes');

const app = express();
const PORT = 3500;

app.use(express.json());
app.use('/api', funcionesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
