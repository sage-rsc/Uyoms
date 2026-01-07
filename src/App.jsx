import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Gallery from './pages/Gallery'

function App() {
  // Get base path from vite config (for GitHub Pages)
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
