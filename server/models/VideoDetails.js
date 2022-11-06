const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    uploader_name: {type: String, required: true},
    uploader_title: {type: String, required: true},
    video_path: {type: String, required: true},
    thumbnail_path: {type: String, required: true},
});

module.exports = mongoose.model('Upload', uploadSchema);