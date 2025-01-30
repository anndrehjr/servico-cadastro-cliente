function UserList({ users, onUserSelect }) {
  return (
    <div className="user-list">
      <h2>Usuários Cadastrados</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onUserSelect(user)}>
            <span>{user.nome}</span>
            <span>{user.cpf}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList

