import React, { useState, useEffect } from 'react';
import api from '../api';

const ReferralList = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      const response = await api.get('/referrals');
      setReferrals(response.data);
    };

    fetchReferrals();
  }, []);

  return (
    <div>
      <h2>Referral Requests</h2>
      <ul>
        {referrals.map((referral) => (
          <li key={referral._id}>
            <h3>{referral.title}</h3>
            <p>{referral.description}</p>
            <p>Seeker: {referral.seeker.username}</p>
            <p>Status: {referral.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReferralList;