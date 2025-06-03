import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LibraryPage.css'; 

function LibraryPage() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('library')) || [];
    setLibrary(saved);
  }, []);

  const removeBook = (indexToRemove) => {
    const updated = library.filter((_, index) => index !== indexToRemove);
    setLibrary(updated);
    localStorage.setItem('library', JSON.stringify(updated));
  };

  return (
    <div className="library-container">
      <h1>My Library</h1>
      {library.length === 0 ? (
        <p>No saved books.</p>
      ) : (
        <div className="library-books-grid">
          {library.map((book, index) => (
            <div key={index} className="library-book-card">
              <div className="library-book-cover">
                <div className="library-book-content">
                  <h3>{book.title}</h3>
                  <p className="book-author">
                    <i className='bx bxs-user'></i> {book.author}
                  </p>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeBook(index)}>
                <i className='bx bx-x x-icon'></i> Remove</button>
            </div>
          ))}
        </div>
      )}
      <Link className="books-link" to="/books">Go to Books</Link>
    </div>
  );
}

export default LibraryPage;
