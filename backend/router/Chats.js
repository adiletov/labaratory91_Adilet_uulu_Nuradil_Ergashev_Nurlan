const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const {nanoid} = require('nanoid');


const activeConnections = {};

const sendMsgToAll = (connections, msg) => {
    Object.keys(connections).forEach(connId => {
        const conn = connections[connId].ws;
        conn.send(JSON.stringify(msg));
    });
};

const connOrdisc = () => {
    const onlineUsers = Object.keys(activeConnections).map(connId => {
        return {username: activeConnections[connId].user.username, id: activeConnections[connId].user.id};
    });
    sendMsgToAll(activeConnections, {
        type: 'ONLINE_USERS',
        user: onlineUsers
    });
};

const allMessages = async () => {
    const messages = await Message.find().limit(10).populate('userId').sort('-datetime');
    return sendMsgToAll(activeConnections, {
        type: 'ALL_MESSAGES',
        messages
    });
};

const  closeConnection = (ws, id) =>{
    ws.on('close', function (msg) {
        delete activeConnections[id];
        connOrdisc()
    })
};

router.ws('/', async (ws, req) => {
    const id = nanoid();
    const user = await User.findOne({token: req.query.token});
    activeConnections[id] = {ws, user};

    connOrdisc();
    await allMessages();




    ws.on('message', async (msg) => {
        let decodedMessage;

        try {
            decodedMessage = JSON.parse(msg);
        } catch (e) {
            return console.log('Not valid message');
        }
        let message;


        switch (decodedMessage.type) {
            case 'CREATE_MESSAGE':
                const newMessage = {
                    userId: user._id,
                    message: decodedMessage.message
                };
                message = new Message(newMessage);
                await message.save();

                sendMsgToAll(activeConnections, {
                    type: 'NEW_MESSAGES',
                    message: {
                        _id: message._id,
                        username: user.username,
                        message: message.message,
                        datetime: message.datetime
                    }
                });
                break;
            case 'DELETE_MESSAGE':
                await Message.deleteOne({_id: decodedMessage.id});
                await allMessages();
                break;
        }

    });


    closeConnection(ws, id)
});


module.exports = router;