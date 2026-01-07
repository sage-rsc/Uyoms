import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Gallery from './pages/Gallery'

// Component to handle GitHub Pages 404 redirect
function RedirectHandler() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if we have a redirect from 404.html
    // Format: /?/path/to/page or /Uyoms/?/path/to/page
    const search = location.search
    
    // Check for the special redirect format from 404.html
    if (search && search.startsWith('?/')) {
      // Extract the path from ?/path/to/page
      let path = search.slice(2) // Remove '?/'
      
      // Handle query params if present (they come after &)
      const queryIndex = path.indexOf('&')
      if (queryIndex !== -1) {
        path = path.substring(0, queryIndex)
      }
      
      // Decode the path (replace ~and~ with &)
      path = path.replace(/~and~/g, '&')
      
      // Ensure path starts with /
      if (!path.startsWith('/')) {
        path = '/' + path
      }
      
      // Navigate immediately - don't check current path to avoid conflicts
      // Use replace: true to avoid adding to history and clean up the query string
      navigate(path, { replace: true })
    }
  }, [location.search, navigate]) // Run when search changes

  return null
}

function App() {
  // Get base path from vite config (for GitHub Pages)
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  
  return (
    <Router basename={basename}>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* Catch-all route - redirect to home if route not found */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
