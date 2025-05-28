import { Routes, Route } from 'react-router-dom'
import { MathJaxContext } from 'better-react-mathjax'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Importaciones de páginas de calculadoras
import Aritmetica from './pages/matematicas/Aritmetica'
import Ecuaciones from './pages/matematicas/Ecuaciones'
import AlgebraLineal from './pages/matematicas/AlgebraLineal'
import Trigonometria from './pages/analiticas/Trigonometria'
import PotenciasRaices from './pages/analiticas/PotenciasRaices'
import Logaritmos from './pages/analiticas/Logaritmos'
import Geometria from './pages/geometria/Geometria'
import Volumen from './pages/geometria/Volumen'
import Area from './pages/geometria/Area'
import Perimetro from './pages/geometria/Perimetro'
import Calculo from './pages/calculo/Calculo'
import Derivadas from './pages/calculo/Derivadas'
import Integrales from './pages/calculo/Integrales'
import Limites from './pages/calculo/Limites'
import Graficas from './pages/graficas/Graficas'
// Importaciones de páginas de física
import MRUA from './pages/fisica/MRUA'
import CaidaLibre from './pages/fisica/CaidaLibre'
import Proyectil from './pages/fisica/Proyectil'
import SegundaLey from './pages/fisica/SegundaLey'
import TerceraLey from './pages/fisica/TerceraLey'

function App() {
  const config = {
    loader: { load: ['[tex]/html'] },
    tex: {
      packages: { '[+]': ['html'] },
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)']
      ],
      displayMath: [
        ['$$', '$$'],
        ['\\[', '\\]']
      ]
    }
  }

  return (
    <MathJaxContext config={config}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Rutas de Matemáticas Numéricas */}
          <Route path="aritmetica" element={<Aritmetica />} />
          <Route path="ecuaciones" element={<Ecuaciones />} />
          <Route path="algebra-lineal" element={<AlgebraLineal />} />
          
          {/* Rutas de Funciones Analíticas */}
          <Route path="trigonometria" element={<Trigonometria />} />
          <Route path="potencias-raices" element={<PotenciasRaices />} />
          <Route path="logaritmos" element={<Logaritmos />} />
          
          {/* Rutas de Geometría */}
          <Route path="geometria" element={<Geometria />} />
          <Route path="volumen" element={<Volumen />} />
          <Route path="area" element={<Area />} />
          <Route path="perimetro" element={<Perimetro />} />
          
          {/* Rutas de Cálculo */}
          <Route path="calculo" element={<Calculo />} />
          <Route path="derivadas" element={<Derivadas />} />
          <Route path="integrales" element={<Integrales />} />
          <Route path="limites" element={<Limites />} />
          
          {/* Rutas de Gráficas */}
          <Route path="graficas" element={<Graficas />} />
          
          {/* Rutas de Física */}
          <Route path="mrua" element={<MRUA />} />
          <Route path="caida-libre" element={<CaidaLibre />} />
          <Route path="proyectil" element={<Proyectil />} />
          <Route path="segunda-ley" element={<SegundaLey />} />
          <Route path="tercera-ley" element={<TerceraLey />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MathJaxContext>
  )
}

export default App
