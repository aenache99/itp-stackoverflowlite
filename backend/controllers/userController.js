import User from "../models/User.js";

export const login = async (req, res) => {
    const { username } = req.body;

    try {
        // Check if the user already exists in the database
        let user = await User.findOne({ username });

        // If the user doesn't exist, create a new user
        if (!user) {
            user = new User({ username });
            await user.save();
        }

        // Generate a random access token
        const accessToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // Send the access token to the user
        return res.status(200).json({ accessToken, userId: user._id });

    } catch (error) {
        console.log("Error in User Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}