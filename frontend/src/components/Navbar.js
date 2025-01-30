function Navbar({ onSearch }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Sistema de Cadastro</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por nome, CPF ou telefone"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </nav>
  )
}

export default Navbar

