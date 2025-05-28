import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import { useSearchParams } from 'react-router-dom'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const PotenciasRaices = () => {
  const [searchParams] = useSearchParams()
  const modo = searchParams.get('modo') || 'potencia'

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Potencias y Raíces</h1>
      <div className="mb-6 flex flex-wrap gap-2">
        <MethodButton name="Potencias" method="potencia" current={modo} />
        <MethodButton name="Raíces" method="raiz" current={modo} />
      </div>

      {modo === 'potencia' ? <CalculadoraPotencia /> : <CalculadoraRaiz />}
    </div>
  )
}

const MethodButton = ({ name, method, current }) => {
  const isActive = method === current
  
  return (
    <a 
      href={`/potencias-raices?modo=${method}`}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      {name}
    </a>
  )
}

const CalculadoraPotencia = () => {
  const [base, setBase] = useState(2)
  const [exponente, setExponente] = useState(3)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularPotencia = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_URL}/potencia`, {
        base: parseFloat(base),
        exponente: parseFloat(exponente)
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
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
                  {`\\[${base}^{${exponente}} = ${valorNumerico.toFixed(6)}\\]`}
                </MathJax>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Valor exacto:</p>
              <p className="font-mono text-lg">{valorNumerico}</p>
              
              {!Number.isInteger(valorNumerico) && (
                <p className="text-sm text-gray-600 mt-2">
                  Valor decimal aproximado: {valorNumerico.toFixed(8)}
                </p>
              )}
            </div>
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
      title="Cálculo de Potencias"
      description="Calcula el valor de un número elevado a una potencia (base^exponente)."
      onCalculate={calcularPotencia}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="base">
            Base
          </label>
          <input
            id="base"
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa la base"
            step="any"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exponente">
            Exponente
          </label>
          <input
            id="exponente"
            type="number"
            value={exponente}
            onChange={(e) => setExponente(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el exponente"
            step="any"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Cálculo a realizar:</p>
        <MathJax>
          {`\\[${base}^{${exponente}}\\]`}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>Cuando el exponente es positivo, el número se multiplica por sí mismo tantas veces como indique el exponente.</li>
          <li>Cuando el exponente es negativo, se calcula primero el inverso de la base y luego se eleva a la potencia del valor absoluto del exponente.</li>
          <li>Cuando el exponente es cero, el resultado es 1 (siempre que la base no sea cero).</li>
          <li>Cuando el exponente es fraccionario, representa una raíz. Por ejemplo, x^(1/2) es igual a la raíz cuadrada de x.</li>
        </ul>
      </div>
    </CalculatorLayout>
  );
};

const CalculadoraRaiz = () => {
  const [radicando, setRadicando] = useState(8)
  const [indice, setIndice] = useState(2)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularRaiz = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_URL}/raiz`, {
        radicando: parseFloat(radicando),
        indice: parseFloat(indice)
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const getIndiceText = () => {
    switch (indice) {
      case '2': return 'cuadrada';
      case '3': return 'cúbica';
      default: return `de índice ${indice}`;
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
                  {`\\[\\sqrt[${indice}]{${radicando}} = ${valorNumerico.toFixed(6)}\\]`}
                </MathJax>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Valor exacto:</p>
              <p className="font-mono text-lg">{valorNumerico}</p>
              
              {!Number.isInteger(valorNumerico) && (
                <p className="text-sm text-gray-600 mt-2">
                  Valor decimal aproximado: {valorNumerico.toFixed(8)}
                </p>
              )}
            </div>
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
      title="Cálculo de Raíces"
      description="Calcula la raíz n-ésima de un número (raíz cuadrada, cúbica, etc.)."
      onCalculate={calcularRaiz}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="radicando">
            Radicando (número dentro de la raíz)
          </label>
          <input
            id="radicando"
            type="number"
            value={radicando}
            onChange={(e) => setRadicando(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el radicando"
            step="any"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="indice">
            Índice de la raíz
          </label>
          <input
            id="indice"
            type="number"
            value={indice}
            onChange={(e) => setIndice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el índice (2 para raíz cuadrada, 3 para cúbica...)"
            min="1"
            step="1"
          />
          <p className="mt-1 text-sm text-gray-600">
            {indice == 2 ? 'Raíz cuadrada' : (indice == 3 ? 'Raíz cúbica' : `Raíz de índice ${indice}`)}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Cálculo a realizar:</p>
        <MathJax>
          {`\\[\\sqrt[${indice}]{${radicando}}\\]`}
        </MathJax>
      </div>

      {parseFloat(radicando) < 0 && parseFloat(indice) % 2 === 0 && (
        <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <p className="text-amber-700">
            Advertencia: Las raíces de índice par de números negativos no tienen solución en los números reales.
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>La raíz cuadrada (índice 2) de un número es el valor que, multiplicado por sí mismo, da ese número.</li>
          <li>La raíz cúbica (índice 3) de un número es el valor que, elevado al cubo, da ese número.</li>
          <li>En general, la raíz n-ésima de un número es el valor que, elevado a la potencia n, da ese número.</li>
          <li>Las raíces de índice par de números negativos no tienen solución en los números reales.</li>
        </ul>
      </div>
    </CalculatorLayout>
  );
};

export default PotenciasRaices