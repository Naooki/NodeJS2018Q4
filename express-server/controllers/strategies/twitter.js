const Strategy = require('passport-twitter');

const config = require('../../config/config.json');
const resp = require('../../utils/response');

const { consumerKey, consumerSecret, callbackURL } = config.strategies.twitter;

module.exports = new Strategy({
    consumerKey,
    consumerSecret,
    callbackURL,
}, (token, tokenSecret, profile, done) => {
    return done(null, profile, resp(
        'Twitter Auth Success',
        { user: profile },
        { token, tokenSecret },
    ));
});
