import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import PetList from './components/PetList';
import AdminDashboard from './components/AdminDashboard';
import UsersManagement from './components/UsersManagement';
<Route path="/admin/users" element={<UsersManagement />} />
import EditPet from './components/EditPet';
import EditUser from './components/EditUser';
import ChangePassword from './components/ChangePassword';
import Profile from './components/Profile';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UsersManagement /></AdminRoute>} />
          <Route path="/admin/pets/edit/:id" element={<AdminRoute><EditPet /></AdminRoute>} />
          <Route path="/admin/users/edit/:id" element={<AdminRoute><EditUser /></AdminRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
