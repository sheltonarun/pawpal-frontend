import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup(){
  const [form,setForm] = useState({ name:'', email:'', password:''});
  const [msg,setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({...form,[e.target.name]: e.target.value});

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);
  const validatePassword = pwd => pwd.length>=6 && /\d/.test(pwd);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!form.name || !form.email || !form.password) return setMsg('All fields required');
    if(!validateEmail(form.email)) return setMsg('Enter valid email');
    if(!validatePassword(form.password)) return setMsg('Password min 6 chars and include a number');
    try {
      const res = await API.post('/auth/signup', form);
      setMsg(res.data.message || 'User created');
      setTimeout(()=> navigate('/login'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3">Create your PAWPAL account</h3>
          {msg && <div className="alert alert-info">{msg}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3"><label>Name</label><input name="name" value={form.name} onChange={onChange} className="form-control"/></div>
            <div className="mb-3"><label>Email</label><input name="email" value={form.email} onChange={onChange} className="form-control" type="email"/></div>
            <div className="mb-3"><label>Password</label><input name="password" value={form.password} onChange={onChange} className="form-control" type="password"/></div>
            <button className="btn btn-primary w-100">Create Account</button>
          </form>
          <div className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></div>
        </div>
      </div>
    </div>
);
}
