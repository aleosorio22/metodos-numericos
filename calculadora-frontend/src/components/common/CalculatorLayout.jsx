import { useState } from 'react'

const CalculatorLayout = ({ title, description, children, onCalculate, result }) => {
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate()
    setShowResult(true)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-1">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {children}
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calcular
            </button>
          </div>
        </div>
      </form>
      
      {showResult && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Resultado:</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}

export default CalculatorLayout