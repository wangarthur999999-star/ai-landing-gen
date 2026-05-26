import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Generator from './pages/Generator'
import Projects from './pages/Projects'
import Demos from './pages/Demos'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generator" element={<Generator />} />
      <Route path="/demos" element={<Demos />} />
      <Route path="/projects/:slug" element={<Projects />} />
    </Routes>
  )
}
