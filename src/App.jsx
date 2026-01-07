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
    // Format: /?/path/to/page
    const search = location.search
    if (search && search.startsWith('?/')) {
      // Extract the path from ?/path/to/page
      let path = search.slice(2) // Remove '?/'
      
      // Handle query params and hash if present
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
      
      // Navigate to the decoded path (only if different from current)
      if (path !== location.pathname) {
        navigate(path, { replace: true })
      }
    }
  }, [location.search, location.pathname, navigate])

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
