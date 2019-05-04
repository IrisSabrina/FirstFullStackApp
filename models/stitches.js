const mongoose = require('mongoose');
const Schema = mongoose.Schema

const stitchesSchema = Schema({
    img: {type: String, required: false},
    name: { type: String, required: true },
    level: String,
    type: String,
    notes: String
});

const Stitches = mongoose.model('Stitches', stitchesSchema);

module.exports = Stitches
