import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, username, isAdmin, onLogout }) => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">List</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">About</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/cart" className="hover:underline">Cart</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <span className="hover:underline">{username}</span>
                <button onClick={onLogout} className="ml-2 hover:underline">Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:underline">Register</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link to="/admin" className="hover:underline">Admin</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;