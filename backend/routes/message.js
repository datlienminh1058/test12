const express = require('express');
const {isAuthenticated} = require('../middlewares/auth');
const {createMessage, getMessage} = require('../controllers/message');

const router = express.Router();

router.route('/messages/').post(isAuthenticated, createMessage);
router.route('/messages/:conversationId').get(isAuthenticated, getMessage);
module.exports = router;