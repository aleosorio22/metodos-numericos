import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../common/CalculatorLayout'
import Spinner from '../../common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const GaussSimple = () => {
  const [matrizA, setMatrizA] = useState('[[3, 2, -1], [2, -2, 4], [-1, 0.5, -1]]')
  const [vectorB, setVectorB] = useState('[1, -2, 0]')
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dimension, setDimension] = useState(3)

  const calcularGaussSimple = async () => {
    setLoading(true)
    setError(null)
    
    try {
      let A, b;
      
      try {
        A = JSON.parse(matrizA);
        b = JSON.parse(vectorB);
      } catch (parseError) {
        throw new Error('Error al parsear los datos. Asegúrate de usar el formato correcto para matrices y vectores.');
      }
      
      if (!Array.isArray(A) || !A.every(row => Array.isArray(row) && row.length === A.length)) {
        throw new Error('La matriz A debe ser cuadrada.');
      }
      
      if (!Array.isArray(b) || b.length !== A.length) {
        throw new Error('La dimensión del vector b debe ser igual al número de filas de A.');
      }
      
      const response = await axios.post(`${API_URL}/gauss-simple`, {
        A,
        b
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
      
      setMatrizA(JSON.stringify(nuevaMatrizA));
      setVectorB(JSON.stringify(nuevoVectorB));
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
    }      if (resultado) {
      // Procesar el resultado ya sea array o string
      let valoresArray = [];
      
      if (Array.isArray(resultado)) {
        // Si es un array, lo usamos directamente
        valoresArray = resultado;
      } else if (typeof resultado === 'string') {
        // Si es un string de MATLAB (formato mat2str), extraemos los valores numéricos
        // El formato es típicamente "[num1; num2; num3]" o similar
        const matrixMatch = resultado.match(/\[(.*)\]/);
        if (matrixMatch && matrixMatch[1]) {
          // Separar por punto y coma (separador de filas en MATLAB)
          const valorSplit = matrixMatch[1].split(';').map(item => item.trim());
          valoresArray = valorSplit.map(val => parseFloat(val));
        } else {
          // Alternativa si el formato no coincide exactamente
          const valores = resultado.replace(/[\[\];]/g, ' ').trim().split(/\s+/);
          valoresArray = valores.filter(val => !isNaN(parseFloat(val))).map(val => parseFloat(val));
        }
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
  }

  return (
    <CalculatorLayout
      title="Método de Gauss Simple"
      description="Resuelve sistemas de ecuaciones lineales mediante eliminación gaussiana, transformando la matriz en forma triangular superior."
      onCalculate={calcularGaussSimple}
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
            placeholder="Ejemplo: [[3, 2, -1], [2, -2, 4], [-1, 0.5, -1]]"
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
            placeholder="Ejemplo: [1, -2, 0]"
          />
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <MathJax>
              {`\\[b = ${renderVectorLatex(vectorB)}\\]`}
            </MathJax>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Sistema de ecuaciones:</p>
        <MathJax>
          {`\\[${renderMatrizLatex(matrizA)}\\cdot\\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix} = ${renderVectorLatex(vectorB)}\\]`}
        </MathJax>
      </div>
    </CalculatorLayout>
  )
}

export default GaussSimple
