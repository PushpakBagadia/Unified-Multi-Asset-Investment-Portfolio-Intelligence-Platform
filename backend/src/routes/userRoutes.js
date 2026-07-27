const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { syncUser } = require('../controllers/userController');

const router = express.Router();

router.post('/sync', authMiddleware, syncUser);

module.exports = router;
