import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const MRUA = () => {
  // Estado para los valores de entrada
  const [x0, setX0] = useState('')
  const [v0, setV0] = useState('')
  const [a, setA] = useState('')
  const [t, setT] = useState('')
  const [v, setV] = useState('')
  const [x, setX] = useState('')
  const [buscar, setBuscar] = useState('sx') // Variable a buscar (posición por defecto)

  // Estado para resultados y errores
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularMRUA = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Convertir los valores a números, dejando vacíos los que no se ingresaron
      const params = {
        x0: x0 !== '' ? Number(x0) : [],
        v0: v0 !== '' ? Number(v0) : [],
        a: a !== '' ? Number(a) : [],
        t: t !== '' ? Number(t) : [],
        v: v !== '' ? Number(v) : [],
        x: x !== '' ? Number(x) : [],
        buscar
      }
      
      const response = await axios.post(`${API_URL}/mrua`, params)
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular MRUA:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const getVariableName = (varKey) => {
    switch (varKey) {
      case 'sx0': return 'Posición inicial (x₀)'
      case 'sv0': return 'Velocidad inicial (v₀)'
      case 'sa': return 'Aceleración (a)'
      case 'st': return 'Tiempo (t)'
      case 'sv': return 'Velocidad final (v)'
      case 'sx': return 'Posición final (x)'
      default: return varKey
    }
  }
  
  const getVariableLatex = (varKey) => {
    switch (varKey) {
      case 'sx0': return 'x_0'
      case 'sv0': return 'v_0'
      case 'sa': return 'a'
      case 'st': return 't'
      case 'sv': return 'v'
      case 'sx': return 'x'
      default: return varKey
    }
  }

  const renderFormula = () => {
    switch (buscar) {
      case 'sx':
        return '\\[x = x_0 + v_0 t + \\frac{1}{2} a t^2\\]'
      case 'sv':
        return '\\[v = v_0 + at\\]'
      case 'sa':
        return '\\[a = \\frac{v - v_0}{t}\\]'
      case 'st':
        return '\\[t = \\frac{-v_0 \\pm \\sqrt{v_0^2 + 2a(x-x_0)}}{a}\\]'
      case 'sx0':
        return '\\[x_0 = x - v_0 t - \\frac{1}{2} a t^2\\]'
      case 'sv0':
        return '\\[v_0 = v - at\\]'
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
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="font-semibold text-lg text-gray-700">Resultado:</p>
            <div className="mt-2">
              <MathJax>
                {`\\[
                  ${getVariableLatex(buscar)} = ${resultado}
                \\]`}
              </MathJax>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              El valor de {getVariableName(buscar)} es:
            </p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <MathJax>
                {`\\[${resultado}\\]`}
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
      title="Movimiento Rectilíneo Uniformemente Acelerado (MRUA)"
      description="Calcula los parámetros del movimiento rectilíneo con aceleración constante."
      onCalculate={calcularMRUA}
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
            <option value="sx">Posición final (x)</option>
            <option value="sv">Velocidad final (v)</option>
            <option value="sa">Aceleración (a)</option>
            <option value="st">Tiempo (t)</option>
            <option value="sx0">Posición inicial (x₀)</option>
            <option value="sv0">Velocidad inicial (v₀)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={buscar === 'sx0' ? 'opacity-50' : ''}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="x0">
              Posición inicial (x₀)
            </label>
            <input
              id="x0"
              type="number"
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros (m)"
              disabled={buscar === 'sx0'}
              step="any"
            />
          </div>
          
          <div className={buscar === 'sv0' ? 'opacity-50' : ''}>
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
              disabled={buscar === 'sv0'}
              step="any"
            />
          </div>
          
          <div className={buscar === 'sa' ? 'opacity-50' : ''}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="a">
              Aceleración (a)
            </label>
            <input
              id="a"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros/segundo² (m/s²)"
              disabled={buscar === 'sa'}
              step="any"
            />
          </div>
          
          <div className={buscar === 'st' ? 'opacity-50' : ''}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="t">
              Tiempo (t)
            </label>
            <input
              id="t"
              type="number"
              value={t}
              onChange={(e) => setT(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Segundos (s)"
              disabled={buscar === 'st'}
              step="any"
            />
          </div>
          
          <div className={buscar === 'sv' ? 'opacity-50' : ''}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="v">
              Velocidad final (v)
            </label>
            <input
              id="v"
              type="number"
              value={v}
              onChange={(e) => setV(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros/segundo (m/s)"
              disabled={buscar === 'sv'}
              step="any"
            />
          </div>
          
          <div className={buscar === 'sx' ? 'opacity-50' : ''}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="x">
              Posición final (x)
            </label>
            <input
              id="x"
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros (m)"
              disabled={buscar === 'sx'}
              step="any"
            />
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
        <p className="text-sm text-blue-700 mb-1">Información sobre el MRUA:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>El movimiento rectilíneo uniformemente acelerado (MRUA) es aquel en que la aceleración es constante.</li>
          <li>Las ecuaciones principales son: $v = v_0 + at$ y $x = x_0 + v_0t + \frac{1}{2}at^2$</li>
          <li>También se puede usar la relación: $v^2 = v_0^2 + 2a(x-x_0)$</li>
          <li>Deja vacíos los campos que desconoces (incluyendo el que quieres calcular).</li>
          <li>Debes proporcionar suficiente información para que el sistema pueda determinar la incógnita.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default MRUA
