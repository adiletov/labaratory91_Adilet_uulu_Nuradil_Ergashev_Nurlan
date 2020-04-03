const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const newSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'moderator'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

newSchema.methods.generationToken = function () {
    this.token = nanoid()
};

newSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next()
});

newSchema.set('toJSON', {
    transform: (doc, ret, option) => {
        delete ret.password;
        return ret
    }
});

const User = mongoose.model('User', newSchema);
module.exports = User;
