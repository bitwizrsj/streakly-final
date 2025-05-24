// backend/middleware/auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.models.js";  // Assuming the User model is already set up

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);  // Attach user to the request
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();  // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
