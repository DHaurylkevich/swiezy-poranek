const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    published_at: { type: Date }
});

module.exports = mongoose.model('Article', articleSchema);