import { Link } from "react-router-dom"
import "./HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="blur-effect top-left"></div>
        <div className="blur-effect bottom-right"></div>

        <div className="hero-content">
          <div className="logo-section">
            <h1>ASA</h1>
            <h2>Personalizados</h2>
            <p>Transformando Ideias em Realidade</p>
          </div>

          <div className="cta-section">
            <Link to="/cadastrar" className="cta-button mr-4">
              Cadastrar Cliente
            </Link>
            <Link to="/usuarios" className="cta-button">
              Gerenciar Usuários
            </Link>
          </div>

          <div className="social-icons">
            <a href="#" className="social-icon">
              <span className="icon-instagram"></span>
            </a>
            <a href="#" className="social-icon">
              <span className="icon-facebook"></span>
            </a>
            <a href="#" className="social-icon">
              <span className="icon-twitter"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

