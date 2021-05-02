const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
const { ChatGrant} = AccessToken;
const client = require('twilio')('ACe4e5788f7c163a9995c6bce28c02ccb1', '1cf734bf54f34b7af1123e7f1dadb6e0');

const generateToken = () => {
        return new AccessToken(
            'ACe4e5788f7c163a9995c6bce28c02ccb1',
            'SK46dd26b42266374f50241c78dc88768a',
            '8ff6kFuxrhOZsZ8KZdg64mxeJN2wKTg9',
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

const roomToken = async (user_identity, room_name, create_room, create_conversation) => {

    if (typeof create_room !== 'boolean') {
        return
    }

    if (typeof create_conversation !== 'boolean') {
        return
    }

    if (!user_identity) {
        return
    }

    if (!room_name && create_room) {
        return
    }

    if (create_room) {
        let room;

        try {
            // See if a room already exists
            room = await client.video.rooms(room_name).fetch().then((room) => room);
        } catch (e) {
            try {
                // If room doesn't exist, create it
                room = await client.video.rooms.create({ uniqueName: room_name, type: 'peer-to-peer' }).then((room) => room);
            } catch (e) {
                return
            }
        }

        if (create_conversation) {
            const conversationsClient = await client.conversations.services('IS8e42f6fd58a94399b10b2df5c8e412ba');

            try {
                // See if conversation already exists
                await  conversationsClient.conversations(room.sid).fetch().then((conversation) => conversation);
            } catch (e) {
                try {
                    // If conversation doesn't exist, create it.
                    // Here we add a timer to close the conversation after the maximum length of a room (24 hours).
                    // This helps to clean up old conversations since there is a limit that a single participant
                    // can not be added to more than 1,000 open conversations.
                    await conversationsClient.conversations.create({ uniqueName: room.sid, 'timers.closed': 'P1D' }).then((conversation) => conversation);
                } catch (e) {
                    return
                }
            }

            try {
                // Add participant to conversation
                await conversationsClient.conversations(room.sid).participants.create({ identity: user_identity }).then((participants) => participants);
            } catch (e) {
                // Ignore "Participant already exists" error (50433)
                if (e.code !== 50433) {
                    return
                }
            }
        }
    }

    // Create token
    const token = generateToken()

    // Add participant's identity to token
    token.identity = user_identity;

    // Add video grant to token
    const videoGrant = new VideoGrant({ room: room_name });
    token.addGrant(videoGrant);

    // Add chat grant to token
    const chatGrant = new ChatGrant({ serviceSid: 'IS8e42f6fd58a94399b10b2df5c8e412ba' });
    token.addGrant(chatGrant);

    // Return token
    return token
}

module.exports = { videoToken, roomToken };
