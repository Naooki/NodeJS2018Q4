const Strategy = require('passport-local');

const config = require('../../config/config.json');
const resp = require('../../utils/response');

module.exports = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCredentials.session,
    passReqToCallback: true,
}, (req, email, password, done) => {
    const { email: CONFIG_EMAIL, password: CONFIG_PASSWORD, username } = config.userCredentials;
    if (email !== CONFIG_EMAIL || password !== CONFIG_PASSWORD) {
        return done(resp('Forbidden', 'Invalid credentials.'));
    }
    return done(null, config.userCredentials, resp('OK', {
        user: { email, username, password },
    }));
});
