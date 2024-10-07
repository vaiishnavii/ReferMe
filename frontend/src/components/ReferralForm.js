import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const ReferralForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const response = await api.post('/referrals', {
        title,
        description,
        seekerId: user._id,
      });
      console.log('Referral created:', response.data);
    } else {
      console.log('User not authenticated');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Referral Request</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default ReferralForm;