import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/hero/Hero'
import Team from './components/team/Team'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  )
}

export default App
