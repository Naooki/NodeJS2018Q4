const express = require('express');
const passport = require('passport');

const auth = require('../controllers/auth');

const router = express.Router();

router.post('/', auth.auth);
router.post('/local', auth.authPassportLocal);

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', auth.authPassportTwitter);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', auth.authPassportFacebook);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', auth.authPassportGoogle);

module.exports = router;
