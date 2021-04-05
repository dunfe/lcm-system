const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = () => {
    return new AccessToken(
        'ACe4e5788f7c163a9995c6bce28c02ccb1',
        'SK46dd26b42266374f50241c78dc88768a',
        '8ff6kFuxrhOZsZ8KZdg64mxeJN2wKTg9'
    );
};

const videoToken = (identity, room) => {
    let videoGrant;
    if (typeof room !== 'undefined') {
        videoGrant = new VideoGrant({ room });
    } else {
        videoGrant = new VideoGrant();
    }
    const token = generateToken();
    token.addGrant(videoGrant);
    token.identity = identity;
    return token;
};

module.exports = { videoToken };
