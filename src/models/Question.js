const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    parentQuestion: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
});

module.exports = mongoose.model('Answer', AnswerSchema);
