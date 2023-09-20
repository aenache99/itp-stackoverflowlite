import mongoose from "mongoose";

// Creating the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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

// Creating the User model/Collection based on the schema
const User = mongoose.model('User', userSchema);

// Exporting the User model
export default User;