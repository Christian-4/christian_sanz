const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    destination: String,
    message: String,
    sent: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;