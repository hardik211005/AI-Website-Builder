import { Route, Routes, useLocation } from 'react-router-dom'
import Community from './pages/Community'
import Home from './pages/Home'
import MyProjects from './pages/MyProjects'
import Preview from './pages/Preview'
import Pricing from './pages/Pricing'
import Projects from './pages/Projects'
import View from './pages/View'
import Navbar from './components/Navbar'
import { Toaster } from "sonner"

const App = () => {
  const {pathname} = useLocation()
  const hideNavbar = pathname.startsWith('/projects/') && pathname !== '/projects'
  || pathname.startsWith('/preview/')
  || pathname === ('/view')
  return (
    <div>
      <Toaster/>
      {!hideNavbar && <Navbar/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/view" element={<View />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </div>
  )
}

export default App
