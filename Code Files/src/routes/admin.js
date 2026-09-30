const express = require('express');
const router = express.Router();
const { getAdminStats, updateTicketClassification } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/stats', verifyToken, isAdmin, getAdminStats);
router.put('/ticket/:id', verifyToken, isAdmin, updateTicketClassification);

module.exports = router;