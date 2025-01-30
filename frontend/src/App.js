import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserManagement from "./pages/UserManagement"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="main-nav">
          <div className="nav-brand">ASA Personalizados</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/usuarios">Gerenciar Usuários</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

