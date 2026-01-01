import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
          <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/admin/dashboard" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Home size={20} />
            Go to Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notfound