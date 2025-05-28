import React from 'react'

const Spinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          animate-spin
          rounded-full
          border-4
          border-blue-200
          border-t-blue-600
          ${sizeClasses[size]}
          ${className}
        `}
      />
    </div>
  )
}

export default Spinner