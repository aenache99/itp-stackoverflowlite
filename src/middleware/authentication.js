import mongoose from "mongoose";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
    // Get the userId from the headers
    const { userid } = req.headers;

    try {
        // Find the user by userId
        const user = await User.findById(userid);

        // If the user doesn't exist, return an error message
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user exists, add the userId to the request object
        req.userId = userid;

        // Call the next middleware
        next();

    } catch (error) {
        // the CastError
        if (error instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("Error in Authentication Middleware: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}