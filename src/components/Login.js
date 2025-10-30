import React, { useState } from 'react';
import API from '../api';
import { setAuth } from '../auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form,setForm] = useState({ email:'', password:''});
  const [msg,setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({...form,[e.target.name]: e.target.value});
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      setAuth(res.data.user, res.data.token);
      navigate('/home');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3">Login to PAWPAL</h3>
          {msg && <div className="alert alert-danger">{msg}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3"><label>Email</label><input name="email" onChange={onChange} className="form-control" type="email"/></div>
            <div className="mb-3"><label>Password</label><input name="password" onChange={onChange} className="form-control" type="password"/></div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
          <div className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link><br/>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
);
}
