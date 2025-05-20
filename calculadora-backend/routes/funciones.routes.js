const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/funciones.controller');

router.post('/aritmetica', calcularAritmetica);
router.post('/biseccion', calcularBiseccion);
router.post('/newton', calcularNewton);
router.post('/secante', calcularSecante);
router.post('/secante-modificada', calcularSecanteModificada);
router.post('/raices-multiples', calcularRaicesMultiples);
router.post('/gauss-seidel', calcularGaussSeidel);
router.post('/muller', calcularMuller);
router.post('/trigonometria', calcularTrigonometria);
router.post('/potencia', calcularPotencia);
router.post('/raiz', calcularRaiz);
router.post('/logaritmo', calcularLogaritmo);
router.post('/volumen', calcularVolumen);
router.post('/area', calcularArea);
router.post('/perimetro', calcularPerimetro);
router.post('/derivada', calcularDerivada);
router.post('/limite', calcularLimite);
router.post('/integral', calcularIntegralGeneral);
router.post('/graficar', calcularGrafica);
router.post('/gauss-simple', calcularGaussSimple);
router.post('/gauss-jordan', calcularGaussJordan);
router.post('/inversa', calcularInversa);
router.post('/cramer', calcularCramer);
router.post('/resolver-ecuacion', resolverEcuacion);
router.post('/resolver-inecuacion', resolverInecuacion);
router.post('/mrua', calcularMRUA);
router.post('/caida-libre', calcularCaidaLibre);
router.post('/proyectil', calcularProyectil);
router.post('/segunda-ley', calcularSegundaLey);
router.post('/tercera-ley', calcularTerceraLey);

module.exports = router;
