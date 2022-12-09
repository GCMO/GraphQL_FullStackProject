// we have to create a Mongoose Schema, which is diff. from GraphQL schema. Basically Mongoose sits between the DB and GraphQL API

const mongoose = require('mongoose'); 

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

module.exports = mongoose.model('Client', ClientSchema);