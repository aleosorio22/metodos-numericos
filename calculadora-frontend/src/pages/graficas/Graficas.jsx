import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Graficas = () => {
  const [funcion, setFuncion] = useState('sin(x)')
  const [variable, setVariable] = useState('x')
  const [rangoInicio, setRangoInicio] = useState('-10')
  const [rangoFin, setRangoFin] = useState('10')
  const [imagenURL, setImagenURL] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const generarGrafica = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_URL}/graficar`, {
        f: funcion,
        variable,
        a: Number(rangoInicio),
        b: Number(rangoFin)
      })

      if (response.data.archivo) {
        // Construir la URL completa para la imagen
        setImagenURL(`${API_URL}/images/${response.data.archivo}`)
      } else {
        throw new Error('No se recibió el nombre del archivo de la gráfica')
      }
    } catch (err) {
      console.error('Error al graficar:', err)
      setError(err.response?.data?.error || err.message || 'Error al generar la gráfica')
    } finally {
      setLoading(false)
    }
  }

  const renderFormula = () => {
    try {
      return `f(${variable}) = ${funcion}`
    } catch (error) {
      return funcion
    }
  }

  const renderResultado = () => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <Spinner />
          <p className="mt-2 text-gray-600">Generando gráfica...</p>
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
    
    if (imagenURL) {
      return (
        <div className="mt-6">
          <p className="font-semibold mb-2">Gráfica generada:</p>
          <div className="border rounded-lg p-4 bg-white">
            <img 
              src={imagenURL} 
              alt={`Gráfica de ${funcion}`}
              className="max-w-full h-auto"
              onError={(e) => {
                setError('Error al cargar la imagen')
                setImagenURL('')
              }}
            />
          </div>
        </div>
      )
    }
    
    return null
  }

  return (
    <CalculatorLayout
      title="Funciones Gráficas"
      description="Grafica funciones matemáticas en un intervalo definido."
      onCalculate={generarGrafica}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funcion">
            Función a graficar
          </label>
          <input
            id="funcion"
            type="text"
            value={funcion}
            onChange={(e) => setFuncion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder="Ejemplo: sin(x)"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[${renderFormula()}\\]`}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rangoInicio">
              Inicio del rango
            </label>
            <input
              id="rangoInicio"
              type="number"
              value={rangoInicio}
              onChange={(e) => setRangoInicio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              step="any"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rangoFin">
              Fin del rango
            </label>
            <input
              id="rangoFin"
              type="number"
              value={rangoFin}
              onChange={(e) => setRangoFin(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              step="any"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <Spinner />
          <p className="mt-2 text-gray-600">Generando gráfica...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {imagenURL && !loading && (
        <div className="mt-6">
          <p className="font-semibold mb-2">Gráfica generada:</p>
          <div className="border rounded-lg p-4 bg-white">
            <img 
              src={imagenURL} 
              alt={`Gráfica de ${funcion}`}
              className="max-w-full h-auto"
              onError={(e) => {
                setError('Error al cargar la imagen')
                setImagenURL('')
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Información:</p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Ingresa una función matemática válida.</li>
          <li>Ejemplos: sin(x), x^2 + 2*x - 1, exp(-x)*cos(2*x)</li>
          <li>El rango define el intervalo [a, b] donde se graficará la función.</li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}

export default Graficas