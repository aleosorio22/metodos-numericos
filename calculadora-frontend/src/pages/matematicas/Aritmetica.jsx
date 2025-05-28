import { useState } from 'react'
import axios from 'axios'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const Aritmetica = () => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [operacion, setOperacion] = useState('suma')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const operaciones = [
    { id: 'suma', nombre: 'Suma (+)', simbolo: '+' },
    { id: 'resta', nombre: 'Resta (-)', simbolo: '-' },
    { id: 'multiplicacion', nombre: 'Multiplicación (×)', simbolo: '×' },
    { id: 'division', nombre: 'División (÷)', simbolo: '÷' },
    { id: 'potencia', nombre: 'Potencia (^)', simbolo: '^' },
    { id: 'modulo', nombre: 'Módulo (%)', simbolo: '%' }
  ]

  const calcular = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post('http://localhost:3500/api/aritmetica', {
        a: Number(a),
        b: Number(b),
        operacion
      })
      
      setResultado(response.data.resultado)
    } catch (err) {
      console.error('Error al calcular:', err)
      setError(err.response?.data?.error || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const renderResultado = () => {
    if (loading) {
      return <div className="text-center py-4">Calculando...</div>
    }
    
    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )
    }
    
    if (resultado !== null) {
      return (
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{resultado}</div>
          <div className="text-gray-600">
            {a} {operaciones.find(op => op.id === operacion)?.simbolo} {b} = {resultado}
          </div>
        </div>
      )
    }
    
    return null
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Aritmética</h1>
      
      <CalculatorLayout
        title="Calculadora Aritmética"
        description="Realiza operaciones aritméticas básicas entre dos números."
        onCalculate={calcular}
        result={renderResultado()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="a" className="block text-sm font-medium text-gray-700 mb-1">
              Primer número (a)
            </label>
            <input
              type="number"
              id="a"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="b" className="block text-sm font-medium text-gray-700 mb-1">
              Segundo número (b)
            </label>
            <input
              type="number"
              id="b"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operación
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {operaciones.map((op) => (
              <div key={op.id} className="flex items-center">
                <input
                  id={`operacion-${op.id}`}
                  name="operacion"
                  type="radio"
                  checked={operacion === op.id}
                  onChange={() => setOperacion(op.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`operacion-${op.id}`} className="ml-2 block text-sm text-gray-700">
                  {op.nombre}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CalculatorLayout>
    </div>
  )
}

export default Aritmetica