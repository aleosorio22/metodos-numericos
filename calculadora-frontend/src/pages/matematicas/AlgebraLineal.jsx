import { useSearchParams } from 'react-router-dom'
import GaussSimple from '../../components/metodos-numericos/algebra-lineal/GaussSimple'
import GaussJordan from '../../components/metodos-numericos/algebra-lineal/GaussJordan'
import Inversa from '../../components/metodos-numericos/algebra-lineal/Inversa'
import Cramer from '../../components/metodos-numericos/algebra-lineal/Cramer'
import ResolverEcuacion from '../../components/metodos-numericos/algebra-lineal/ResolverEcuacion'
import ResolverInecuacion from '../../components/metodos-numericos/algebra-lineal/ResolverInecuacion'

const AlgebraLineal = () => {
  const [searchParams] = useSearchParams()
  const metodo = searchParams.get('metodo') || 'gauss-simple'
    const renderCalculator = () => {
    switch (metodo) {
      case 'gauss-simple':
        return <GaussSimple />
      case 'gauss-jordan':
        return <GaussJordan />
      case 'inversa':
        return <Inversa />
      case 'cramer':
        return <Cramer />
      case 'ecuacion':
        return <ResolverEcuacion />
      case 'inecuacion':
        return <ResolverInecuacion />
      default:
        return <GaussSimple />
    }
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Álgebra Lineal</h1>      <div className="mb-6 flex flex-wrap gap-2">
        <MethodButton name="Gauss Simple" method="gauss-simple" current={metodo} />
        <MethodButton name="Gauss-Jordan" method="gauss-jordan" current={metodo} />
        <MethodButton name="Método de la Inversa" method="inversa" current={metodo} />
        <MethodButton name="Método de Cramer" method="cramer" current={metodo} />
        <MethodButton name="Resolver Ecuación" method="ecuacion" current={metodo} />
        <MethodButton name="Resolver Inecuación" method="inecuacion" current={metodo} />
      </div>
      
      {renderCalculator()}
    </div>
  )
}

const MethodButton = ({ name, method, current }) => {
  const isActive = method === current
  
  return (
    <a 
      href={`/algebra-lineal?metodo=${method}`}
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

export default AlgebraLineal