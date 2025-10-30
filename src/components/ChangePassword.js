import React, { useState } from 'react';
import API from '../api';
import { clearAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword(){
  const [form,setForm] = useState({ oldPassword:'', newPassword:''});
  const [msg,setMsg] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put('/auth/change-password', form);
      setMsg(res.data.message);
      // logout after change
      clearAuth();
      setTimeout(()=> navigate('/signup'), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div style={{ maxWidth:400 }}>
      <h3>Change Password</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={submit}>
        <div className="mb-3"><label>Old Password</label><input className="form-control" type="password" onChange={e=>setForm({...form,oldPassword:e.target.value})}/></div>
        <div className="mb-3"><label>New Password</label><input className="form-control" type="password" onChange={e=>setForm({...form,newPassword:e.target.value})}/></div>
        <button className="btn btn-primary w-100">Change</button>
      </form>
    </div>
  );
}
