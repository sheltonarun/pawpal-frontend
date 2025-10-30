import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPet(){
  const { id } = useParams(); const navigate = useNavigate();
  const [form,setForm] = useState({ name:'', type:'', breed:'', age:'', health:'' });
  useEffect(()=> {
    if(id && id !== 'new') API.get(`/pets`).then(r=> {
      const p = r.data.find(x=> x._1d === id);
      if(p) setForm(p);
    });
  },[id]);

  const save = async (e) => {
    e.preventDefault();
    if(id === 'new') {
      await API.post('/pets', form);
    } else {
      await API.put(`/pets/${id}`, form);
    }
    navigate('/admin');
  };

  return (
    <div style={{ maxWidth:600 }}>
      <h3>{id==='new' ? 'Add Pet' : 'Edit Pet'}</h3>
      <form onSubmit={save}>
        <div className="mb-3"><label>Name</label><input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="mb-3"><label>Type</label><input className="form-control" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}/></div>
        <div className="mb-3"><label>Breed</label><input className="form-control" value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})}/></div>
        <div className="mb-3"><label>Age</label><input type="number" className="form-control" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/></div>
        <div className="mb-3"><label>Health</label><input className="form-control" value={form.health} onChange={e=>setForm({...form,health:e.target.value})}/></div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
