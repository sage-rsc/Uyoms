import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Handle GitHub Pages 404 redirect BEFORE React Router loads
// This ensures the redirect happens before any routing logic
(function() {
  const search = window.location.search
  if (search && search.startsWith('?/')) {
    // Extract the path from ?/path/to/page
    let path = search.slice(2) // Remove '?/'
    
    // Handle query params if present
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
    
    // Get basename from current pathname (e.g., /Uyoms/)
    const pathname = window.location.pathname
    const basename = pathname.split('/').slice(0, 2).join('/') || '/'
    
    // Update the URL without reloading (React Router will handle it)
    const newUrl = basename + path + window.location.hash
    window.history.replaceState({}, '', newUrl)
  }
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

