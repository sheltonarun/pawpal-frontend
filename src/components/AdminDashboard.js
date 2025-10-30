import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){
  const [pets, setPets] = useState([]);

  useEffect(()=> { 
    API.get('/pets').then(r=> setPets(r.data)); 
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Dashboard</h2>
        <Link to="/admin/users" className="btn btn-outline-primary">Manage Users</Link>
      </div>

      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Manage Pets</h4>
          <Link to="/admin/pets/edit/new" className="btn btn-success">Add New Pet</Link>
        </div>

        <table className="table table-striped">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Breed</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {pets.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.breed}</td>
                <td>
                  <Link className="btn btn-sm btn-primary me-2" to={`/admin/pets/edit/${p._id}`}>Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={async ()=> {
                    if(!window.confirm('Delete pet?')) return;
                    await API.delete(`/pets/${p._id}`); 
                    setPets(pets.filter(x => x._id !== p._id));
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
