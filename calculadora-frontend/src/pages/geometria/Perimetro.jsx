import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Perimetro = () => {
  const [figura, setFigura] = useState('cuadrado')
  const [lado, setLado] = useState(5)
  const [base, setBase] = useState(6)
  const [altura, setAltura] = useState(4)
  const [radio, setRadio] = useState(3)
  const [lado1, setLado1] = useState(3)
  const [lado2, setLado2] = useState(4)
  const [lado3, setLado3] = useState(5)
  const [baseMayor, setBaseMayor] = useState(8)
  const [baseMenor, setBaseMenor] = useState(5)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularPerimetro = async () => {
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
        case 'paralelogramo':
          parametros = [parseFloat(base), parseFloat(altura)]
          break
        case 'triangulo':
          parametros = [parseFloat(lado1), parseFloat(lado2), parseFloat(lado3)]
          break
        case 'circulo':
          parametros = [parseFloat(radio)]
          break
        case 'trapecio':
          // Para trapecio: lado1, lado2, base mayor, base menor
          parametros = [parseFloat(lado1), parseFloat(lado2), parseFloat(baseMayor), parseFloat(baseMenor)]
          break
        default:
          break
      }
      
      const response = await axios.post(`${API_URL}/perimetro`, {
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
        return `P = 4 \\cdot l = 4 \\cdot ${lado}`
      case 'rectangulo': 
        return `P = 2(b + h) = 2 \\cdot (${base} + ${altura})`
      case 'triangulo': 
        return `P = a + b + c = ${lado1} + ${lado2} + ${lado3}`
      case 'circulo': 
        return `P = 2 \\pi r = 2 \\pi \\cdot ${radio}`
      case 'trapecio': 
        return `P = a + b + B + b' = ${lado1} + ${lado2} + ${baseMayor} + ${baseMenor}`
      case 'paralelogramo': 
        return `P = 2(a + b) = 2 \\cdot (${base} + ${altura})`
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
                  {`\\[P = ${valorNumerico.toFixed(6)} \\, \\text{u}\\]`}
                </MathJax>
                <p className="text-sm text-gray-600 mt-1">
                  (Unidades, donde u es la unidad de medida que estés utilizando)
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
                    Perímetro calculado: <span className="font-mono">{valorNumerico.toFixed(6)}</span> unidades
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
      
      case 'triangulo':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lado1">
                Lado 1
              </label>
              <input
                id="lado1"
                type="number"
                value={lado1}
                onChange={(e) => setLado1(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Lado 1"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lado2">
                Lado 2
              </label>
              <input
                id="lado2"
                type="number"
                value={lado2}
                onChange={(e) => setLado2(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Lado 2"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lado3">
                Lado 3
              </label>
              <input
                id="lado3"
                type="number"
                value={lado3}
                onChange={(e) => setLado3(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Lado 3"
                step="any"
              />
            </div>
          </div>
        );
      
      case 'trapecio':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lado1">
                Lado 1
              </label>
              <input
                id="lado1"
                type="number"
                value={lado1}
                onChange={(e) => setLado1(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Lado 1"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lado2">
                Lado 2
              </label>
              <input
                id="lado2"
                type="number"
                value={lado2}
                onChange={(e) => setLado2(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Lado 2"
                step="any"
              />
            </div>
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
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <CalculatorLayout
      title="Cálculo de Perímetro"
      description="Calcula el perímetro de diferentes figuras geométricas planas."
      onCalculate={calcularPerimetro}
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
        <p className="text-sm text-blue-700 mb-1">Información sobre el perímetro:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          {figura === 'cuadrado' && (
            <>
              <li>El perímetro del cuadrado es la suma de las longitudes de todos sus lados.</li>
              <li>Como un cuadrado tiene 4 lados iguales, su perímetro es 4 veces la longitud de uno de sus lados.</li>
            </>
          )}
          {figura === 'rectangulo' && (
            <>
              <li>El perímetro del rectángulo es la suma de las longitudes de todos sus lados.</li>
              <li>Como los lados opuestos son iguales, se puede calcular como 2 veces la suma de la base y la altura.</li>
            </>
          )}
          {figura === 'triangulo' && (
            <>
              <li>El perímetro del triángulo es la suma de las longitudes de sus tres lados.</li>
              <li>Para que un triángulo sea válido, la suma de las longitudes de dos lados cualquiera debe ser mayor que la longitud del tercer lado.</li>
            </>
          )}
          {figura === 'circulo' && (
            <>
              <li>El perímetro del círculo se denomina circunferencia.</li>
              <li>La circunferencia es igual a 2 veces π multiplicado por el radio (o π multiplicado por el diámetro).</li>
            </>
          )}
          {figura === 'trapecio' && (
            <>
              <li>El perímetro del trapecio es la suma de las longitudes de sus cuatro lados.</li>
              <li>Un trapecio tiene dos bases paralelas (mayor y menor) y dos lados no paralelos.</li>
            </>
          )}
          {figura === 'paralelogramo' && (
            <>
              <li>El perímetro del paralelogramo es la suma de las longitudes de todos sus lados.</li>
              <li>Como los lados opuestos son iguales, se puede calcular como 2 veces la suma de dos lados adyacentes.</li>
            </>
          )}
        </ul>
      </div>
    </CalculatorLayout>
  );
};

export default Perimetro;