import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Página no encontrada</h2>
      <p className="text-lg text-gray-600 mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound