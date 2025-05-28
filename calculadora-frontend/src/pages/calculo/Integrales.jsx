import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Integrales = () => {
  const [funcion, setFuncion] = useState('x^2')
  const [variable, setVariable] = useState('x')
  const [tipo, setTipo] = useState('indefinida')
  const [limiteInferior, setLimiteInferior] = useState(0)
  const [limiteSuperior, setLimiteSuperior] = useState(1)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const calcularIntegral = async () => {
    setLoading(true)
    setError(null)
    
    try {      
      // Validación básica en el cliente
      if (!funcion || !variable) {
        throw new Error('Debes completar todos los campos')
      }
        const parametros = {
        f: funcion,
        variable,
        tipo
      }
      
      // Añadir límites solo si es integral definida, de área o volumen
      if (tipo !== 'indefinida') {
        // Validar que sean valores numéricos válidos
        if (isNaN(Number(limiteInferior)) || isNaN(Number(limiteSuperior))) {
          throw new Error('Los límites deben ser valores numéricos')
        }
        
        // Asegurarse de que los límites sean números
        parametros.a = Number(limiteInferior)
        parametros.b = Number(limiteSuperior)
      }
      
      const response = await axios.post(`${API_URL}/integral`, parametros)
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular la integral:', err)
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

  const renderNotacionIntegral = () => {
    const fx = renderFuncionLatex(funcion)
    
    if (tipo === 'indefinida') {
      return `\\int ${fx} \\, d${variable}`
    } else {
      return `\\int_{${limiteInferior}}^{${limiteSuperior}} ${fx} \\, d${variable}`
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
                  ${renderNotacionIntegral()} = ${renderFuncionLatex(resultado)}
                \\]`}
              </MathJax>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              {tipo === 'indefinida' 
                ? 'La integral indefinida es:' 
                : tipo === 'area' 
                  ? 'El área bajo la curva es:' 
                  : tipo === 'volumen' 
                    ? 'El volumen del sólido de revolución es:' 
                    : 'La integral definida es:'}
            </p>
            <div className="bg-white p-3 rounded border border-gray-200">
              <MathJax>
                {`\\[${renderFuncionLatex(resultado)}\\]`}
              </MathJax>
            </div>
            {tipo !== 'indefinida' && (
              <p className="text-xs text-gray-500 mt-2">
                * Se ha evaluado la integral en los límites [{limiteInferior}, {limiteSuperior}]
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
      title="Cálculo de Integrales"
      description="Calcula integrales indefinidas, definidas, áreas bajo la curva o volúmenes de revolución."
      onCalculate={calcularIntegral}
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
            placeholder="Ejemplo: x^2"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
            Tipo de integral
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="indefinida">Integral Indefinida</option>
            <option value="integral">Integral Definida</option>
            <option value="area">Área bajo la curva</option>
            <option value="volumen">Volumen de revolución</option>
          </select>
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
          
          {tipo !== 'indefinida' && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="limiteInferior">
                  Límite inferior
                </label>
                <input
                  id="limiteInferior"
                  type="number"
                  value={limiteInferior}
                  onChange={(e) => setLimiteInferior(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  step="any"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="limiteSuperior">
                  Límite superior
                </label>
                <input
                  id="limiteSuperior"
                  type="number"
                  value={limiteSuperior}
                  onChange={(e) => setLimiteSuperior(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  step="any"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Notación matemática:</p>
        <MathJax>
          {`\\[${renderNotacionIntegral()}\\]`}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información sobre integrales:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>La integral indefinida representa la familia de antiderivadas de una función.</li>
          <li>La integral definida calcula el valor numérico entre dos límites.</li>
          <li>El área bajo la curva calcula el área absoluta (siempre positiva) entre la función y el eje x.</li>
          <li>El volumen de revolución calcula el volumen del sólido generado al girar el área bajo la curva alrededor del eje x.</li>
          <li>Utiliza la notación * para multiplicación (ejemplo: 2*x).</li>
          <li>Utiliza la notación ^ para potencias (ejemplo: x^2).</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default Integrales
