const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { notificationSchema, userIdSchema } = require('../validators/inputValidator');
const validate = require('../middlewares/validate');

// Send Notification
router.post(
  '/notifications',
  validate(notificationSchema, 'body'),
  notificationController.sendNotification
);

// Get User Notifications
router.get(
  '/:id/notifications',
  validate(userIdSchema, 'params'),
  notificationController.getUserNotifications
);

module.exports = router;
