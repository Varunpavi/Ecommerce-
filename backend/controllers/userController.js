import User from '../models/user.js'; 
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    const { name, email, password, user_type } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            user_type 
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate the input
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If login is successful, you can return user info or a token
        return res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in user.', error: error.message });
    }
};