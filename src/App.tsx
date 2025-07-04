import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BooksPage from './pages/BooksPage';
import LibraryPage from './pages/LibraryPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <BooksPage />
              </PrivateRoute>
            }
          />
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
          <Route path="*" element={<NotFoundPage />} />
        
        </Route>
    
      </Routes>
    </Router>
  );
}

export default App;
