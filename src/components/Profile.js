import React, { useEffect, useState } from 'react';
import { getAuth, setAuth } from '../auth';
import API from '../api';

export default function Profile(){
  const user = getAuth();
  const [form,setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [msg,setMsg] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    try {
      // update local only for demo
      const updated = { ...user, name: form.name };
      setAuth(updated, localStorage.getItem('pawpal_token'));
      setMsg('Profile updated locally');
    } catch (err) {
      setMsg('Error updating');
    }
  };

  return (
    <div style={{ maxWidth:600 }} className="mx-auto">
      <h3>Your Profile</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={save}>
        <div className="mb-3"><label>Name</label><input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="mb-3"><label>Email</label><input className="form-control" value={form.email} disabled/></div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
