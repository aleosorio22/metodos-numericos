import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../common/CalculatorLayout'
import Spinner from '../../common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const ResolverEcuacion = () => {
  const [ecuacion, setEcuacion] = useState('x^2 - 4')
  const [variable, setVariable] = useState('x')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularEcuacion = async () => {
    setLoading(true)
    setError(null)
    
    try {      
      // Validación básica en el cliente
      if (!ecuacion || !variable) {
        throw new Error('Debes completar todos los campos')
      }
      
      const response = await axios.post(`${API_URL}/resolver-ecuacion`, {
        ecuacion,
        variable
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al resolver la ecuación');
    } finally {
      setLoading(false);
    }
  };

  const renderEcuacionLatex = () => {
    try {
      return `${ecuacion} = 0`;
    } catch (error) {
      return ecuacion + " = 0";
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
      // Procesar el resultado ya sea array o string
      let valoresArray = [];
      
      if (Array.isArray(resultado)) {
        // Si es un array, lo usamos directamente
        valoresArray = resultado;
      } else if (typeof resultado === 'string') {
        // Si es un string de MATLAB (formato mat2str), extraemos los valores numéricos
        try {
          // Intentar interpretar el resultado como un array
          const matrixMatch = resultado.match(/\[(.*)\]/);
          if (matrixMatch && matrixMatch[1]) {
            // Separar por punto y coma (separador de filas en MATLAB)
            const valorSplit = matrixMatch[1].split(';').map(item => item.trim());
            valoresArray = valorSplit.map(val => parseFloat(val));
          } else {
            // Alternativa si el formato no coincide exactamente
            const valores = resultado.replace(/[\[\];]/g, ' ').trim().split(/\s+/);
            valoresArray = valores.filter(val => !isNaN(parseFloat(val))).map(val => parseFloat(val));
          }
        } catch (e) {
          // Si falla el parseo, mostrar el resultado como string
          return (
            <div className="space-y-4">
              <p className="font-semibold">Resultado:</p>
              <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto font-mono text-sm">
                {resultado}
              </pre>
            </div>
          );
        }
      }
      
      if (valoresArray.length > 0) {
        return (
          <div className="space-y-4">
            <p className="font-semibold">Solución de la ecuación:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variable</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {valoresArray.map((value, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{variable}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Number(value).toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Notación matemática:</p>
              <MathJax>
                {`\\[${variable} = ${valoresArray.map(val => Number(val).toFixed(6)).join(', ')}\\]`}
              </MathJax>
            </div>
          </div>
        );
      } else if (typeof resultado === 'string' && resultado.trim() !== '') {
        // Si no pudimos parsear el string pero aún así tenemos contenido
        return (
          <div className="space-y-4">
            <p className="font-semibold">Resultado:</p>
            <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto font-mono text-sm">
              {resultado}
            </pre>
          </div>
        );
      }
    }
    
    return null;
  }

  return (
    <CalculatorLayout
      title="Resolver Ecuación"
      description="Resuelve ecuaciones algebraicas del tipo f(x) = 0 para encontrar sus raíces."
      onCalculate={calcularEcuacion}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ecuacion">
            Ecuación (expresada como f(x) = 0)
          </label>
          <input
            id="ecuacion"
            type="text"
            value={ecuacion}
            onChange={(e) => setEcuacion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder="Ejemplo: x^2 - 4"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[${renderEcuacionLatex()}\\]`}
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
          <li>Ingresa la ecuación como expresión igualada a 0 (solo la parte izquierda).</li>
          <li>Ejemplos: <code>x^2 - 4</code>, <code>sin(x) - 0.5</code>, <code>x^3 - 2*x^2 + x - 3</code></li>
          <li>Las funciones disponibles incluyen: sin, cos, tan, exp, log, sqrt, etc.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default ResolverEcuacion