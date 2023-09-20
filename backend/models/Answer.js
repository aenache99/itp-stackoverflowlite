import mongoose from "mongoose";

// Creating the Answer schema
const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

// Creating the Answer model/Collection based on the schema
const Answer = mongoose.model('Answer', answerSchema);

// Exporting the Answer model
export default Answer;