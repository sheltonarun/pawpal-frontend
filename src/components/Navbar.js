import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '../auth';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getAuth();

  const logout = () => {
    clearAuth();
    navigate('/signup');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🐾PAWPAL</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pets">Pets</Link>
            </li>

            {/* Admin menu visible only if user.role === 'admin' */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}

            {/* User logged in */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              
              <>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-primary me-2" to="/signup">
                    Get Started
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-outline-primary" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
