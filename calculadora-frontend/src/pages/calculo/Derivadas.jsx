import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Derivadas = () => {
  const [funcion, setFuncion] = useState('x^2 - 2*x + 1')
  const [variable, setVariable] = useState('x')
  const [orden, setOrden] = useState(1)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const calcularDerivada = async () => {
    setLoading(true)
    setError(null)
    
    try {      
      // Validación básica en el cliente
      if (!funcion || !variable) {
        throw new Error('Debes completar todos los campos')
      }
        const response = await axios.post(`${API_URL}/derivada`, {
        f: funcion,
        variable,
        orden: Number(orden) // Aseguramos que se envía como número
      })
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular la derivada:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const getOrdenText = () => {
    switch (parseInt(orden)) {
      case 1: return 'primera'
      case 2: return 'segunda'
      case 3: return 'tercera'
      case 4: return 'cuarta'
      default: return `${orden}-ésima`
    }
  }

  const renderFuncionLatex = (func) => {
    // Reemplaza operaciones básicas para mejor visualización
    let texFunc = func
      .replace(/\*/g, ' \\cdot ')
      .replace(/\//g, ' / ')
      .replace(/\^/g, '^')
    
    return texFunc
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
      return (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="font-semibold text-lg text-gray-700">Resultado:</p>
            <div className="mt-2">
              <MathJax>
                {`\\[
                  \\frac{d${orden > 1 ? `^${orden}` : ''}}{d${variable}${orden > 1 ? `^${orden}` : ''}}\\left(${renderFuncionLatex(funcion)}\\right) = ${renderFuncionLatex(resultado)}
                \\]`}
              </MathJax>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              La {getOrdenText()} derivada de <MathJax inline>{`$${renderFuncionLatex(funcion)}$`}</MathJax> con respecto a {variable} es:
            </p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <MathJax>
                {`\\[${renderFuncionLatex(resultado)}\\]`}
              </MathJax>
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Cálculo de Derivadas"
      description="Calcula la derivada de una función matemática con respecto a una variable."
      onCalculate={calcularDerivada}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funcion">
            Función
          </label>
          <input
            id="funcion"
            type="text"
            value={funcion}
            onChange={(e) => setFuncion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ejemplo: x^2 - 2*x + 1"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variable">
              Variable
            </label>
            <select
              id="variable"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="x">x</option>
              <option value="y">y</option>
              <option value="z">z</option>
              <option value="t">t</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orden">
              Orden de la derivada
            </label>
            <input
              id="orden"
              type="number"
              min="1"
              max="10"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Orden (1, 2, 3, ...)"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Notación matemática:</p>
        <MathJax>
          {`\\[\\frac{d${orden > 1 ? `^${orden}` : ''}}{d${variable}${orden > 1 ? `^${orden}` : ''}}\\left(${renderFuncionLatex(funcion)}\\right)\\]`}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información sobre derivadas:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>La derivada representa la tasa de cambio instantánea de una función.</li>
          <li>La primera derivada (f') indica la pendiente de la función en cada punto.</li>
          <li>La segunda derivada (f'') muestra cómo cambia la pendiente y ayuda a determinar concavidad.</li>
          <li>Utiliza la notación * para multiplicación (ejemplo: 2*x).</li>
          <li>Utiliza la notación ^ para potencias (ejemplo: x^2).</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default Derivadas
