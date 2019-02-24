const _ = require('lodash');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config/config.json');
const resp = require('../utils/response');
const strategies = require('./strategies');


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use('local', strategies.local);
passport.use('twitter', strategies.twitter);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);


function passportAuthenticate(strategyName) {
    return (req, res) => {
        passport.authenticate(strategyName, (err, user, info) => {
            if (err) {
                res.status(403);
                return res.send(err);
            }
            res.status(200);
            return res.send(info);
        })(req, res);
    };
}

module.exports = {
    auth: (req, res) => {
        if (!_.size(req.body)) {
            res.status(403);
            return res.send(resp('Forbidden.', 'No credentials.'));
        }

        const { email, password } = req.body;
        const { username, email: CONFIG_EMAIL, password: CONFIG_PASSWORD } = config.userCredentials;

        if (email !== CONFIG_EMAIL || password !== CONFIG_PASSWORD) {
            res.status(403);
            return res.send(resp('Forbidden', 'Invalid credentials.'));
        }

        const payload = {
            email,
            password,
        };

        const token = jwt.sign(payload, config.jwtCredentials.secret);

        res.status(200);
        return res.send(resp('OK', {
            user: { email, username, password },
        }, token));
    },
    authPassportLocal: passportAuthenticate('local'),
    authPassportTwitter: passportAuthenticate('twitter'),
    authPassportFacebook: passportAuthenticate('facebook'),
    authPassportGoogle: passportAuthenticate('google'),
};
