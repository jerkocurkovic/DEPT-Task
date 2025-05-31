import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LibraryPage() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('library')) || [];
    setLibrary(saved);
  }, []);

  const removeBook = (id) => {
    const updated = library.filter(book => book.id !== id);
    setLibrary(updated);
    localStorage.setItem('library', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>📚 Moja Biblioteka</h1>
      {library.length === 0 ? (
        <p>Nema spremljenih knjiga.</p>
      ) : (
        library.map(book => (
          <div key={book.id} className="book">
            <h3>{book.name}</h3>
            <p>👤 {book.author}</p>
            <button onClick={() => removeBook(book.id)}>❌ Ukloni</button>
          </div>
        ))
      )}
      <Link to="/books">← Nazad na knjige</Link>
    </div>
  );
}

export default LibraryPage;
