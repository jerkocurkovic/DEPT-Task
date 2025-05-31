import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BooksPage from './pages/BooksPage';
import LibraryPage from './pages/LibraryPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  //const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <BooksPage />
            </PrivateRoute>
          }
        />
        <Route
         path="/library"
         element={
           <PrivateRoute>
             <LibraryPage />
           </PrivateRoute>
         }
       />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
