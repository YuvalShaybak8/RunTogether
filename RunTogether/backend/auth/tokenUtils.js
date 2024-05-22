const jwt = require("jsonwebtoken");

// Function to generate JWT token
function generateToken(user) {
  // Create a payload containing user information
  const payload = {
    user: {
      id: user._id,
    },
  };

  // Sign the payload with a secret key to generate the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour (you can adjust this as needed)
  });
  return token;
}

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get token from request headers, query parameters, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded.user; // Attach decoded user information to request object
    next();
  });
}

module.exports = { generateToken, verifyToken };
