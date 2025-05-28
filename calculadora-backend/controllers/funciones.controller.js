const { ejecutarMatlab } = require('../utils/ejecutarMatlab');

const calcularAritmetica = async (req, res) => {
  const { a, b, operacion } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number' || typeof operacion !== 'string') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('aritmetica', [a, b, operacion]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al ejecutar MATLAB:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar función en MATLAB' });
  }
};

const calcularBiseccion = async (req, res) => {
  const { f, a, b, tol, max_iter } = req.body;

  if (
    typeof f !== 'string' ||
    typeof a !== 'number' ||
    typeof b !== 'number' ||
    typeof tol !== 'number' ||
    typeof max_iter !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('biseccion', [f, a, b, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al ejecutar bisección:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar bisección en MATLAB' });
  }
};

const calcularNewton = async (req, res) => {
  const { f, x0, tol, max_iter } = req.body;

  if (
    typeof f !== 'string' ||
    typeof x0 !== 'number' ||
    typeof tol !== 'number' ||
    typeof max_iter !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('newton', [f, x0, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al ejecutar Newton-Raphson:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar Newton en MATLAB' });
  }
};

const calcularSecante = async (req, res) => {
  const { f, x0, x1, tol, max_iter } = req.body;

  if (
    typeof f !== 'string' ||
    typeof x0 !== 'number' ||
    typeof x1 !== 'number' ||
    typeof tol !== 'number' ||
    typeof max_iter !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('secante', [f, x0, x1, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al ejecutar Secante:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar método de la secante en MATLAB' });
  }
};

const calcularSecanteModificada = async (req, res) => {
  const { f, x0, tol, max_iter } = req.body;

  if (
    typeof f !== 'string' ||
    typeof x0 !== 'number' ||
    typeof tol !== 'number' ||
    typeof max_iter !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('secante_modificada', [f, x0, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en secante modificada:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar método secante modificada' });
  }
};

const calcularRaicesMultiples = async (req, res) => {
  const { f, x0, tol, max_iter } = req.body;

  if (
    typeof f !== 'string' ||
    typeof x0 !== 'number' ||
    typeof tol !== 'number' ||
    typeof max_iter !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('raices_multiples', [f, x0, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en raíces múltiples:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar método de raíces múltiples' });
  }
};

const calcularGaussSeidel = async (req, res) => {
  const { A, b, x0, tol, max_iter } = req.body;

  if (!Array.isArray(A) || !Array.isArray(b) || !Array.isArray(x0) ||
      typeof tol !== 'number' || typeof max_iter !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('gauss_seidel', [A, b, x0, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en Gauss-Seidel:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar Gauss-Seidel en MATLAB' });
  }
};

const calcularMuller = async (req, res) => {
  const { f, x0, x1, x2, tol, max_iter } = req.body;

  if (
    typeof f !== 'string' ||
    typeof x0 !== 'number' ||
    typeof x1 !== 'number' ||
    typeof x2 !== 'number' ||
    typeof tol !== 'number' ||
    typeof max_iter !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('muller', [f, x0, x1, x2, tol, max_iter]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en Müller:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar método de Müller en MATLAB' });
  }
};

const calcularTrigonometria = async (req, res) => {
  const { valor, unidad, operacion } = req.body;

  if (
    typeof valor !== 'number' ||
    typeof unidad !== 'string' ||
    typeof operacion !== 'string'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('trigonometria', [valor, unidad, operacion]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en función trigonométrica:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar función trigonométrica' });
  }
};

const calcularPotencia = async (req, res) => {
  const { base, exponente } = req.body;

  if (typeof base !== 'number' || typeof exponente !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('potencia', [base, exponente]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en función potencia:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar función de potencia' });
  }
};

const calcularRaiz = async (req, res) => {
  const { radicando, indice } = req.body;

  if (typeof radicando !== 'number' || typeof indice !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('raiz', [radicando, indice]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en función raíz:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar función de raíz' });
  }
};

const calcularLogaritmo = async (req, res) => {
  const { valor, base } = req.body;

  const baseIsValid = typeof base === 'number' || (typeof base === 'string' && base === 'e');

  if (typeof valor !== 'number' || !baseIsValid) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('logaritmo', [valor, base]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en función logaritmo:', err.message);
    return res.status(500).json({ error: 'Error al ejecutar función logaritmo' });
  }
};

const calcularVolumen = async (req, res) => {
  const { figura, parametros } = req.body;

  if (typeof figura !== 'string' || !Array.isArray(parametros)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('volumen', [figura, ...parametros]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en volumen:', err.message);
    return res.status(500).json({ error: 'Error al calcular volumen' });
  }
};

const calcularArea = async (req, res) => {
  const { figura, parametros } = req.body;

  if (typeof figura !== 'string' || !Array.isArray(parametros)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('area', [figura, ...parametros]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en área:', err.message);
    return res.status(500).json({ error: 'Error al calcular área' });
  }
};

const calcularPerimetro = async (req, res) => {
  const { figura, parametros } = req.body;

  if (typeof figura !== 'string' || !Array.isArray(parametros)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('perimetro', [figura, ...parametros]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en perímetro:', err.message);
    return res.status(500).json({ error: 'Error al calcular perímetro' });
  }
};

const calcularDerivada = async (req, res) => {
  const { f, variable, orden } = req.body;
  
  // Validación más robusta de los parámetros
  if (typeof f !== 'string' || f.trim() === '') {
    return res.status(400).json({ error: 'Debe proporcionar una función válida' });
  }
  
  if (typeof variable !== 'string' || variable.trim() === '') {
    return res.status(400).json({ error: 'Debe proporcionar una variable válida' });
  }
  
  // Asegurarse que el orden es un número, y si no, convertirlo
  const ordenNum = Number(orden);
  
  if (isNaN(ordenNum) || !Number.isInteger(ordenNum) || ordenNum < 1) {
    return res.status(400).json({ error: 'El orden debe ser un entero positivo' });
  }
    try {
    // Enviar ordenNum asegurando que es un número
    const resultado = await ejecutarMatlab('derivada', [f, variable, ordenNum]);
    res.json({ resultado });
  } catch (err) {
    console.error('Error al calcular la derivada:', err);
    res.status(500).json({ error: 'Error al calcular la derivada' });
  }
};

const calcularLimite = async (req, res) => {
  const { f, variable, punto, direccion } = req.body;
  
  // Validación más robusta de los parámetros
  if (typeof f !== 'string' || f.trim() === '') {
    return res.status(400).json({ error: 'Debe proporcionar una función válida' });
  }
  
  if (typeof variable !== 'string' || variable.trim() === '') {
    return res.status(400).json({ error: 'Debe proporcionar una variable válida' });
  }
  
  // Asegurarse que el punto es un número, y si no, convertirlo
  const puntoNum = Number(punto);
  
  if (isNaN(puntoNum)) {
    return res.status(400).json({ error: 'El punto debe ser un número válido' });
  }
  
  if (typeof direccion !== 'string' || !['left', 'right', 'both'].includes(direccion)) {
    return res.status(400).json({ error: 'La dirección debe ser "left", "right" o "both"' });
  }
  try {
    // Enviar puntoNum asegurando que es un número
    const resultado = await ejecutarMatlab('limite', [f, variable, puntoNum, direccion]);
    res.json({ resultado });
  } catch (err) {
    console.error('Error al calcular el límite:', err);
    res.status(500).json({ error: 'Error al calcular el límite' });
  }
};

const calcularIntegralGeneral = async (req, res) => {
  const { f, variable, tipo, a, b } = req.body;

  // Validaciones básicas
  if (
    typeof f !== 'string' ||
    typeof variable !== 'string' ||
    typeof tipo !== 'string' ||
    !['indefinida', 'integral', 'area', 'volumen'].includes(tipo)
  ) {
    return res.status(400).json({
      error: 'Parámetros inválidos. Debe proporcionar una función (string), variable (string) y tipo válido.'
    });
  }

  // Si es integral definida, área o volumen, necesitamos límites
  if (tipo !== 'indefinida' && (typeof a !== 'number' || typeof b !== 'number')) {
    return res.status(400).json({
      error: 'Para integrales definidas, área o volumen, debe proporcionar límites a y b como números.'
    });
  }

  try {
    let params = [];
    if (tipo === 'indefinida') {
      params = [funcion, variable, 0, 0, tipo]; // Los límites son ignorados para indefinidas
    } else {
      params = [funcion, variable, a, b, tipo];
    }
    
    const resultado = await ejecutarMatlab('integral_general', params);
    res.json({ resultado });
  } catch (err){
    console.error('Error al calcular la integral:', err);
    res.status(500).json({ error: 'Error al calcular la integral' });
  }
};

const calcularGrafica = async (req, res) => {
  const { f, variable, a, b } = req.body;

  if (
    typeof f !== 'string' ||
    typeof variable !== 'string' ||
    typeof a !== 'number' ||
    typeof b !== 'number'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const nombreArchivo = `grafica_${Date.now()}`;

  try {
    const resultado = await ejecutarMatlab('graficar', [f, variable, a, b, nombreArchivo]);
    return res.json({
      mensaje: 'Gráfica generada correctamente',
      archivo: `${nombreArchivo}.png`
    });
  } catch (err) {
    console.error('❌ Error al graficar:', err.message);
    return res.status(500).json({ error: 'Error al generar gráfica' });
  }
};

const calcularGaussSimple = async (req, res) => {
  const { A, b } = req.body;

  if (!Array.isArray(A) || !Array.isArray(b)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('gauss_simple', [A, b]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en Gauss simple:', err.message);
    return res.status(500).json({ error: 'Error al resolver sistema con Gauss simple' });
  }
};

const calcularGaussJordan = async (req, res) => {
  const { A, b } = req.body;

  if (!Array.isArray(A) || !Array.isArray(b)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('gauss_jordan', [A, b]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en Gauss-Jordan:', err.message);
    return res.status(500).json({ error: 'Error al resolver sistema con Gauss-Jordan' });
  }
};

const calcularInversa = async (req, res) => {
  const { A, b } = req.body;

  if (!Array.isArray(A) || !Array.isArray(b)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('inversa', [A, b]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en método de la inversa:', err.message);
    return res.status(500).json({ error: 'Error al resolver con matriz inversa' });
  }
};

const calcularCramer = async (req, res) => {
  const { A, b } = req.body;

  if (!Array.isArray(A) || !Array.isArray(b)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('cramer', [A, b]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en Cramer:', err.message);
    return res.status(500).json({ error: 'Error al resolver con regla de Cramer' });
  }
};

const resolverEcuacion = async (req, res) => {
  const { ecuacion, variable } = req.body;

  if (typeof ecuacion !== 'string' || typeof variable !== 'string') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('resolver_ecuacion', [ecuacion, variable]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al resolver ecuación:', err.message);
    return res.status(500).json({ error: 'Error al resolver ecuación en MATLAB' });
  }
};

const resolverInecuacion = async (req, res) => {
  const { inecuacion, variable } = req.body;

  if (typeof inecuacion !== 'string' || typeof variable !== 'string') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('resolver_inecuacion', [inecuacion, variable]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al resolver inecuación:', err.message);
    return res.status(500).json({ error: 'Error al resolver inecuación en MATLAB' });
  }
};


const calcularMRUA = async (req, res) => {
  const { x0, v0, a, t, v, x, buscar } = req.body;

  // Validación básica
  if (typeof buscar !== 'string') {
    return res.status(400).json({ error: 'Parámetro "buscar" inválido' });
  }

  try {
    const args = [
      x0 ?? [], 
      v0 ?? [], 
      a ?? [], 
      t ?? [], 
      v ?? [], 
      buscar
    ];

    const resultado = await ejecutarMatlab('mrua', args);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en MRUA:', err.message);
    return res.status(500).json({ error: 'Error al calcular MRUA en MATLAB' });
  }
};

const calcularCaidaLibre = async (req, res) => {
  const { v0, t, g, h, buscar } = req.body;

  const safe = (val) => typeof val === 'number' ? val : NaN;

  if (!['h', 'v', 't', 'g'].includes(buscar)) {
    return res.status(400).json({ error: 'Parámetro "buscar" inválido' });
  }

  try {
    const resultado = await ejecutarMatlab('caida_libre', [
      safe(v0),
      safe(t),
      safe(g),
      safe(h),
      buscar
    ]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al resolver caída libre en MATLAB:', err.message);
    return res.status(500).json({ error: 'Error al resolver caída libre en MATLAB' });
  }
};

const calcularProyectil = async (req, res) => {
  const { v0, angulo, g, buscar } = req.body;

  if (
    typeof v0 !== 'number' ||
    typeof angulo !== 'number' ||
    typeof g !== 'number' ||
    typeof buscar !== 'string'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const resultado = await ejecutarMatlab('proyectil', [v0, angulo, g, buscar]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al resolver proyectil:', err.message);
    return res.status(500).json({ error: 'Error al resolver proyectil en MATLAB' });
  }
};

const calcularSegundaLey = async (req, res) => {
  const { F, m, a, buscar } = req.body;

  const safe = (val) => typeof val === 'number' ? val : NaN;

  if (!['F', 'm', 'a'].includes(buscar)) {
    return res.status(400).json({ error: 'Parámetro "buscar" inválido' });
  }

  try {
    const resultado = await ejecutarMatlab('newton2', [
      safe(F),
      safe(m),
      safe(a),
      buscar
    ]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error en Segunda Ley de Newton:', err.message);
    return res.status(500).json({ error: 'Error al resolver Segunda Ley de Newton en MATLAB' });
  }
};

const calcularTerceraLey = async (req, res) => {
  const { f_accion, buscar } = req.body;

  if (!['reaccion', 'accion'].includes(buscar)) {
    return res.status(400).json({ error: 'Parámetro "buscar" inválido' });
  }

  try {
    const valor = typeof f_accion === 'number' ? f_accion : NaN;
    const resultado = await ejecutarMatlab('tercera_ley', [valor, buscar]);
    return res.json({ resultado });
  } catch (err) {
    console.error('❌ Error al resolver tercera ley:', err.message);
    return res.status(500).json({ error: 'Error al resolver tercera ley en MATLAB' });
  }
};


module.exports = {
  calcularAritmetica,
  calcularBiseccion,
  calcularNewton,
  calcularSecante,
  calcularSecanteModificada,
  calcularRaicesMultiples,
  calcularGaussSeidel,
  calcularMuller,
  calcularTrigonometria,
  calcularPotencia,
  calcularRaiz,
  calcularLogaritmo,
  calcularVolumen,
  calcularArea,
  calcularPerimetro,
  calcularDerivada,
  calcularLimite,
  calcularIntegralGeneral,
  calcularGrafica,
  calcularGaussSimple,
  calcularGaussJordan,
  calcularInversa,
  calcularCramer,
  resolverEcuacion,
  resolverInecuacion,
  calcularMRUA,
  calcularCaidaLibre,
  calcularProyectil,
  calcularSegundaLey,
  calcularTerceraLey
};



