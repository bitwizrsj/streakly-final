import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check for empty fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: "User with this email or username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login function for user authentication
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check for empty fields
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare the entered password with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate a JSON Web Token (JWT)
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Respond with the token and user info (excluding password)
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,  // Ensure the username is sent
          email: user.email,        // Ensure the email is sent
        },
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
