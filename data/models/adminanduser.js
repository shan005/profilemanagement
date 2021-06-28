const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AdminUserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    createdtime: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedtime: {
        type: Date,
        default: null
    }
})


module.exports = AdminUsers = mongoose.model("adminsusers", AdminUserSchema);