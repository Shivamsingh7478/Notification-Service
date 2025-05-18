const Notification = require('../models/Notification');

const saveInAppNotification = async ({ userId, content, metadata }) => {
  try {
    const notification = new Notification({
      userId,
      type: 'in-app',
      content,
      status: 'sent',
      metadata,
    });
    await notification.save();
    console.log('In-app notification saved.');
    return { success: true };
  } catch (error) {
    console.error('In-app save error:', error);
    return { success: false, error };
  }
};

module.exports = { saveInAppNotification };
