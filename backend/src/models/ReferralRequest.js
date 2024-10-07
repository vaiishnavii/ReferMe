const mongoose = require('mongoose');

const referralRequestSchema = new mongoose.Schema({
  title: String,
  description: String,
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, default: 'open' }, // 'open', 'accepted', 'closed'
});

const ReferralRequest = mongoose.model('ReferralRequest', referralRequestSchema);
module.exports = ReferralRequest;