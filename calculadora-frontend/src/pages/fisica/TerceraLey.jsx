import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const TerceraLey = () => {
  // Estado para los valores de entrada
  const [fAccion, setFAccion] = useState('')
  const [buscar, setBuscar] = useState('reaccion') // Variable a calcular por defecto es la fuerza de reacción

  // Estado para resultados y errores
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularTerceraLey = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Validación básica según la variable a buscar
      if (buscar === 'reaccion' && fAccion === '') {
        throw new Error('Debes proporcionar el valor de la fuerza de acción')
      }
      if (buscar === 'accion' && fAccion === '') {
        throw new Error('Debes proporcionar el valor de la fuerza de reacción')
      }
      
      // Preparamos los parámetros según la variable a buscar
      const params = {
        f_accion: Number(fAccion),
        buscar
      }
      
      const response = await axios.post(`${API_URL}/tercera-ley`, params)
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular Tercera Ley de Newton:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const getVariableName = (varKey) => {
    switch (varKey) {
      case 'accion': return 'Fuerza de acción (F₁)'
      case 'reaccion': return 'Fuerza de reacción (F₂)'
      default: return varKey
    }
  }
  
  const getVariableLatex = (varKey) => {
    switch (varKey) {
      case 'accion': return 'F_1'
      case 'reaccion': return 'F_2'
      default: return varKey
    }
  }

  const renderFormula = () => {
    return '\\[F_2 = -F_1\\]'
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
            <MathJax>{`$${getVariableLatex(buscar)} = ${resultado} \\text{ N}$`}</MathJax>
          </p>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Tercera Ley de Newton"
      description="Calcula la fuerza de acción o reacción utilizando la Tercera Ley de Newton: a toda acción corresponde una reacción igual y opuesta."
      onCalculate={calcularTerceraLey}
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
            <option value="reaccion">Fuerza de reacción (F₂)</option>
            <option value="accion">Fuerza de acción (F₁)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fAccion">
              {buscar === 'reaccion' ? 'Fuerza de acción (F₁)' : 'Fuerza de reacción (F₂)'}
            </label>
            <input
              id="fAccion"
              type="number"
              value={fAccion}
              onChange={(e) => setFAccion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Newtons (N)"
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
        <p className="text-sm text-blue-700 mb-1">Información sobre la Tercera Ley de Newton:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>La Tercera Ley de Newton establece que cuando un objeto ejerce una fuerza sobre un segundo objeto, éste ejerce sobre el primero una fuerza de igual magnitud pero en sentido opuesto.</li>
          <li>Esta ley se conoce comúnmente como "Ley de acción y reacción".</li>
          <li>Las fuerzas de acción y reacción actúan sobre cuerpos diferentes, nunca sobre el mismo cuerpo.</li>
          <li>Las fuerzas de acción y reacción son siempre iguales en magnitud pero opuestas en dirección.</li>
          <li>Esta ley se expresa matemáticamente como F₂ = -F₁, donde F₁ es la fuerza de acción y F₂ es la fuerza de reacción.</li>
          <li>Un ejemplo clásico es el empuje de un cohete: los gases son expulsados hacia atrás (acción) y el cohete avanza hacia adelante (reacción).</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default TerceraLey
