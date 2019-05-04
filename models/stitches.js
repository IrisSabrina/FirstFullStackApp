const mongoose = require('mongoose');

const stitchesSchema = new mongoose.Schema({
    pic: <img src=""/>,
    name: { type: String, required: true },
    level: String,
    type: String,
    notes: String
});

const Stitches = mongoose.model('Stitches', stitchesSchema);

module.exports = Stitches
