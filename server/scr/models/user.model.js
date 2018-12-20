const mogoose = require('mongoose');

const { Schema } = mogoose;

const UserSchema = Schema({
    name: { type: String },
    email: { type: String, require:true, index: true, unique:true },
    password: { type: String, require:true },
    joined: { type: Date, default: new Date() }

});

const User = mogoose.model('User',UserSchema);
module.exports = User;