import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Logaritmos = () => {
  const [valor, setValor] = useState(10)
  const [base, setBase] = useState('10')
  const [basePersonalizada, setBasePersonalizada] = useState(2)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularLogaritmo = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Determinar qué base enviar según la opción seleccionada
      let baseParaEnviar
      if (base === 'e') {
        baseParaEnviar = 'e'
      } else if (base === '10') {
        baseParaEnviar = 10
      } else {
        baseParaEnviar = parseFloat(basePersonalizada)
      }
      
      const response = await axios.post(`${API_URL}/logaritmo`, {
        valor: parseFloat(valor),
        base: baseParaEnviar
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const getBaseSimboloLatex = () => {
    switch (base) {
      case 'e': return '\\ln';
      case '10': return '\\log';
      case 'otra': return `\\log_{${basePersonalizada}}`;
      default: return '';
    }
  };

  const renderResultado = () => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <Spinner />
          <p className="mt-2 text-gray-600">Calculando...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      );
    }
    
    if (resultado !== null) {
      // El resultado puede ser un número o un mensaje de error como string
      const isNumeric = typeof resultado === 'number' || (typeof resultado === 'string' && !isNaN(parseFloat(resultado)));
      
      if (isNumeric) {
        const valorNumerico = typeof resultado === 'number' ? resultado : parseFloat(resultado);
        
        return (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold text-lg text-gray-700">Resultado:</p>
              <div className="mt-2">
                <MathJax>
                  {`\\[${getBaseSimboloLatex()}(${valor}) = ${valorNumerico.toFixed(6)}\\]`}
                </MathJax>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Valor decimal:</p>
              <p className="font-mono text-lg">{valorNumerico}</p>
              
              {!Number.isInteger(valorNumerico) && (
                <p className="text-sm text-gray-600 mt-2">
                  Aproximación decimal: {valorNumerico.toFixed(8)}
                </p>
              )}
            </div>

            {/* Información de cambio de base si es relevante */}
            {base !== 'otra' && base !== '10' && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">Relación con logaritmo decimal:</p>
                <MathJax>
                  {base === 'e' ? 
                    `\\[\\ln(${valor}) = \\frac{\\log(${valor})}{\\log(e)} \\approx \\frac{\\log(${valor})}{0.4343}\\]` : 
                    `\\[\\log_{${basePersonalizada}}(${valor}) = \\frac{\\log(${valor})}{\\log(${basePersonalizada})}\\]`
                  }
                </MathJax>
              </div>
            )}
          </div>
        );
      } else {
        // Es un mensaje de error del backend
        return (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{resultado}</p>
          </div>
        );
      }
    }
    
    return null;
  };

  return (
    <CalculatorLayout
      title="Cálculo de Logaritmos"
      description="Calcula el logaritmo de un número en diferentes bases (natural, decimal o personalizada)."
      onCalculate={calcularLogaritmo}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
            Valor
          </label>
          <input
            id="valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa un número positivo"
            step="any"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="base">
            Base del logaritmo
          </label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <input
                id="base10"
                type="radio"
                name="base"
                value="10"
                checked={base === '10'}
                onChange={() => setBase('10')}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="base10" className="ml-2 text-gray-700">
                Base 10 (logaritmo decimal) - <span className="font-mono">log(x)</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="baseE"
                type="radio"
                name="base"
                value="e"
                checked={base === 'e'}
                onChange={() => setBase('e')}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="baseE" className="ml-2 text-gray-700">
                Base e (logaritmo natural) - <span className="font-mono">ln(x)</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="baseOtra"
                type="radio"
                name="base"
                value="otra"
                checked={base === 'otra'}
                onChange={() => setBase('otra')}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="baseOtra" className="ml-2 text-gray-700">
                Otra base
              </label>
            </div>

            {base === 'otra' && (
              <div className="pl-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="basePersonalizada">
                  Base personalizada
                </label>
                <input
                  id="basePersonalizada"
                  type="number"
                  value={basePersonalizada}
                  onChange={(e) => setBasePersonalizada(e.target.value)}
                  className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ej: 2"
                  step="any"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {parseFloat(valor) <= 0 && (
        <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <p className="text-amber-700">
            Advertencia: El logaritmo no está definido para números negativos o cero.
          </p>
        </div>
      )}

      {base === 'otra' && (parseFloat(basePersonalizada) <= 0 || parseFloat(basePersonalizada) === 1) && (
        <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <p className="text-amber-700">
            Advertencia: La base del logaritmo debe ser un número positivo distinto de 1.
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Cálculo a realizar:</p>
        <MathJax>
          {`\\[${getBaseSimboloLatex()}(${valor})\\]`}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Propiedades de los logaritmos:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>El logaritmo de un producto es la suma de los logaritmos: log(a·b) = log(a) + log(b)</li>
          <li>El logaritmo de un cociente es la diferencia de los logaritmos: log(a/b) = log(a) - log(b)</li>
          <li>El logaritmo de una potencia es el exponente por el logaritmo de la base: log(a^n) = n·log(a)</li>
          <li>El logaritmo en base a de a es 1: log<sub>a</sub>(a) = 1</li>
          <li>El logaritmo en cualquier base de 1 es 0: log<sub>a</sub>(1) = 0</li>
        </ul>
      </div>
    </CalculatorLayout>
  );
};

export default Logaritmos