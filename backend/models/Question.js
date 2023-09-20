import mongoose from "mongoose";

// Creating the Question schema
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    acceptedAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
        default: null, // Initially, there's no accepted answer
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

// Creating the Question model/Collection based on the schema
const Question = mongoose.model('Question', questionSchema);

// Exporting the Question model
export default Question;