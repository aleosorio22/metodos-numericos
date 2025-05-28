import { Link } from 'react-router-dom'

const Calculo = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cálculo Diferencial e Integral</h1>
      <p className="text-gray-700 mb-6">
        Selecciona la operación de cálculo que deseas realizar:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptionCard 
          title="Derivadas" 
          description="Calcular derivadas de funciones matemáticas"
          icon="ƒ'"
          url="/derivadas"
        />
        <OptionCard 
          title="Integrales" 
          description="Calcular integrales definidas e indefinidas"
          icon="∫"
          url="/integrales"
        />
        <OptionCard 
          title="Límites" 
          description="Calcular límites de funciones"
          icon="lim"
          url="/limites"
        />
      </div>
    </div>
  )
}

const OptionCard = ({ title, description, icon, url }) => {
  return (
    <Link to={url} className="block hover:no-underline">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
}

export default Calculo