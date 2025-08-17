const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token || token.trim() === '') {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    // Check if the token is actually "Bearer" (which would be invalid)
    if (token === 'Bearer') {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || 'f8a4c9e0b37f4e6d8c1a9f527b6e3d94a2f58b7e6f913d8c4e5b7f6a8c2d9e1f');
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token verification failed, authorization denied' });
  }
};

module.exports = auth; 