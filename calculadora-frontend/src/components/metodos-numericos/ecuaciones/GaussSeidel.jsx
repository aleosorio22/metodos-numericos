import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../common/CalculatorLayout'
import Spinner from '../../common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const GaussSeidel = () => {
  const [matrizA, setMatrizA] = useState('[[4, -1, 0], [-1, 4, -1], [0, -1, 4]]')
  const [vectorB, setVectorB] = useState('[3, 6, 3]')
  const [vectorX0, setVectorX0] = useState('[0, 0, 0]')
  const [tolerancia, setTolerancia] = useState(0.0001)
  const [maxIteraciones, setMaxIteraciones] = useState(100)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dimension, setDimension] = useState(3)

  const calcularGaussSeidel = async () => {
    setLoading(true)
    setError(null)
    
    try {
      let A, b, x0;
      
      try {
        A = JSON.parse(matrizA);
        b = JSON.parse(vectorB);
        x0 = JSON.parse(vectorX0);
      } catch (parseError) {
        throw new Error('Error al parsear los datos. Asegúrate de usar el formato correcto para matrices y vectores.');
      }
      
      if (!Array.isArray(A) || !A.every(row => Array.isArray(row) && row.length === A.length)) {
        throw new Error('La matriz A debe ser cuadrada.');
      }
      
      if (!Array.isArray(b) || b.length !== A.length) {
        throw new Error('La dimensión del vector b debe ser igual al número de filas de A.');
      }
      
      if (!Array.isArray(x0) || x0.length !== A.length) {
        throw new Error('La dimensión del vector inicial x0 debe ser igual al número de filas de A.');
      }
      
      const response = await axios.post(`${API_URL}/gauss-seidel`, {
        A,
        b,
        x0,
        tol: Number(tolerancia),
        max_iter: Number(maxIteraciones)
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDimensionChange = (e) => {
    const dim = parseInt(e.target.value);
    if (dim > 0) {
      setDimension(dim);
      // Crear matriz y vectores con la nueva dimensión
      const nuevaMatrizA = Array(dim).fill().map(() => Array(dim).fill(0));
      const nuevoVectorB = Array(dim).fill(0);
      const nuevoVectorX0 = Array(dim).fill(0);
      
      setMatrizA(JSON.stringify(nuevaMatrizA));
      setVectorB(JSON.stringify(nuevoVectorB));
      setVectorX0(JSON.stringify(nuevoVectorX0));
    }
  };

  const renderMatrizLatex = (matriz) => {
    try {
      const matrizArray = JSON.parse(matriz);
      if (!Array.isArray(matrizArray) || !matrizArray.every(Array.isArray)) {
        return "\\begin{pmatrix} ? \\end{pmatrix}";
      }
      
      let latex = "\\begin{pmatrix} ";
      matrizArray.forEach((fila, i) => {
        fila.forEach((valor, j) => {
          latex += valor;
          if (j < fila.length - 1) latex += " & ";
        });
        if (i < matrizArray.length - 1) latex += " \\\\ ";
      });
      latex += " \\end{pmatrix}";
      
      return latex;
    } catch (error) {
      return "\\begin{pmatrix} ? \\end{pmatrix}";
    }
  };

  const renderVectorLatex = (vector) => {
    try {
      const vectorArray = JSON.parse(vector);
      if (!Array.isArray(vectorArray)) {
        return "\\begin{pmatrix} ? \\end{pmatrix}";
      }
      
      let latex = "\\begin{pmatrix} ";
      vectorArray.forEach((valor, i) => {
        latex += valor;
        if (i < vectorArray.length - 1) latex += " \\\\ ";
      });
      latex += " \\end{pmatrix}";
      
      return latex;
    } catch (error) {
      return "\\begin{pmatrix} ? \\end{pmatrix}";
    }
  };
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
      // Procesar el resultado ya sea array o string
      let valoresArray = [];
      
      if (Array.isArray(resultado)) {
        // Si es un array, lo usamos directamente
        valoresArray = resultado;
      } else if (typeof resultado === 'string') {
        // Si es un string, intentamos extraer los valores numéricos
        // El formato esperado es algo como: "3.8733    4.3662    3.5916"
        const valores = resultado.trim().split(/\s+/);
        valoresArray = valores.map(val => parseFloat(val));
      }
        if (valoresArray.length > 0) {
        return (
          <div className="space-y-4">
            <p className="font-semibold">Solución del sistema:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variable</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {valoresArray.map((value, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">x<sub>{index + 1}</sub></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Number(value).toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Vista matemática:</p>
              <MathJax>
                {`\\[X = ${renderVectorLatex(JSON.stringify(valoresArray))}\\]`}
              </MathJax>
            </div>
          </div>
        );
      } else if (typeof resultado === 'string' && resultado.trim() !== '') {
        // Si no pudimos parsear el string pero aún así tenemos contenido
        return (
          <div className="space-y-4">
            <p className="font-semibold">Resultado:</p>
            <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto font-mono text-sm">
              {resultado}
            </pre>
          </div>
        );
      }
    }
    
    return null;
    
    return null
  }

  return (
    <CalculatorLayout
      title="Método de Gauss-Seidel"
      description="Resuelve sistemas de ecuaciones lineales de manera iterativa, mejorando la aproximación en cada paso."
      onCalculate={calcularGaussSeidel}
      result={renderResultado()}
    >
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dimension">
          Dimensión del sistema
        </label>
        <input
          id="dimension"
          type="number"
          value={dimension}
          onChange={handleDimensionChange}
          className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="1"
          max="10"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="matrizA">
            Matriz A (matriz de coeficientes)
          </label>
          <textarea
            id="matrizA"
            value={matrizA}
            onChange={(e) => setMatrizA(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            rows="4"
            placeholder="Ejemplo: [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[A = ${renderMatrizLatex(matrizA)}\\]`}
            </MathJax>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vectorB">
            Vector b (términos independientes)
          </label>
          <input
            id="vectorB"
            type="text"
            value={vectorB}
            onChange={(e) => setVectorB(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder="Ejemplo: [3, 6, 3]"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[b = ${renderVectorLatex(vectorB)}\\]`}
            </MathJax>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vectorX0">
            Vector x₀ (aproximación inicial)
          </label>
          <input
            id="vectorX0"
            type="text"
            value={vectorX0}
            onChange={(e) => setVectorX0(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder="Ejemplo: [0, 0, 0]"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[x_0 = ${renderVectorLatex(vectorX0)}\\]`}
            </MathJax>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tolerancia">
            Tolerancia
          </label>
          <input
            id="tolerancia"
            type="number"
            value={tolerancia}
            onChange={(e) => setTolerancia(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            step="0.0000001"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxIteraciones">
            Máximo de iteraciones
          </label>
          <input
            id="maxIteraciones"
            type="number"
            value={maxIteraciones}
            onChange={(e) => setMaxIteraciones(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
          />
        </div>
      </div>
    </CalculatorLayout>
  )
}

export default GaussSeidel
