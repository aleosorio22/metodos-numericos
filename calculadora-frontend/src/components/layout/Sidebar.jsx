import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState({
    matematicas: true,
    analiticas: false,
    geometria: false,
    calculo: false,
    fisica: false
  })

  const toggleCategory = (category) => {
    setOpenCategories({
      ...openCategories,
      [category]: !openCategories[category]
    })
  }

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="h-full overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {/* Matemáticas Numéricas */}
          <li>
            <button
              onClick={() => toggleCategory('matematicas')}
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 text-left whitespace-nowrap font-semibold">🧮 Matemáticas Numéricas</span>
              <svg className={`w-6 h-6 ${openCategories.matematicas ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            {openCategories.matematicas && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link to="/aritmetica" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Aritmética
                  </Link>
                </li>
                <li>
                  <Link to="/ecuaciones" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Ecuaciones y raíces
                  </Link>
                </li>
                <li>
                  <Link to="/algebra-lineal" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Álgebra lineal
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Funciones Analíticas */}
          <li>
            <button
              onClick={() => toggleCategory('analiticas')}
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 text-left whitespace-nowrap font-semibold">📐 Funciones Analíticas</span>
              <svg className={`w-6 h-6 ${openCategories.analiticas ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            {openCategories.analiticas && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link to="/trigonometria" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Trigonometría
                  </Link>
                </li>
                <li>
                  <Link to="/potencias-raices" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Potencias y raíces
                  </Link>
                </li>
                <li>
                  <Link to="/logaritmos" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Logaritmos
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Geometría */}
          <li>
            <button
              onClick={() => toggleCategory('geometria')}
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 text-left whitespace-nowrap font-semibold">📏 Geometría</span>
              <svg className={`w-6 h-6 ${openCategories.geometria ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            {openCategories.geometria && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link to="/geometria?tipo=volumen" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Volumen
                  </Link>
                </li>
                <li>
                  <Link to="/geometria?tipo=area" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Área
                  </Link>
                </li>
                <li>
                  <Link to="/geometria?tipo=perimetro" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Perímetro
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Cálculo */}
          <li>
            <button
              onClick={() => toggleCategory('calculo')}
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 text-left whitespace-nowrap font-semibold">🧠 Cálculo</span>
              <svg className={`w-6 h-6 ${openCategories.calculo ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            {openCategories.calculo && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link to="/calculo?tipo=derivada" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Derivadas
                  </Link>
                </li>
                <li>
                  <Link to="/calculo?tipo=limite" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Límites
                  </Link>
                </li>
                <li>
                  <Link to="/calculo?tipo=integral" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Integrales
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Gráficas */}
          <li>
            <Link to="/graficas" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
              <span className="flex-1 whitespace-nowrap font-semibold">📈 Funciones gráficas</span>
            </Link>
          </li>

          {/* Física */}
          <li>
            <button
              onClick={() => toggleCategory('fisica')}
              className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 text-left whitespace-nowrap font-semibold">🔬 Física</span>
              <svg className={`w-6 h-6 ${openCategories.fisica ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            {openCategories.fisica && (
              <ul className="py-2 space-y-2">
                <li>
                  <Link to="/fisica?tipo=mrua" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 MRUA
                  </Link>
                </li>
                <li>
                  <Link to="/fisica?tipo=caida-libre" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Caída libre
                  </Link>
                </li>
                <li>
                  <Link to="/fisica?tipo=proyectil" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Proyectil
                  </Link>
                </li>
                <li>
                  <Link to="/fisica?tipo=segunda-ley" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Segunda ley Newton
                  </Link>
                </li>
                <li>
                  <Link to="/fisica?tipo=tercera-ley" className="flex items-center p-2 pl-11 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    📌 Tercera ley Newton
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar