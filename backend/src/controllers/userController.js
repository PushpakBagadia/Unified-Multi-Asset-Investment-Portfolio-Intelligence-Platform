const User = require('../models/User');

// POST /api/users/sync
// Called after Firebase login. Finds the user by firebaseUid, creating them on first login.
const syncUser = async (req, res) => {
  const { uid, email, name, picture } = req.firebaseUser;

  try {
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        displayName: name,
        photoURL: picture,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to sync user', error: error.message });
  }
};

module.exports = { syncUser };
