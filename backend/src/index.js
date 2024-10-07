const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://mongo:27017/referrals', { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/User');
const referralRequestsRouter = require('./routes/referralRequests');

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:5001/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = new User({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value });
    await user.save();
  }
  return done(null, user);
}));

// LinkedIn Strategy
passport.use(new LinkedInStrategy({
  clientID: 'YOUR_LINKEDIN_CLIENT_ID',
  clientSecret: 'YOUR_LINKEDIN_CLIENT_SECRET',
  callbackURL: 'http://localhost:5001/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile']
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ linkedinId: profile.id });
  if (!user) {
    user = new User({ linkedinId: profile.id, username: profile.displayName, email: profile.emails[0].value });
    await user.save();
  }
  return done(null, user);
}));

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/auth/google', (req, res, next) => {
  const action = req.query.action || 'login';
  const scope = ['profile', 'email'];
  passport.authenticate('google', { scope, state: action })(req, res, next);
});

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const action = req.query.state;
  res.redirect(`http://localhost:3000/?action=${action}`);
});

app.get('/auth/linkedin', (req, res, next) => {
  const action = req.query.action || 'login';
  passport.authenticate('linkedin', { state: action })(req, res, next);
});

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
  const action = req.query.state;
  res.redirect(`http://localhost:3000/?action=${action}`);
});

app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send('Not authenticated');
  }
});

app.post('/auth/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

// Use the referral requests router
app.use('/api', referralRequestsRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});