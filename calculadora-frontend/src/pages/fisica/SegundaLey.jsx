import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const SegundaLey = () => {
  // Estado para los valores de entrada
  const [fuerza, setFuerza] = useState('')
  const [masa, setMasa] = useState('')
  const [aceleracion, setAceleracion] = useState('')
  const [buscar, setBuscar] = useState('F') // Variable a calcular por defecto es la fuerza

  // Estado para resultados y errores
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularSegundaLey = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Validación básica según la variable a buscar
      if (buscar === 'F' && (masa === '' || aceleracion === '')) {
        throw new Error('Debes proporcionar valores para la masa y la aceleración')
      }
      if (buscar === 'm' && (fuerza === '' || aceleracion === '')) {
        throw new Error('Debes proporcionar valores para la fuerza y la aceleración')
      }
      if (buscar === 'a' && (fuerza === '' || masa === '')) {
        throw new Error('Debes proporcionar valores para la fuerza y la masa')
      }
      
      // Preparamos los parámetros según la variable a buscar
      const params = {
        F: buscar === 'F' ? NaN : Number(fuerza),
        m: buscar === 'm' ? NaN : Number(masa),
        a: buscar === 'a' ? NaN : Number(aceleracion),
        buscar
      }
      
      const response = await axios.post(`${API_URL}/segunda-ley`, params)
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular Segunda Ley de Newton:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const getVariableName = (varKey) => {
    switch (varKey) {
      case 'F': return 'Fuerza (F)'
      case 'm': return 'Masa (m)'
      case 'a': return 'Aceleración (a)'
      default: return varKey
    }
  }
  
  const getVariableLatex = (varKey) => {
    switch (varKey) {
      case 'F': return 'F'
      case 'm': return 'm'
      case 'a': return 'a'
      default: return varKey
    }
  }

  const getUnits = (varKey) => {
    switch (varKey) {
      case 'F': return 'N (Newtons)'
      case 'm': return 'kg (Kilogramos)'
      case 'a': return 'm/s² (Metros por segundo al cuadrado)'
      default: return ''
    }
  }

  const renderFormula = () => {
    switch (buscar) {
      case 'F':
        return '\\[F = m \\cdot a\\]'
      case 'm':
        return '\\[m = \\frac{F}{a}\\]'
      case 'a':
        return '\\[a = \\frac{F}{m}\\]'
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
            <MathJax>{`$${getVariableLatex(buscar)} = ${resultado} \\text{ ${getUnits(buscar)}}$`}</MathJax>
          </p>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Segunda Ley de Newton"
      description="Calcula la fuerza, masa o aceleración utilizando la Segunda Ley de Newton (F = m·a)."
      onCalculate={calcularSegundaLey}
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
            <option value="F">Fuerza (F)</option>
            <option value="m">Masa (m)</option>
            <option value="a">Aceleración (a)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {buscar !== 'F' && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuerza">
                Fuerza (F)
              </label>
              <input
                id="fuerza"
                type="number"
                value={fuerza}
                onChange={(e) => setFuerza(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Newtons (N)"
                step="any"
              />
            </div>
          )}
          
          {buscar !== 'm' && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="masa">
                Masa (m)
              </label>
              <input
                id="masa"
                type="number"
                value={masa}
                onChange={(e) => setMasa(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Kilogramos (kg)"
                min="0"
                step="any"
              />
              <p className="text-xs text-gray-500 mt-1">
                La masa debe ser mayor que cero
              </p>
            </div>
          )}
          
          {buscar !== 'a' && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aceleracion">
                Aceleración (a)
              </label>
              <input
                id="aceleracion"
                type="number"
                value={aceleracion}
                onChange={(e) => setAceleracion(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="m/s²"
                step="any"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Fórmula aplicable:</p>
        <MathJax>
          {renderFormula()}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información sobre la Segunda Ley de Newton:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>La Segunda Ley de Newton establece que la fuerza neta aplicada sobre un cuerpo es proporcional a la aceleración que adquiere dicho cuerpo.</li>
          <li>La constante de proporcionalidad es la masa del cuerpo, una medida de su inercia o resistencia a cambiar su estado de movimiento.</li>
          <li>Esta ley se expresa matemáticamente como F = m·a, donde F es la fuerza neta, m es la masa y a es la aceleración.</li>
          <li>Las unidades en el Sistema Internacional son: Fuerza en Newtons (N), Masa en Kilogramos (kg) y Aceleración en metros por segundo al cuadrado (m/s²).</li>
          <li>Un Newton es la fuerza necesaria para proporcionar una aceleración de 1 m/s² a una masa de 1 kg.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default SegundaLey
