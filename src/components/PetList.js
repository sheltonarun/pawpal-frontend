import React, { useEffect, useState } from 'react';
import API from '../api';
import { getAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function PetList(){
  const [pets, setPets] = useState([]);
  const user = getAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    API.get('/pets').then(r=> setPets(r.data)).catch(e=> console.error(e));
  },[]);

  const adopt = async (id) => {
    if(!user) { navigate('/signup'); return; }
    try {
      await API.post(`/pets/${id}/adopt`);
      setPets(pets.map(p=> p._id===id ? {...p, adopted:true, adopter:{name:user.name}} : p));
      alert('Adoption successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Adoptable Pets</h2>
      <div className="row">
        {pets.map(p => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name} {p.adopted && <span className="badge bg-secondary">Adopted</span>}</h5>
                <p className="mb-1"><strong>Type:</strong> {p.type}</p>
                <p className="mb-1"><strong>Breed:</strong> {p.breed}</p>
                <p className="mb-1"><strong>Age:</strong> {p.age}</p>
                <p className="mb-1"><strong>Health:</strong> {p.health}</p>
                {p.adopted && p.adopter && <p className="text-muted">Adopted by: {p.adopter.name}</p>}
                <div className="mt-auto">
                  <button className="btn btn-primary w-100" disabled={p.adopted} onClick={()=>adopt(p._id)}>{p.adopted ? 'Adopted' : 'Adopt'}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {pets.length===0 && <p>No pets found.</p>}
    </div>
  );
}
