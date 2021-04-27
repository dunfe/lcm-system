const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
const { ChatGrant } = AccessToken;

const generateToken = () => {
        return new AccessToken(
            'ACe4e5788f7c163a9995c6bce28c02ccb1',
            'SK46dd26b42266374f50241c78dc88768a',
            '8ff6kFuxrhOZsZ8KZdg64mxeJN2wKTg9'
        );
};

const client = require('twilio')('ACe4e5788f7c163a9995c6bce28c02ccb1', '1cf734bf54f34b7af1123e7f1dadb6e0');

let temp;

const videoToken = (identity, room) => {
    let videoGrant;
    if (typeof room !== 'undefined') {
        client.conversations.conversations
            .create({
                uniqueName: room,
                friendlyName: 'Conversation'
            })
            .then(conversation => temp = conversation);
        videoGrant = new VideoGrant({ room });
    } else {
        videoGrant = new VideoGrant();
    }

    const chatGrant = new ChatGrant({
        serviceSid: 'IS8e42f6fd58a94399b10b2df5c8e412ba',
    });

    const token = generateToken();
    token.addGrant(videoGrant);
    token.addGrant(chatGrant)
    token.identity = identity;
    return token;
};

module.exports = { videoToken };
