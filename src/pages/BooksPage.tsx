import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'https://bootcamp2025.depster.me';


function BooksPage() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/books?limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data.data);
      setMessage('Knjige dohvaćene!');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  const saveBook = (book) => {
    const updated = [...library, book];
    setLibrary(updated);
    localStorage.setItem('library', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>Knjige</h1>
      <button onClick={fetchBooks}>Dohvati knjige</button>
      {message && <p>{message}</p>}
      <div className="books">
        {books.map(book => (
          <div key={book.id} className="book">
            <h3>{book.name}</h3>
            <p>👤 {book.author}</p>
            <button onClick={() => saveBook(book)}>💾 Spremi</button>
          </div>
        ))}
      </div>
      <Link to="/library">Idi u biblioteku →</Link>
    </div>
  );
}

export default BooksPage;
