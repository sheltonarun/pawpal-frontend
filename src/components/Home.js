import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(){
  return (
    <div>
      <section className="py-5 text-center bg-light rounded-3">
        <div className="container">
          <h1 className="display-5 fw-bold">Welcome to PAWPAL</h1>
          <p className="col-md-8 mx-auto">Find loving homes for pets, connect with shelters, and manage adoptions easily. Built with care and responsive design.</p>
          <p><Link className="btn btn-primary btn-lg me-2" to="/signup">Get Started</Link><Link className="btn btn-outline-secondary btn-lg" to="/pets">Browse Pets</Link></p>
        </div>
      </section>

      <section className="my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3>Why PawPal?</h3>
            <ul>
              <li>Easy adoption workflow</li>
              <li>Trusted shelters and admins</li>
              <li>Responsive mobile-friendly UI</li>
              <li>Secure authentication and role-based access</li>
            </ul>
          </div>
          <div className="col-md-6">
            <span class="symbol" style={{ fontSize: '2rem' }}>🐶</span>
          </div>
        </div>
      </section>

      <section className="my-5 bg-white p-4 rounded shadow-sm">
        <h4 className="mb-3">How Adoption Works</h4>
        <div className="row">
          <div className="col-md-4"><h5>1. Sign up</h5><p>Create an account to get started.</p></div>
          <div className="col-md-4"><h5>2. Browse Pets</h5><p>Explore pets and view details.</p></div>
          <div className="col-md-4"><h5>3. Adopt</h5><p>Request adoption and bring home a friend.</p></div>
        </div>
      </section>

      <footer className="text-center mt-5 mb-4">
        <p>PAWPAL &copy; {new Date().getFullYear()} — <Link to="/signup">Get started</Link></p>
      </footer>
    </div>
  );
}
