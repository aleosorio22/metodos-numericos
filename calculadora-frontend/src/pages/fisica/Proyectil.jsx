import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Proyectil = () => {
  // Estado para los valores de entrada
  const [v0, setV0] = useState('')
  const [angulo, setAngulo] = useState('')
  const [g, setG] = useState('9.8') // Valor por defecto para la gravedad
  const [buscar, setBuscar] = useState('R') // Variable a buscar (alcance por defecto)

  // Estado para resultados y errores
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularProyectil = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Validación básica
      if (v0 === '') {
        throw new Error('Debes proporcionar la velocidad inicial')
      }
      if (angulo === '') {
        throw new Error('Debes proporcionar el ángulo de lanzamiento')
      }
      if (g === '') {
        throw new Error('Debes proporcionar el valor de la gravedad')
      }
      
      const params = {
        v0: Number(v0),
        angulo: Number(angulo),
        g: Number(g),
        buscar
      }
      
      const response = await axios.post(`${API_URL}/proyectil`, params)
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular proyectil:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const getVariableName = (varKey) => {
    switch (varKey) {
      case 'v0': return 'Velocidad inicial (v₀)'
      case 'angulo': return 'Ángulo de lanzamiento (θ)'
      case 'g': return 'Aceleración de la gravedad (g)'
      case 'R': return 'Alcance horizontal (R)'
      case 'H': return 'Altura máxima (H)'
      case 'T': return 'Tiempo de vuelo (T)'
      default: return varKey
    }
  }
  
  const getVariableLatex = (varKey) => {
    switch (varKey) {
      case 'v0': return 'v_0'
      case 'angulo': return '\\theta'
      case 'g': return 'g'
      case 'R': return 'R'
      case 'H': return 'H'
      case 'T': return 'T'
      default: return varKey
    }
  }

  const renderFormula = () => {
    switch (buscar) {
      case 'R':
        return '\\[R = \\frac{v_0^2 \\sin(2\\theta)}{g}\\]'
      case 'H':
        return '\\[H = \\frac{v_0^2 \\sin^2(\\theta)}{2g}\\]'
      case 'T':
        return '\\[T = \\frac{2v_0 \\sin(\\theta)}{g}\\]'
      default:
        return ''
    }
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
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-700 font-medium">{getVariableName(buscar)}:</p>
          <p className="text-green-700 text-xl mt-2">
            <MathJax>{`$${getVariableLatex(buscar)} = ${resultado}$`}</MathJax>
          </p>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Movimiento de Proyectiles"
      description="Calcula el alcance, la altura máxima o el tiempo de vuelo de un proyectil lanzado con una velocidad inicial y un ángulo."
      onCalculate={calcularProyectil}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buscar">
            ¿Qué deseas calcular?
          </label>
          <select
            id="buscar"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="R">Alcance horizontal (R)</option>
            <option value="H">Altura máxima (H)</option>
            <option value="T">Tiempo de vuelo (T)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="v0">
              Velocidad inicial (v₀)
            </label>
            <input
              id="v0"
              type="number"
              value={v0}
              onChange={(e) => setV0(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros/segundo (m/s)"
              step="any"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="angulo">
              Ángulo de lanzamiento (θ)
            </label>
            <input
              id="angulo"
              type="number"
              value={angulo}
              onChange={(e) => setAngulo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Grados (°)"
              min="0"
              max="90"
              step="any"
            />
            <p className="text-xs text-gray-500 mt-1">
              Entre 0° y 90° respecto a la horizontal
            </p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="g">
              Aceleración de la gravedad (g)
            </label>
            <input
              id="g"
              type="number"
              value={g}
              onChange={(e) => setG(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros/segundo² (m/s²)"
              step="any"
            />
            <p className="text-xs text-gray-500 mt-1">
              Valor por defecto en la Tierra: 9.8 m/s²
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Fórmula aplicable:</p>
        <MathJax>
          {renderFormula()}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información sobre movimiento de proyectiles:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>El movimiento de proyectiles combina un movimiento horizontal uniforme y un movimiento vertical bajo la influencia de la gravedad.</li>
          <li>El alcance horizontal máximo se logra con un ángulo de lanzamiento de 45° (en ausencia de resistencia del aire).</li>
          <li>Las ecuaciones asumen que no hay resistencia del aire y que el proyectil termina a la misma altura donde comenzó.</li>
          <li>Para el cálculo, el ángulo debe estar en grados (se convertirá a radianes internamente).</li>
          <li>La velocidad inicial debe ser mayor que cero para obtener resultados válidos.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default Proyectil
