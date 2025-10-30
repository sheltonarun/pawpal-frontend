import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditUser(){
  const { id } = useParams(); const navigate = useNavigate();
  const [form,setForm] = useState({ name:'', email:'', role:'user' });
  useEffect(()=> {
    API.get('/users').then(r=> {
      const u = r.data.find(x=> x._id === id);
      if(u) setForm(u);
    });
  },[id]);

  const save = async (e) => {
    e.preventDefault();
    await API.put(`/users/${id}`, form);
    navigate('/admin/users');
  };

  return (
    <div style={{ maxWidth:600 }}>
      <h3>Edit User</h3>
      <form onSubmit={save}>
        <div className="mb-3"><label>Name</label><input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="mb-3"><label>Email</label><input className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
        <div className="mb-3"><label>Role</label><select className="form-control" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>user</option><option>admin</option></select></div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
