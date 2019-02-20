const Strategy = require('passport-facebook');

const config = require('../../config/config.json');
const resp = require('../../utils/response');

const { clientID, clientSecret, callbackURL} = config.strategies.facebook;

module.exports = new Strategy({
    clientID,
    clientSecret,
    callbackURL,
}, (token, refreshToken, profile, done) => {
    return done(null, profile, resp(
        'Facebook Authentication Success',
        { user: profile },
        { token, refreshToken },
    ));
});
