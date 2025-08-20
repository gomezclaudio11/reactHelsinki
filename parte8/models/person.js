const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        minlength: 5
    },
    phone: {
        type: String,
        minlength: 5
    },
    street: {
        type: String,
        require: true,
        minlength: 5
    },
    city: {
        type: String,
        require: true,
        minlength: 3
    },
})

module.exports = mongoose.model("Person", schema)