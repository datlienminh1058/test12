const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');

const {createConversation, getConversation, get2ConversationUsers} = require ('../controllers/conversation');

const router = express.Router();

router.route('/conversations').post(isAuthenticated, createConversation);
router.route('/conversations/:id').get(isAuthenticated, getConversation);
router.route('/conversations/find/:firstUserId/:secondUserId').get(isAuthenticated, get2ConversationUsers);

module.exports = router;
