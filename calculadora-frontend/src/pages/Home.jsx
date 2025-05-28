import { Link } from 'react-router-dom'

const Home = () => {
  const categories = [
    {
      title: "🧮 Matemáticas Numéricas",
      description: "Aritmética, ecuaciones, raíces y álgebra lineal",
      links: [
        { name: "Aritmética", path: "/aritmetica" },
        { name: "Ecuaciones y raíces", path: "/ecuaciones" },
        { name: "Álgebra lineal", path: "/algebra-lineal" }
      ],
      color: "bg-blue-100 border-blue-500"
    },
    {
      title: "📐 Funciones Analíticas",
      description: "Trigonometría, potencias, raíces y logaritmos",
      links: [
        { name: "Trigonometría", path: "/trigonometria" },
        { name: "Potencias y raíces", path: "/potencias-raices" },
        { name: "Logaritmos", path: "/logaritmos" }
      ],
      color: "bg-green-100 border-green-500"
    },
    {
      title: "📏 Geometría",
      description: "Cálculos de volumen, área y perímetro",
      links: [
        { name: "Volumen", path: "/geometria?tipo=volumen" },
        { name: "Área", path: "/geometria?tipo=area" },
        { name: "Perímetro", path: "/geometria?tipo=perimetro" }
      ],
      color: "bg-yellow-100 border-yellow-500"
    },
    {
      title: "🧠 Cálculo",
      description: "Derivadas, límites e integrales",
      links: [
        { name: "Derivadas", path: "/calculo?tipo=derivada" },
        { name: "Límites", path: "/calculo?tipo=limite" },
        { name: "Integrales", path: "/calculo?tipo=integral" }
      ],
      color: "bg-purple-100 border-purple-500"
    },
    {
      title: "📈 Funciones gráficas",
      description: "Visualización de funciones matemáticas",
      links: [
        { name: "Graficar funciones", path: "/graficas" }
      ],
      color: "bg-red-100 border-red-500"
    },
    {
      title: "🔬 Física",
      description: "Cinemática y Leyes de Newton",
      links: [
        { name: "MRUA", path: "/fisica?tipo=mrua" },
        { name: "Caída libre", path: "/fisica?tipo=caida-libre" },
        { name: "Proyectil", path: "/fisica?tipo=proyectil" },
        { name: "Segunda ley Newton", path: "/fisica?tipo=segunda-ley" },
        { name: "Tercera ley Newton", path: "/fisica?tipo=tercera-ley" }
      ],
      color: "bg-indigo-100 border-indigo-500"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculadora de Métodos Numéricos</h1>
        <p className="text-xl text-gray-600">
          Una herramienta completa para resolver problemas matemáticos, físicos y de ingeniería
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className={`border-l-4 rounded-lg shadow-md overflow-hidden ${category.color}`}>
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <Link 
                    key={linkIndex} 
                    to={link.path}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    → {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home