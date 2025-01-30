import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import UserList from "../components/UserList"
import UserModal from "../components/UserModal"
import "./UserManagement.css"

function UserManagement() {
  const BASE_URL = "http://localhost/sistema-cadastro-cliente/backend"

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/listar.php`)
      if (!response.ok) throw new Error("Erro ao carregar usuários")
      const data = await response.json()
      if (data.success) {
        setUsers(data.data)
        setFilteredUsers(data.data)
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
      alert("Erro ao carregar usuários. Por favor, tente novamente.")
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    const filtered = users.filter(
      (user) =>
        user.nome.toLowerCase().includes(term.toLowerCase()) || user.cpf.includes(term) || user.telefone.includes(term),
    )
    setFilteredUsers(filtered)
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleSaveUser = async (updatedUser) => {
    try {
      const response = await fetch(`${BASE_URL}/atualizar.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedUser.id,
          nome: updatedUser.nome,
          email: updatedUser.email,
          cpf: updatedUser.cpf,
          data_nascimento: updatedUser.data_nascimento,
          telefone: updatedUser.telefone,
          endereco: updatedUser.endereco,
          cidade: updatedUser.cidade,
          estado: updatedUser.estado,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar usuário")
      }

      if (data.success) {
        // Update local state
        const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        setUsers(updatedUsers)
        setFilteredUsers(updatedUsers)
        handleCloseModal()
        alert("Usuário atualizado com sucesso!")
        // Refresh the users list
        await fetchUsers()
      } else {
        throw new Error(data.message || "Erro ao atualizar usuário")
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      alert(error.message || "Erro ao atualizar usuário. Por favor, tente novamente.")
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/excluir.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erro ao excluir usuário")
      }

      if (data.success) {
        // Update local state
        const updatedUsers = users.filter((user) => user.id !== userId)
        setUsers(updatedUsers)
        setFilteredUsers(updatedUsers)
        handleCloseModal()
        alert("Usuário excluído com sucesso!")
        // Refresh the users list
        await fetchUsers()
      } else {
        throw new Error(data.message || "Erro ao excluir usuário")
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error)
      alert(error.message || "Erro ao excluir usuário. Por favor, tente novamente.")
    }
  }

  return (
    <div className="user-management">
      <Navbar onSearch={handleSearch} />
      <main className="main-content">
        <UserList users={filteredUsers} onUserSelect={handleUserSelect} />
        {isModalOpen && selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={handleCloseModal}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser}
          />
        )}
      </main>
    </div>
  )
}

export default UserManagement

