import { useSearchParams } from 'react-router-dom'
import Biseccion from '../../components/metodos-numericos/ecuaciones/Biseccion'
import Newton from '../../components/metodos-numericos/ecuaciones/Newton'
import Secante from '../../components/metodos-numericos/ecuaciones/Secante'
import SecanteModificada from '../../components/metodos-numericos/ecuaciones/SecanteModificada'
import RaicesMultiples from '../../components/metodos-numericos/ecuaciones/RaicesMultiples'
import Muller from '../../components/metodos-numericos/ecuaciones/Muller'
import GaussSeidel from '../../components/metodos-numericos/ecuaciones/GaussSeidel'

const Ecuaciones = () => {  const [searchParams] = useSearchParams()
  const metodo = searchParams.get('metodo') || 'biseccion'
  const renderCalculator = () => {
    switch (metodo) {
      case 'biseccion':
        return <Biseccion />
      case 'newton':
        return <Newton />
      case 'secante':
        return <Secante />
      case 'secante-modificada':
        return <SecanteModificada />
      case 'raices-multiples':
        return <RaicesMultiples />
      case 'gauss-seidel':
        return <GaussSeidel />
      case 'muller':
        return <Muller />
      default:
        return <Biseccion />
    }
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ecuaciones y Raíces</h1>
      <div className="mb-6 flex flex-wrap gap-2">
        <MethodButton name="Bisección" method="biseccion" current={metodo} />
        <MethodButton name="Newton-Raphson" method="newton" current={metodo} />
        <MethodButton name="Secante" method="secante" current={metodo} />
        <MethodButton name="Secante Modificada" method="secante-modificada" current={metodo} />
        <MethodButton name="Raíces Múltiples" method="raices-multiples" current={metodo} />
        <MethodButton name="Gauss-Seidel" method="gauss-seidel" current={metodo} />
        <MethodButton name="Müller" method="muller" current={metodo} />
      </div>
      
      {renderCalculator()}
    </div>
  )
}

const MethodButton = ({ name, method, current }) => {
  const isActive = method === current
  
  return (
    <a 
      href={`/ecuaciones?metodo=${method}`}
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

export default Ecuaciones