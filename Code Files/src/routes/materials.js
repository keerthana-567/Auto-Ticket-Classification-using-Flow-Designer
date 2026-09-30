const express = require('express');
const router = express.Router();
const { createTicket, getTickets } = require('../controllers/materialController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', verifyToken, upload.single('attachment'), createTicket);
router.get('/', verifyToken, getTickets);

module.exports = router;