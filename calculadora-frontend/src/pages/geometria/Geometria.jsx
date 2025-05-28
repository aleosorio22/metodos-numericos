import { Link } from 'react-router-dom'

const Geometria = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Geometría</h1>
      <p className="text-gray-700 mb-6">
        Selecciona el tipo de cálculo geométrico que deseas realizar:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OptionCard 
          title="Volumen" 
          description="Calcular el volumen de diferentes figuras geométricas 3D"
          icon="📦"
          url="/volumen"
        />
        <OptionCard 
          title="Área" 
          description="Calcular el área de diferentes figuras geométricas 2D"
          icon="📏"
          url="/area"
        />
        <OptionCard 
          title="Perímetro" 
          description="Calcular el perímetro de diferentes figuras geométricas 2D"
          icon="⭕"
          url="/perimetro"
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

export default Geometria