import React from 'react';
import Navbar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
        <Navbar />
        <div className="main-content">
            <Outlet />
        </div>
    </>
  );
};

export default Layout;
