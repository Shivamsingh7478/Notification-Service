const { getChannel } = require('../config/queue');
const Notification = require('../models/Notification');

// Send Notification (via Queue)
exports.sendNotification = async (req, res) => {
  const channel = getChannel();
  const payload = req.body;

  try {
    // Push to RabbitMQ queue named "notifications"
    channel.sendToQueue('notifications', Buffer.from(JSON.stringify(payload)));
    return res.status(200).json({
      success: true,
      message: 'Notification queued for processing',
    });
  } catch (error) {
    console.error('Queue Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to queue notification',
      error: error.message,
    });
  }
};

// Get All Notifications for a User
exports.getUserNotifications = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {
    console.error('Get Notifications Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
