import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Limites = () => {
  const [funcion, setFuncion] = useState('(x^2-1)/(x-1)')
  const [variable, setVariable] = useState('x')
  const [punto, setPunto] = useState(1)
  const [direccion, setDireccion] = useState('both')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const calcularLimite = async () => {
    setLoading(true)
    setError(null)
    
    try {      
      // Validación básica en el cliente
      if (!funcion || !variable) {
        throw new Error('Debes completar todos los campos')
      }
        const response = await axios.post(`${API_URL}/limite`, {
        f: funcion,
        variable,
        punto: Number(punto), // Aseguramos que se envía como número
        direccion
      })
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular el límite:', err)
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
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

  const getNotacionDireccion = () => {
    switch (direccion) {
      case 'left': return `x \\to ${punto}^-`
      case 'right': return `x \\to ${punto}^+`
      case 'both': return `x \\to ${punto}`
      default: return `x \\to ${punto}`
    }
  }

  const getDireccionText = () => {
    switch (direccion) {
      case 'left': return 'por la izquierda'
      case 'right': return 'por la derecha'
      case 'both': return 'bilateral'
      default: return 'bilateral'
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
                  \\lim_{${getNotacionDireccion()}} ${renderFuncionLatex(funcion)} = ${renderFuncionLatex(resultado)}
                \\]`}
              </MathJax>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              El límite {getDireccionText()} de <MathJax inline>{`$${renderFuncionLatex(funcion)}$`}</MathJax> cuando {variable} tiende a {punto} es:
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
      title="Cálculo de Límites"
      description="Calcula el límite de una función cuando una variable tiende a un punto."
      onCalculate={calcularLimite}
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
            placeholder="Ejemplo: (x^2-1)/(x-1)"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="punto">
              Punto
            </label>
            <input
              id="punto"
              type="number"
              value={punto}
              onChange={(e) => setPunto(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              step="any"
              placeholder="Punto al que tiende"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
              Dirección
            </label>
            <select
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="both">Bilateral (ambos lados)</option>
              <option value="left">Por la izquierda</option>
              <option value="right">Por la derecha</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Notación matemática:</p>
        <MathJax>
          {`\\[\\lim_{${getNotacionDireccion()}} ${renderFuncionLatex(funcion)}\\]`}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información sobre límites:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>El límite describe el comportamiento de una función cerca de un punto, sin importar el valor exacto en ese punto.</li>
          <li>El límite bilateral considera el comportamiento por ambos lados del punto.</li>
          <li>El límite por la izquierda (x→a-) considera solo valores que se aproximan desde valores menores que a.</li>
          <li>El límite por la derecha (x→a+) considera solo valores que se aproximan desde valores mayores que a.</li>
          <li>Para funciones con indeterminaciones como 0/0, es útil factorizar o aplicar la regla de L'Hôpital.</li>
          <li>Utiliza la notación * para multiplicación (ejemplo: 2*x).</li>
          <li>Utiliza la notación ^ para potencias (ejemplo: x^2).</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default Limites
