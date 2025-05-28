import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../common/CalculatorLayout'
import Spinner from '../../common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const ResolverInecuacion = () => {
  const [inecuacion, setInecuacion] = useState('x^2 - 4 < 0')
  const [variable, setVariable] = useState('x')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularInecuacion = async () => {
    setLoading(true)
    setError(null)
    
    try {      
      // Validación básica en el cliente
      if (!inecuacion || !variable) {
        throw new Error('Debes completar todos los campos')
      }
      
      const response = await axios.post(`${API_URL}/resolver-inecuacion`, {
        inecuacion,
        variable
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al resolver la inecuación');
    } finally {
      setLoading(false);
    }
  };

  const renderInecuacionLatex = () => {
    try {
      return inecuacion;
    } catch (error) {
      return inecuacion;
    }
  };

  const renderResultado = () => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <Spinner />
          <p className="mt-2 text-gray-600">Calculando...</p>
        </div>
      )
    }
    
    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )
    }
    
    if (resultado) {
      // La solución de una inecuación suele ser un intervalo o conjunto de intervalos
      // expresado simbólicamente, así que lo mostramos directamente
      return (
        <div className="space-y-4">
          <p className="font-semibold">Solución de la inecuación:</p>
          <div className="p-4 bg-gray-50 rounded-lg">
            <MathJax>
              {`\\[${variable} \\in \\{${resultado}\\}\\]`}
            </MathJax>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> La solución muestra los valores para los cuales la inecuación es verdadera. 
              La notación puede incluir intervalos (a, b) que representan a &lt; {variable} &lt; b, 
              o [a, b] que representan a ≤ {variable} ≤ b.
            </p>
          </div>
        </div>
      );
    }
    
    return null;
  }

  return (
    <CalculatorLayout
      title="Resolver Inecuación"
      description="Resuelve inecuaciones algebraicas y encuentra los intervalos de solución."
      onCalculate={calcularInecuacion}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inecuacion">
            Inecuación
          </label>
          <input
            id="inecuacion"
            type="text"
            value={inecuacion}
            onChange={(e) => setInecuacion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder="Ejemplo: x^2 - 4 < 0"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[${renderInecuacionLatex()}\\]`}
            </MathJax>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variable">
            Variable
          </label>
          <input
            id="variable"
            type="text"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder="Ejemplo: x"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Información:</p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Ingresa la inecuación completa incluyendo el operador de desigualdad.</li>          <li>Operadores soportados: &lt;, &gt;, &lt;=, &gt;= (usa &lt;= para ≤ y &gt;= para ≥)</li>
          <li>Ejemplos: <code>x^2 - 4 &lt; 0</code>, <code>x - 3 &gt;= 0</code>, <code>x^2 - 5*x + 6 &lt;= 0</code></li>
          <li>Las funciones disponibles incluyen: sin, cos, tan, exp, log, sqrt, etc.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default ResolverInecuacion