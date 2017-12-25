var mongoose = require('mongoose');

var CustomerSchema = mongoose.Schema({
    lotNumber: {
        required: true,
        trim: false,
        type: 'number',
        unique: true,
    },
    firstName: {
        required: true,
        trim: true,
        type: 'string'
    },
    lastName: {
        required: true,
        trim: true,
        type: 'string'
    }
});

module.exports = CustomerSchema;