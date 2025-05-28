const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Calculadora de Métodos Numéricos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer