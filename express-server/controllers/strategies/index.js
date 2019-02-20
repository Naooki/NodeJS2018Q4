const localStrategy = require('./local');
const twitterStrategy = require('./twitter');
const facebookStrategy = require('./facebook');
const googleStrategy = require('./google');

module.exports = {
    local: localStrategy,
    twitter: twitterStrategy,
    facebook: facebookStrategy,
    google: googleStrategy,
};
