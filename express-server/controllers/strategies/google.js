const Strategy = require('passport-google-oauth20');

const config = require('../../config/config.json');
const resp = require('../../utils/response');

const { clientID, clientSecret, callbackURL } = config.strategies.google;

module.exports = new Strategy({
    clientID,
    clientSecret,
    callbackURL,
}, (token, refreshToken, profile, done) => {
    return done(null, profile, resp(
        'Google Auth Success',
        { user: profile },
        { token, refreshToken },
    ));
});
