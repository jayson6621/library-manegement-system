import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Transactions from './pages/Transactions'
import Users from './pages/Users'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <header>
          <h1>Community Library</h1>
          <p>Library Management System</p>
        </header>

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>

        <footer>
         <p>Selefo's Community Library</p>
         <p>Library Management System</p>
        </footer>

      </div>
    </BrowserRouter>
  )
}

export default App