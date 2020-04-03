const User = require('../models/User');

const auth = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        res.status(401).send({error: 'No authorization!!!'})
    }

    const [type, token] = authorization.split(' ');
    if (type !== 'Token' || !token) {
        res.status(401).send({error: 'Type or token in correct!!!'})
    }

    const user = await User.findOne({token});

    if (!user){
        res.status(401).send({error: 'No user!!!'})
    }
    req.user = user;
    next()
};

module.exports = auth;