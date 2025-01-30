import "./UserModal.css"
import { useState } from "react"

function UserModal({ user, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    id: user.id,
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
    data_nascimento: user.data_nascimento,
    telefone: user.telefone,
    endereco: user.endereco,
    cidade: user.cidade,
    estado: user.estado,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave(formData)
  }

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await onDelete(user.id)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} required />
          </div>

          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={handleDelete}>
              Excluir
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal

