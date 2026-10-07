import { useState } from 'react'
import StatCard from '../components/StatCard'

function Dashboard() {

  const [books] = useState(() => {
    const savedBooks = localStorage.getItem('books')

    return savedBooks ? JSON.parse(savedBooks) : []
  })

  const [users] = useState(() => {
    const savedUsers = localStorage.getItem('users')

    return savedUsers ? JSON.parse(savedUsers) : []
  })

  const totalBooks = books.length

  const totalQuantity = books.reduce(
    (total, book) => total + Number(book.quantity),
    0
  )

  const lowStockBooks = books.filter(
    (book) => Number(book.quantity) < 2
  )

  return (
    <div>

      <h2>Dashboard</h2>

      <div className="cards">

  <StatCard
    title="Total Books"
    value={totalBooks}
  />

  <StatCard
    title="Books Available"
    value={totalQuantity}
  />

  <StatCard
    title="Low Stock"
    value={lowStockBooks.length}
  />

  <StatCard
    title="Total Users"
    value={users.length}
  />

</div>

      <h2>Book Availability</h2>

      {books.length === 0 ? (

        <p>No books have been added yet.</p>

      ) : (

        <table>

          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {books.map((book) => (

              <tr key={book.id}>

                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.genre}</td>

                <td>{book.quantity}</td>

                <td
                  className={
                  book.quantity < 2
                  ? 'low-stock'
                  : 'available'
                }
                >
                {book.quantity < 2
                  ? 'Low Stock'
                : 'Available'}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  )
}

export default Dashboard