require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = mongoose.createConnection(process.env.DB, { useNewUrlParser: true });
const conn2 = mongoose.createConnection(process.env.DB2, { useNewUrlParser: true });

const messageSchema = new Schema({
    destination: String,
    message: String,
    sent: Boolean,
    confirmation: Boolean
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Message = conn.model('Message', messageSchema);
const Message2 = conn2.model('Message2', messageSchema);
module.exports = { Message, Message2 };