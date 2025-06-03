import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/BooksPage.css';

const API_BASE = 'https://bootcamp2025.depster.me';


function BooksPage() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [library, setLibrary] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem('library')) || [];
    setLibrary(savedLibrary);

    const savedBookKeys = savedLibrary.map(b => `${b.title}_${b.author}`);
    setSavedBooks(savedBookKeys);
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/books?limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data.data);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  const saveBook = (book) => {
    const bookKey = `${book.title}_${book.author}`;
    const alreadySaved = savedBooks.includes(bookKey);

    if (alreadySaved) {
    const updatedLibrary = library.filter(
      (b) => `${b.title}_${b.author}` !== bookKey
    );
    setLibrary(updatedLibrary);
    localStorage.setItem('library', JSON.stringify(updatedLibrary));

    const updatedSavedBooks = savedBooks.filter(key => key !== bookKey);
    setSavedBooks(updatedSavedBooks);
    
  } else {
    const updatedLibrary = [...library, book];
    setLibrary(updatedLibrary);
    localStorage.setItem('library', JSON.stringify(updatedLibrary));

    setSavedBooks([...savedBooks, bookKey]);
  }
  };

  return (
    <div className="books-container">
      <h1>Books</h1>
      <button className="fetch-button" onClick={fetchBooks}>Fetch Books</button>
      {message && <p className="status-message">{message}</p>}

      <div className="books-grid">
        {books.map((book) => {
          const isSaved = savedBooks.includes(`${book.title}_${book.author}`);
          return (
            <div key={book.id} className="book-card">
              <div className="book-visual">
                <div className="book-cover">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">
                    <i className='bx bxs-user'></i> {book.author}
                  </p>
                </div>
              </div>
              <button className="save-button" onClick={() => saveBook(book)}>
                <i className={`bx ${isSaved ? 'bxs-bookmark' : 'bx-bookmark'}`}></i>
                {isSaved ? 'Saved' : 'Save to Library'}
              </button>
            </div>
          );
        })}
      </div>

      <Link className="library-link" to="/library">Go to Library</Link>
    </div>
  );
}

export default BooksPage;
