import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Area = () => {
  const [figura, setFigura] = useState('cuadrado')
  const [lado, setLado] = useState(5)
  const [base, setBase] = useState(6)
  const [altura, setAltura] = useState(4)
  const [radio, setRadio] = useState(3)
  const [baseMayor, setBaseMayor] = useState(8)
  const [baseMenor, setBaseMenor] = useState(5)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularArea = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Preparar los parámetros según el tipo de figura
      let parametros = []
      
      switch (figura) {
        case 'cuadrado':
          parametros = [parseFloat(lado)]
          break
        case 'rectangulo':
        case 'triangulo':
        case 'paralelogramo':
          parametros = [parseFloat(base), parseFloat(altura)]
          break
        case 'circulo':
          parametros = [parseFloat(radio)]
          break
        case 'trapecio':
          parametros = [parseFloat(baseMayor), parseFloat(baseMenor), parseFloat(altura)]
          break
        default:
          break
      }
      
      const response = await axios.post(`${API_URL}/area`, {
        figura,
        parametros
      });
      
      setResultado(response.data.resultado);
    } catch (err) {
      console.error('Error al calcular:', err);
      setError(err.response?.data?.error || err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const getFormulaLatex = () => {
    switch (figura) {
      case 'cuadrado': 
        return `A = l^2 = ${lado}^2`
      case 'rectangulo': 
        return `A = b \\cdot h = ${base} \\cdot ${altura}`
      case 'triangulo': 
        return `A = \\frac{1}{2} \\cdot b \\cdot h = \\frac{1}{2} \\cdot ${base} \\cdot ${altura}`
      case 'circulo': 
        return `A = \\pi r^2 = \\pi \\cdot ${radio}^2`
      case 'trapecio': 
        return `A = \\frac{(B + b) \\cdot h}{2} = \\frac{(${baseMayor} + ${baseMenor}) \\cdot ${altura}}{2}`
      case 'paralelogramo': 
        return `A = b \\cdot h = ${base} \\cdot ${altura}`
      default: 
        return ''
    }
  };

  const getImagenFigura = () => {
    switch (figura) {
      case 'cuadrado': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Square_-_black_simple.svg/240px-Square_-_black_simple.svg.png'
      case 'rectangulo': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rectangle_-_black_simple.svg/240px-Rectangle_-_black_simple.svg.png'
      case 'triangulo': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/240px-Regular_triangle.svg.png'
      case 'circulo': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/240px-Circle_-_black_simple.svg.png'
      case 'trapecio': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Trapezoid_-_angles.svg/240px-Trapezoid_-_angles.svg.png'
      case 'paralelogramo': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Parallelogram_-_angles.svg/240px-Parallelogram_-_angles.svg.png'
      default: 
        return ''
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
                  {`\\[A = ${valorNumerico.toFixed(6)} \\, \\text{u}^2\\]`}
                </MathJax>
                <p className="text-sm text-gray-600 mt-1">
                  (Unidades cuadradas, donde u es la unidad de medida que estés utilizando)
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Fórmula aplicada:</p>
                  <MathJax>
                    {`\\[${getFormulaLatex()}\\]`}
                  </MathJax>
                  <p className="text-sm text-gray-600 mt-2">
                    Área calculada: <span className="font-mono">{valorNumerico.toFixed(6)}</span> unidades cuadradas
                  </p>
                </div>
                {getImagenFigura() && (
                  <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                    <img 
                      src={getImagenFigura()} 
                      alt={`${figura} en 2D`} 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                )}
              </div>
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

  const renderCamposSegunFigura = () => {
    switch (figura) {
      case 'cuadrado':
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lado">
              Longitud del lado
            </label>
            <input
              id="lado"
              type="number"
              value={lado}
              onChange={(e) => setLado(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Longitud del lado"
              step="any"
            />
          </div>
        );
      
      case 'circulo':
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="radio">
              Radio
            </label>
            <input
              id="radio"
              type="number"
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Radio del círculo"
              step="any"
            />
          </div>
        );
      
      case 'rectangulo':
      case 'paralelogramo':
      case 'triangulo':
        return (
          <div className="space-y-4">
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
                placeholder="Base"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altura">
                Altura
              </label>
              <input
                id="altura"
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Altura"
                step="any"
              />
            </div>
          </div>
        );
      
      case 'trapecio':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="baseMayor">
                Base mayor
              </label>
              <input
                id="baseMayor"
                type="number"
                value={baseMayor}
                onChange={(e) => setBaseMayor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Base mayor"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="baseMenor">
                Base menor
              </label>
              <input
                id="baseMenor"
                type="number"
                value={baseMenor}
                onChange={(e) => setBaseMenor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Base menor"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altura">
                Altura
              </label>
              <input
                id="altura"
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Altura"
                step="any"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <CalculatorLayout
      title="Cálculo de Área"
      description="Calcula el área de diferentes figuras geométricas planas."
      onCalculate={calcularArea}
      result={renderResultado()}
    >
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="figura">
            Selecciona la figura
          </label>
          <select
            id="figura"
            value={figura}
            onChange={(e) => setFigura(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="cuadrado">Cuadrado</option>
            <option value="rectangulo">Rectángulo</option>
            <option value="triangulo">Triángulo</option>
            <option value="circulo">Círculo</option>
            <option value="trapecio">Trapecio</option>
            <option value="paralelogramo">Paralelogramo</option>
          </select>
        </div>

        <div>
          {renderCamposSegunFigura()}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Fórmula a utilizar:</p>
        <MathJax>
          {`\\[${getFormulaLatex()}\\]`}
        </MathJax>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 mb-1">Información sobre el área:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          {figura === 'cuadrado' && (
            <>
              <li>El cuadrado tiene todos sus lados iguales y sus ángulos rectos.</li>
              <li>Su área se calcula como el lado al cuadrado (l²).</li>
            </>
          )}
          {figura === 'rectangulo' && (
            <>
              <li>El rectángulo tiene lados opuestos iguales y paralelos, con ángulos rectos.</li>
              <li>Su área es el producto de la base por la altura (b · h).</li>
            </>
          )}
          {figura === 'triangulo' && (
            <>
              <li>El triángulo es un polígono de tres lados.</li>
              <li>Su área es la mitad del producto de la base por la altura (b · h / 2).</li>
            </>
          )}
          {figura === 'circulo' && (
            <>
              <li>El círculo es el conjunto de puntos equidistantes a un punto central.</li>
              <li>Su área es π multiplicado por el radio al cuadrado (π · r²).</li>
            </>
          )}
          {figura === 'trapecio' && (
            <>
              <li>El trapecio es un cuadrilátero con dos lados paralelos.</li>
              <li>Su área es la semisuma de las bases multiplicada por la altura: (B + b) · h / 2.</li>
            </>
          )}
          {figura === 'paralelogramo' && (
            <>
              <li>El paralelogramo tiene lados opuestos paralelos.</li>
              <li>Su área es el producto de la base por la altura (b · h).</li>
            </>
          )}
        </ul>
      </div>
    </CalculatorLayout>
  );
};

export default Area;