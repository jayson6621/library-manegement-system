import { useState } from 'react'

function Users() {

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users')

    return savedUsers ? JSON.parse(savedUsers) : []
  })

  const [name, setName] = useState('')
  const [membershipId, setMembershipId] = useState('')
  const [role, setRole] = useState('Member')

  const [loginId, setLoginId] = useState('')
  const [loginRole, setLoginRole] = useState('Member')
  const [loggedInUser, setLoggedInUser] = useState(null)

  const [editingId, setEditingId] = useState(null)

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const handleSubmit = (event) => {
   event.preventDefault()

   const duplicateMembershipId = users.some(
    (user) =>
      user.membershipId === membershipId &&
      user.id !== editingId
  )

   if (duplicateMembershipId) {
    alert('A user with this Membership ID already exists.')
    return
  }

  if (editingId) {

      const updatedUsers = users.map((user) =>
        user.id === editingId
          ? {
              ...user,
              name,
              membershipId,
              role
            }
          : user
      )

      saveUsers(updatedUsers)
      setEditingId(null)

    } else {

      const newUser = {
        id: Date.now(),
        name,
        membershipId,
        role
      }

      saveUsers([...users, newUser])
    }

    clearForm()
  }

  const clearForm = () => {
    setName('')
    setMembershipId('')
    setRole('Member')
  }

  const editUser = (user) => {
    setEditingId(user.id)

    setName(user.name)
    setMembershipId(user.membershipId)
    setRole(user.role)
  }

  const deleteUser = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    )

    if (confirmDelete) {
      const updatedUsers = users.filter(
        (user) => user.id !== id
      )

      saveUsers(updatedUsers)
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const user = users.find(
      (user) =>
        user.membershipId === loginId &&
        user.role === loginRole
    )

    if (user) {
      setLoggedInUser(user)
    } else {
      alert('User not found. Check the membership ID and role.')
    }
  }

  const logout = () => {
    setLoggedInUser(null)
    setLoginId('')
  }

  return (
    <div>

      <h2>User Management</h2>

      {/* LOGIN */}

      <div className="login-box">

        <h3>User Login</h3>

        {loggedInUser ? (

          <div>
            <p>
              Welcome, <strong>{loggedInUser.name}</strong>
            </p>

            <p>
              Role: {loggedInUser.role}
            </p>

            <button onClick={logout}>
              Logout
            </button>
          </div>

        ) : (

          <form onSubmit={handleLogin}>

            <div>
              <label>Membership ID</label>

              <input
                type="text"
                value={loginId}
                onChange={(event) =>
                  setLoginId(event.target.value)
                }
                required
              />
            </div>

            <div>
              <label>Role</label>

              <select
                value={loginRole}
                onChange={(event) =>
                  setLoginRole(event.target.value)
                }
              >
                <option value="Member">
                  Member
                </option>

                <option value="Librarian">
                  Librarian
                </option>

                <option value="Admin">
                  Admin
                </option>
              </select>
            </div>

            <button type="submit">
              Login
            </button>

          </form>

        )}

      </div>


      {/* ADD / UPDATE USER */}

      <div className="login-box">

        <h3>
          {editingId
            ? 'Update User'
            : 'Add New User'}
        </h3>

        <form onSubmit={handleSubmit}>

          <div>
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div>
            <label>Membership ID</label>

            <input
              type="text"
              value={membershipId}
              onChange={(event) =>
                setMembershipId(event.target.value)
              }
              required
            />
          </div>

          <div>
            <label>Role</label>

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >
              <option value="Member">
                Member
              </option>

              <option value="Librarian">
                Librarian
              </option>

              <option value="Admin">
                Admin
              </option>
            </select>
          </div>

          <button type="submit">
            {editingId
              ? 'Update User'
              : 'Add User'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                clearForm()
              }}
            >
              Cancel
            </button>
          )}

        </form>

      </div>


      {/* USER LIST */}

      <h3>Library Users</h3>

      {users.length === 0 ? (

        <p>No users have been added yet.</p>

      ) : (

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.name}</td>

                <td>{user.membershipId}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    onClick={() => editUser(user)}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  )
}

export default Users