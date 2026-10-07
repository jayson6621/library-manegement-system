import { useEffect, useState } from 'react'

function Books() {

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books')

    if (savedBooks) {
      return JSON.parse(savedBooks)
    }

    return []
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [isbn, setIsbn] = useState('')
  const [quantity, setQuantity] = useState('')

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  const handleSubmit = (event) => {
      event.preventDefault()

      const duplicateISBN = books.some(
       (book) =>
          book.isbn === isbn &&
          book.id !== editingId
  )

  if (duplicateISBN) {
    alert('A book with this ISBN already exists.')
    return
  }

  if (editingId) {

      setBooks(
        books.map((book) =>
          book.id === editingId
            ? {
                ...book,
                title,
                author,
                genre,
                isbn,
                quantity: Number(quantity)
              }
            : book
        )
      )

      setEditingId(null)

    } else {

      const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        isbn,
        quantity: Number(quantity)
      }

      setBooks([...books, newBook])
    }

    clearForm()
  }

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setGenre('')
    setIsbn('')
    setQuantity('')
  }

  const deleteBook = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    )

    if (confirmDelete) {
      setBooks(books.filter((book) => book.id !== id))
    }
  }

  const editBook = (book) => {
    setEditingId(book.id)

    setTitle(book.title)
    setAuthor(book.author)
    setGenre(book.genre)
    setIsbn(book.isbn)
    setQuantity(book.quantity)
  }

  return (
    <div>

      <h2>Book Management</h2>

      <form onSubmit={handleSubmit} className="book-form">

        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            required
          />
        </div>

        <div>
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Initial Quantity</label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>

        <button type="submit">
          {editingId ? 'Update Book' : 'Add Book'}
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

      <h2>Library Books</h2>

      {books.length === 0 ? (

        <p>No books have been added yet.</p>

      ) : (

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {books.map((book) => (

              <tr key={book.id}>

                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.genre}</td>

                <td>{book.isbn}</td>

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

                <td>
                  <button onClick={() => editBook(book)}>
                    Update
                  </button>

                  <button onClick={() => deleteBook(book.id)}>
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

export default Books