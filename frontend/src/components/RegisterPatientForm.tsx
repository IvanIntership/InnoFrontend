import React, { useState } from 'react';
import { useRegisterPatient } from '../hooks/useRegisterPatient';
import type { RegisterUserRequest } from '../api/types';

export const RegisterPatientForm = () => {
  const { register, isLoading, error, isSuccess } = useRegisterPatient();

  const [formData, setFormData] = useState<Omit<RegisterUserRequest, 'role'>>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    birthday: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  if (isSuccess) {
    return <div>Registration successful! You can now log in.</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <h3>Patient Registration</h3>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
      <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      <input name="birthday" type="date" placeholder="Date of Birth" value={formData.birthday} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
};