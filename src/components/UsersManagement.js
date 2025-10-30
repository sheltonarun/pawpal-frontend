import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function UsersManagement(){
  const [users,setUsers] = useState([]);
  useEffect(()=> { API.get('/users').then(r=> setUsers(r.data)).catch(e=> console.error(e)); }, []);
  const addUser = async ()=> {
    const name = prompt('Name'); if(!name) return;
    const email = prompt('Email'); if(!email) return;
    const pwd = prompt('Password'); if(!pwd) return;
    const role = prompt('Role (admin/user)', 'user');
    await API.post('/users', { name, email, password: pwd, role });
    const r = await API.get('/users'); setUsers(r.data);
  };
  return (
    <div>
      <h2>User Management</h2>
      <button className="btn btn-success mb-3" onClick={addUser}>Add User</button>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u=> (
            <tr key={u._id}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
              <td>
                <Link to={`/admin/users/edit/${u._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={async ()=> {
                  if(!window.confirm('Delete user?')) return;
                  await API.delete(`/users/${u._id}`);
                  setUsers(users.filter(x=>x._id!==u._id));
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
