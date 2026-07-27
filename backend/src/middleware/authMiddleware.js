const { auth } = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No auth token provided' });
  }

  try {
    const decoded = await auth().verifyIdToken(token);
    req.firebaseUser = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired auth token' });
  }
};

module.exports = authMiddleware;
