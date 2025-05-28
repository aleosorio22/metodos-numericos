import { useState } from 'react'
import axios from 'axios'
import { MathJax } from 'better-react-mathjax'
import CalculatorLayout from '../../components/common/CalculatorLayout'
import Spinner from '../../components/common/Spinner'

const API_URL = import.meta.env.VITE_API_URL

const Volumen = () => {
  const [figura, setFigura] = useState('cubo')
  const [lado, setLado] = useState(5)
  const [radio, setRadio] = useState(3)
  const [altura, setAltura] = useState(4)
  const [largo, setLargo] = useState(5)
  const [ancho, setAncho] = useState(4)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const calcularVolumen = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Preparar los parámetros según el tipo de figura
      let parametros = []
      
      switch (figura) {
        case 'cubo':
          parametros = [parseFloat(lado)]
          break
        case 'esfera':
          parametros = [parseFloat(radio)]
          break
        case 'cilindro':
        case 'cono':
          parametros = [parseFloat(radio), parseFloat(altura)]
          break
        case 'prisma':
          parametros = [parseFloat(largo), parseFloat(ancho), parseFloat(altura)]
          break
        default:
          break
      }
      
      const response = await axios.post(`${API_URL}/volumen`, {
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
      case 'cubo': 
        return `V = l^3 = ${lado}^3`
      case 'esfera': 
        return `V = \\frac{4}{3} \\pi r^3 = \\frac{4}{3} \\pi \\cdot ${radio}^3`
      case 'cilindro': 
        return `V = \\pi r^2 h = \\pi \\cdot ${radio}^2 \\cdot ${altura}`
      case 'cono': 
        return `V = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\pi \\cdot ${radio}^2 \\cdot ${altura}`
      case 'prisma': 
        return `V = l \\cdot a \\cdot h = ${largo} \\cdot ${ancho} \\cdot ${altura}`
      default: 
        return ''
    }
  };

  const getImagenFigura = () => {
    switch (figura) {
      case 'cubo': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Uniform_polyhedron-43-t0.svg/240px-Uniform_polyhedron-43-t0.svg.png'
      case 'esfera': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sphere_wireframe_10deg_6r.svg/240px-Sphere_wireframe_10deg_6r.svg.png'
      case 'cilindro': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Cylindrical_wedge.svg/240px-Cylindrical_wedge.svg.png'
      case 'cono': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cone_3d.svg/240px-Cone_3d.svg.png'
      case 'prisma': 
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Prism.svg/240px-Prism.svg.png'
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
                  {`\\[V = ${valorNumerico.toFixed(6)} \\, \\text{u}^3\\]`}
                </MathJax>
                <p className="text-sm text-gray-600 mt-1">
                  (Unidades cúbicas, donde u es la unidad de medida que estés utilizando)
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
                    Volumen calculado: <span className="font-mono">{valorNumerico.toFixed(6)}</span> unidades cúbicas
                  </p>
                </div>
                {getImagenFigura() && (
                  <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                    <img 
                      src={getImagenFigura()} 
                      alt={`${figura} en 3D`} 
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
      case 'cubo':
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
      
      case 'esfera':
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
              placeholder="Radio de la esfera"
              step="any"
            />
          </div>
        );
      
      case 'cilindro':
      case 'cono':
        return (
          <div className="space-y-4">
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
                placeholder="Radio de la base"
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
      
      case 'prisma':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="largo">
                Largo
              </label>
              <input
                id="largo"
                type="number"
                value={largo}
                onChange={(e) => setLargo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Largo del prisma"
                step="any"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ancho">
                Ancho
              </label>
              <input
                id="ancho"
                type="number"
                value={ancho}
                onChange={(e) => setAncho(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ancho del prisma"
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
                placeholder="Altura del prisma"
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
      title="Cálculo de Volumen"
      description="Calcula el volumen de diferentes figuras geométricas tridimensionales."
      onCalculate={calcularVolumen}
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
            <option value="cubo">Cubo</option>
            <option value="esfera">Esfera</option>
            <option value="cilindro">Cilindro</option>
            <option value="cono">Cono</option>
            <option value="prisma">Prisma rectangular</option>
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
        <p className="text-sm text-blue-700 mb-1">Información sobre el volumen:</p>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          {figura === 'cubo' && (
            <>
              <li>El cubo tiene todas sus aristas de igual longitud.</li>
              <li>Su volumen es el lado elevado al cubo (l³).</li>
            </>
          )}
          {figura === 'esfera' && (
            <>
              <li>La esfera es el conjunto de puntos equidistantes de un punto central.</li>
              <li>Su volumen es (4/3) · π · r³, donde r es el radio.</li>
            </>
          )}
          {figura === 'cilindro' && (
            <>
              <li>El cilindro es un cuerpo geométrico formado por una superficie lateral curva y dos bases circulares paralelas.</li>
              <li>Su volumen es π · r² · h, donde r es el radio de la base y h es la altura.</li>
            </>
          )}
          {figura === 'cono' && (
            <>
              <li>El cono es un cuerpo geométrico que tiene una base circular y un vértice.</li>
              <li>Su volumen es (1/3) · π · r² · h, donde r es el radio de la base y h es la altura.</li>
            </>
          )}
          {figura === 'prisma' && (
            <>
              <li>El prisma rectangular tiene seis caras, todas rectangulares.</li>
              <li>Su volumen es largo · ancho · altura.</li>
              <li>Es equivalente a un cuboide o paralelepípedo rectangular.</li>
            </>
          )}
        </ul>
      </div>
    </CalculatorLayout>
  );
};

export default Volumen
