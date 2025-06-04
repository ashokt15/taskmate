const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes by verifying JWT tokens.
 * It checks for a token in the 'Authorization' header, verifies it,
 * and attaches the authenticated user's ID to the request object.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the 'Bearer' string
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the JWT_SECRET from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the decoded token payload and attach to request
      // .select('-password') excludes the password field from the returned user object
      req.user = await User.findById(decoded.id).select('-password');

      // If user is not found (e.g., token valid but user deleted), return 401
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);
      // Return 401 if token verification fails (e.g., invalid token, expired token)
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
