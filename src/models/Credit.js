require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = mongoose.createConnection(process.env.DB, { useNewUrlParser: true });
const conn2 = mongoose.createConnection(process.env.DB2, { useNewUrlParser: true });

const creditSchema = new Schema({
    amount: Number
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Credit = conn.model('Credit', creditSchema);
const Credit2 = conn2.model('Credit2', creditSchema);
module.exports = { Credit, Credit2 };