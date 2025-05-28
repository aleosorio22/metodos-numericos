import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Trigonometria = () => {
  const [valor, setValor] = useState(45)
  const [unidad, setUnidad] = useState('grados')
  const [operacion, setOperacion] = useState('seno')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularTrigonometria = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_URL}/trigonometria`, {
        valor: parseFloat(valor),
        unidad,
        operacion
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const getOperacionLatex = () => {
    switch (operacion) {
      case 'seno': return '\\sin';
      case 'coseno': return '\\cos';
      case 'tangente': return '\\tan';
      default: return '';
    }
  };

  const getUnidadSimbolo = () => {
    return unidad === 'grados' ? '°' : ' \\, \\text{rad}';
  };

  const renderResultado = () => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <Spinner />
          <p className="mt-2 text-gray-600">Calculando...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      );
    }
    
    if (resultado !== null) {
      // El resultado puede ser un número o un mensaje de error como string
      const isNumeric = typeof resultado === 'number' || (typeof resultado === 'string' && !isNaN(parseFloat(resultado)));
      
      if (isNumeric) {
        const valorNumerico = typeof resultado === 'number' ? resultado : parseFloat(resultado);
        
        return (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold text-lg text-gray-700">Resultado:</p>
              <div className="mt-2">
                <MathJax>
                  {`\\[${getOperacionLatex()}(${valor}${getUnidadSimbolo()}) = ${valorNumerico.toFixed(6)}\\]`}
                </MathJax>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Valor decimal:</p>
              <p className="font-mono text-lg">{valorNumerico.toFixed(8)}</p>
              
              {operacion === 'tangente' && Math.abs(Math.abs(valorNumerico) - Math.PI/2) < 0.0001 && (
                <p className="mt-2 text-amber-600 text-sm">
                  Nota: La tangente en este punto tiende a infinito.
                </p>
              )}
            </div>
          </div>
        );
      } else {
        // Es un mensaje de error del backend
        return (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{resultado}</p>
          </div>
        );
      }
    }
    
    return null;
  };

  return (
    <CalculatorLayout
      title="Funciones Trigonométricas"
      description="Calcula el valor de las funciones trigonométricas fundamentales (seno, coseno y tangente) para cualquier ángulo."
      onCalculate={calcularTrigonometria}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operacion">
            Función trigonométrica
          </label>
          <select
            id="operacion"
            value={operacion}
            onChange={(e) => setOperacion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="seno">Seno</option>
            <option value="coseno">Coseno</option>
            <option value="tangente">Tangente</option>
          </select>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Función seleccionada:</p>
            <MathJax>
              {`\\[${getOperacionLatex()}(\\theta)\\]`}
            </MathJax>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
            Valor del ángulo
          </label>
          <input
            id="valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el valor del ángulo"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad">
            Unidad de medida
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="grados"
                name="unidad"
                value="grados"
                checked={unidad === 'grados'}
                onChange={() => setUnidad('grados')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Grados (°)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="radianes"
                name="unidad"
                value="radianes"
                checked={unidad === 'radianes'}
                onChange={() => setUnidad('radianes')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Radianes (rad)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Cálculo a realizar:</p>
        <MathJax>
          {`\\[${getOperacionLatex()}(${valor}${getUnidadSimbolo()})\\]`}
        </MathJax>
      </div>

      {operacion === 'tangente' && ((unidad === 'grados' && (valor % 180 === 90 || valor % 180 === -90)) || 
                                    (unidad === 'radianes' && (Math.abs(valor % Math.PI) === Math.PI/2))) && (
        <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <p className="text-amber-700">
            Advertencia: La tangente no está definida para ángulos de 90° + k·180° (o π/2 + k·π radianes),
            donde k es un entero.
          </p>
        </div>
      )}

      {operacion !== 'tangente' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 mb-1">Recordatorio:</p>
          <ul className="list-disc pl-5 text-sm text-blue-700">
            <li>El {operacion} toma valores entre -1 y 1</li>
            <li>El {operacion} es una función periódica con periodo {operacion === 'seno' ? '360° (2π)' : '360° (2π)'}</li>
          </ul>
        </div>
      )}

      {operacion === 'tangente' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 mb-1">Recordatorio:</p>
          <ul className="list-disc pl-5 text-sm text-blue-700">
            <li>La tangente no está definida para ángulos de 90° + k·180° (o π/2 + k·π radianes)</li>
            <li>La tangente es una función periódica con periodo 180° (π)</li>
          </ul>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default Trigonometria;