import { useEffect, useState } from 'react'

function Transactions() {

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books')

    return savedBooks ? JSON.parse(savedBooks) : []
  })

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions')

    return savedTransactions ? JSON.parse(savedTransactions) : []
  })

  const [selectedBook, setSelectedBook] = useState('')
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState('borrow')

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  useEffect(() => {
    localStorage.setItem(
      'transactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  const handleTransaction = (event) => {
    event.preventDefault()

    const book = books.find(
      (book) => book.id === Number(selectedBook)
    )

    if (!book) {
      alert('Please select a book.')
      return
    }

    const transactionAmount = Number(amount)

    if (transactionAmount <= 0) {
      alert('Enter a valid quantity.')
      return
    }

    if (
      action === 'borrow' &&
      transactionAmount > book.quantity
    ) {
      alert('There are not enough copies available.')
      return
    }

    let newQuantity

    if (action === 'borrow') {
      newQuantity = book.quantity - transactionAmount
    } else {
      newQuantity = book.quantity + transactionAmount
    }

    const updatedBooks = books.map((book) =>
      book.id === Number(selectedBook)
        ? {
            ...book,
            quantity: newQuantity
          }
        : book
    )

    setBooks(updatedBooks)

    const newTransaction = {
      id: Date.now(),
      bookTitle: book.title,
      action: action === 'borrow'
        ? 'Borrowed'
        : 'Stock Added',
      quantity: transactionAmount,
      date: new Date().toLocaleString()
    }

    setTransactions([
      newTransaction,
      ...transactions
    ])

    setSelectedBook('')
    setAmount('')
  }

  return (
    <div>

      <h2>Transactions</h2>

      <form
        onSubmit={handleTransaction}
        className="book-form"
      >

        <div>
          <label>Book</label>

          <select
            value={selectedBook}
            onChange={(event) =>
              setSelectedBook(event.target.value)
            }
            required
          >
            <option value="">Select a book</option>

            {books.map((book) => (
              <option
                key={book.id}
                value={book.id}
              >
                {book.title}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Transaction Type</label>

          <select
            value={action}
            onChange={(event) =>
              setAction(event.target.value)
            }
          >
            <option value="borrow">
              Borrow Book
            </option>

            <option value="add">
              Add Stock
            </option>
          </select>
        </div>

        <div>
          <label>Quantity</label>

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) =>
              setAmount(event.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Record Transaction
        </button>

      </form>

      <h2>Transaction History</h2>

      {transactions.length === 0 ? (

        <p>No transactions recorded yet.</p>

      ) : (

        <table>

          <thead>
            <tr>
              <th>Book</th>
              <th>Action</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((transaction) => (

              <tr key={transaction.id}>

                <td>{transaction.bookTitle}</td>

                <td>{transaction.action}</td>

                <td>{transaction.quantity}</td>

                <td>{transaction.date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  )
}

export default Transactions