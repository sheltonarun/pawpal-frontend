import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword(){
  const [form,setForm] = useState({ email:'', newPassword:''});
  const [msg,setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({...form,[e.target.name]: e.target.value});
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/forgot', form);
      setMsg(res.data.message);
      setTimeout(()=> navigate('/login'), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow-sm">
          <h3>Reset Password</h3>
          {msg && <div className="alert alert-info">{msg}</div>}
          <form onSubmit={submit}>
            <div className="mb-3"><label>Email</label><input name="email" onChange={onChange} className="form-control" type="email"/></div>
            <div className="mb-3"><label>New Password</label><input name="newPassword" onChange={onChange} className="form-control" type="password"/></div>
            <button className="btn btn-primary w-100">Reset</button>
          </form>
          <div className="mt-3 text-center"><Link to="/login">Back to login</Link></div>
        </div>
      </div>
    </div>
);
}
