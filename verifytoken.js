const jwt = require('jsonwebtoken');
const config = require('./config/config') // Replace with the same key used in createUsers.js

function verifyToken(req, res, next) {
  const token = req.headers['x-api-key']; // Token should be included in the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
