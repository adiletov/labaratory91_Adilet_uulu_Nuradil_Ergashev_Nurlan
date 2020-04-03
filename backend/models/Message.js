const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true
    },
    datetime: {
        type: String,
        default: new Date()
    }
});

const Message = mongoose.model('Message', newSchema);
module.exports = Message;