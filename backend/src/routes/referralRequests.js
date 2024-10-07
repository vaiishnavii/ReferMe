const express = require('express');
const router = express.Router();
const ReferralRequest = require('../models/ReferralRequest');
const User = require('../models/User');

// Endpoint to create a new referral request
router.post('/referrals', async (req, res) => {
  const { title, description, seekerId } = req.body;
  const newRequest = new ReferralRequest({ title, description, seeker: seekerId });
  await newRequest.save();
  res.status(201).json(newRequest);
});

// Endpoint to get all referral requests
router.get('/referrals', async (req, res) => {
  const requests = await ReferralRequest.find().populate('seeker referrer');
  res.json(requests);
});

// Endpoint to update a referral request (e.g., accept a referral request)
router.put('/referrals/:id', async (req, res) => {
  const { id } = req.params;
  const { status, referrerId } = req.body;
  const request = await ReferralRequest.findById(id);
  if (status) request.status = status;
  if (referrerId) request.referrer = referrerId;
  await request.save();
  res.json(request);
});

module.exports = router;