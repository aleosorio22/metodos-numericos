import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../common/CalculatorLayout'
import Spinner from '../../common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Muller = () => {
  const [funcion, setFuncion] = useState('x^3 - x - 2')
  const [x0, setX0] = useState(0)
  const [x1, setX1] = useState(1)
  const [x2, setX2] = useState(2)
  const [tolerancia, setTolerancia] = useState(0.0001)
  const [maxIteraciones, setMaxIteraciones] = useState(100)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularMuller = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_URL}/muller`, {
        f: funcion,
        x0: Number(x0),
        x1: Number(x1),
        x2: Number(x2),
        tol: Number(tolerancia),
        max_iter: Number(maxIteraciones)
      })
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular:', err)
      setError(err.response?.data?.error || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const convertToLatex = (expr) => {
    return expr
      .replace(/\*/g, '\\cdot ') // Convertir * a \cdot
      .replace(/\^\(([^)]+)\)/g, '^{$1}') // Manejar exponentes con paréntesis
      .replace(/\^(\d+)/g, '^{$1}') // Manejar exponentes simples
      .replace(/([0-9]+)([a-zA-Z])/g, '$1\\cdot $2') // Agregar \cdot entre números y variables
      .replace(/([/\+\-])/g, ' $1 ') // Agregar espacios alrededor de operadores
  }

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
      if (typeof resultado === 'string') {
        return (
          <div className="text-red-600">
            <p>{resultado}</p>
          </div>
        )
      }

      // Manejar el caso de resultado complejo (si es posible)
      let resultadoStr = "";
      if (typeof resultado === 'object' && resultado !== null && 'real' in resultado && 'imag' in resultado) {
        const signo = resultado.imag >= 0 ? '+' : '-';
        resultadoStr = `${resultado.real.toFixed(6)} ${signo} ${Math.abs(resultado.imag).toFixed(6)}i`;
      } else {
        resultadoStr = Number(resultado).toFixed(6);
      }

      return (
        <div className="space-y-4">
          <p className="font-semibold">Raíz encontrada: {resultadoStr}</p>
          <p>f({resultadoStr}) ≈ 0</p>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Método de Müller"
      description="Encuentra raíces reales o complejas de ecuaciones no lineales utilizando aproximación cuadrática a través de tres puntos."
      onCalculate={calcularMuller}
      result={renderResultado()}
    >
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funcion">
          Función f(x)
        </label>
        <input
          id="funcion"
          type="text"
          value={funcion}
          onChange={(e) => setFuncion(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ejemplo: x^3 - x - 2"
        />
        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
          <MathJax>
            {`\\[f(x) = ${convertToLatex(funcion)}\\]`}
          </MathJax>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="x0">
            Valor inicial (x₀)
          </label>
          <input
            id="x0"
            type="number"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="x1">
            Segundo valor (x₁)
          </label>
          <input
            id="x1"
            type="number"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="x2">
            Tercer valor (x₂)
          </label>
          <input
            id="x2"
            type="number"
            value={x2}
            onChange={(e) => setX2(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tolerancia">
            Tolerancia
          </label>
          <input
            id="tolerancia"
            type="number"
            value={tolerancia}
            onChange={(e) => setTolerancia(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            step="0.0000001"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxIteraciones">
            Máximo de iteraciones
          </label>
          <input
            id="maxIteraciones"
            type="number"
            value={maxIteraciones}
            onChange={(e) => setMaxIteraciones(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
          />
        </div>
      </div>
    </CalculatorLayout>
  )
}

export default Muller
