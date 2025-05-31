import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const API_BASE = 'https://bootcamp2025.depster.me';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      setToken(token);
      navigate('/books');
    } catch (err) {
      setMessage('Login failed. Please check your email and password.');
    }
    
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        navigate('/books');
    }
    }, []);

  return (
    <div className='main-part'>
      <h1>DEPT Books</h1>

      <div className='input-fields'>
        <div className="input-box">
          <i className='bx bxs-user'></i>
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
    
        <div className="input-box">
            <i className={`bx ${showPassword ? 'bxs-lock-open' : 'bxs-lock-alt'}`} onClick={() => setShowPassword(!showPassword)}></i>
            <input placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter')  login();}}/>
        </div>

      </div>

      <div className='buttons'>
        <button onClick={login}>Login</button>
      </div>

      <p>{message && (
        <div className="error-message">
            {message}
        </div>)}
      </p>

    </div>
  );
}

export default LoginPage;
