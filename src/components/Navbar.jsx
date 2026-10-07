import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/books">Books</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/users">Users</Link>
    </nav>
  )
}

export default Navbar