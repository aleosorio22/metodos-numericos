import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const CaidaLibre = () => {
  // Estado para los valores de entrada
  const [v0, setV0] = useState('')
  const [t, setT] = useState('')
  const [g, setG] = useState('9.8') // Valor por defecto para la gravedad
  const [h, setH] = useState('')
  const [buscar, setBuscar] = useState('h') // Variable a buscar (altura por defecto)

  // Estado para resultados y errores
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularCaidaLibre = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Validación básica
      if (buscar === 'h' && (v0 === '' || t === '' || g === '')) {
        throw new Error('Para calcular la altura, debes proporcionar la velocidad inicial, tiempo y gravedad')
      } else if (buscar === 'v' && (v0 === '' || t === '' || g === '')) {
        throw new Error('Para calcular la velocidad final, debes proporcionar la velocidad inicial, tiempo y gravedad')
      } else if (buscar === 't' && ((v0 === '' || g === '') || h === '')) {
        throw new Error('Para calcular el tiempo, debes proporcionar la velocidad inicial, altura y gravedad')
      } else if (buscar === 'g' && ((v0 === '' || t === '') || h === '')) {
        throw new Error('Para calcular la gravedad, debes proporcionar la velocidad inicial, tiempo y altura')
      }
      
      const params = {
        v0: v0 !== '' ? Number(v0) : NaN,
        t: t !== '' ? Number(t) : NaN,
        g: g !== '' ? Number(g) : NaN,
        h: h !== '' ? Number(h) : NaN,
        buscar
      }
      
      const response = await axios.post(`${API_URL}/caida-libre`, params)
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular caída libre:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const getVariableName = (varKey) => {
    switch (varKey) {
      case 'v0': return 'Velocidad inicial (v₀)'
      case 't': return 'Tiempo (t)'
      case 'g': return 'Aceleración de la gravedad (g)'
      case 'h': return 'Altura (h)'
      case 'v': return 'Velocidad final (v)'
      default: return varKey
    }
  }
  
  const getVariableLatex = (varKey) => {
    switch (varKey) {
      case 'v0': return 'v_0'
      case 't': return 't'
      case 'g': return 'g'
      case 'h': return 'h'
      case 'v': return 'v'
      default: return varKey
    }
  }

  const renderFormula = () => {
    switch (buscar) {
      case 'h':
        return '\\[h = v_0 t + \\frac{1}{2} g t^2\\]'
      case 'v':
        return '\\[v = v_0 + gt\\]'
      case 't':
        return '\\[t = \\frac{-v_0 \\pm \\sqrt{v_0^2 + 2gh}}{g}\\]'
      case 'g':
        return '\\[g = \\frac{2(h - v_0 t)}{t^2}\\]'
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
            {buscar === 'h' && (
              <p className="text-xs text-gray-500 mt-2">
                * La altura se considera positiva hacia arriba.
              </p>
            )}
            {buscar === 'v' && (
              <p className="text-xs text-gray-500 mt-2">
                * La velocidad es positiva hacia arriba y negativa hacia abajo.
              </p>
            )}
          </div>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Caída Libre"
      description="Calcula los parámetros del movimiento de caída libre bajo la influencia de la gravedad."
      onCalculate={calcularCaidaLibre}
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
            <option value="h">Altura (h)</option>
            <option value="v">Velocidad final (v)</option>
            <option value="t">Tiempo (t)</option>
            <option value="g">Aceleración de la gravedad (g)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <p className="text-xs text-gray-500 mt-1">
              Positivo: hacia arriba, Negativo: hacia abajo
            </p>
          </div>
          
          <div className={buscar === 't' ? 'opacity-50' : ''}>
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
              disabled={buscar === 't'}
              step="any"
            />
          </div>
          
          <div className={buscar === 'g' ? 'opacity-50' : ''}>
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
              disabled={buscar === 'g'}
              step="any"
            />
            <p className="text-xs text-gray-500 mt-1">
              Valor por defecto en la Tierra: 9.8 m/s²
            </p>
          </div>
          
          <div className={buscar === 'h' ? 'opacity-50' : ''}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="h">
              Altura (h)
            </label>
            <input
              id="h"
              type="number"
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Metros (m)"
              disabled={buscar === 'h'}
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
        <p className="text-sm text-blue-700 mb-1">Información sobre caída libre:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>En caída libre, un objeto se mueve bajo la influencia única de la gravedad.</li>
          <li>La aceleración es constante e igual a la aceleración de la gravedad (g).</li>
          <li>En la Tierra, g ≈ 9.8 m/s² (valor positivo), pero en las ecuaciones se usa negativo para indicar que apunta hacia abajo.</li>
          <li>Las ecuaciones principales son: $h = v_0t + \frac{1}{2}gt^2$ y $v = v_0 + gt$</li>
          <li>Convención de signos: hacia arriba es positivo, hacia abajo es negativo.</li>
          <li>Deja en blanco el campo de la variable que deseas calcular.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default CaidaLibre
