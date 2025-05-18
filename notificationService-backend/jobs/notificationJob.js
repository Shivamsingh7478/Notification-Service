const { getChannel } = require('../config/queue');
const { sendEmail } = require('../services/EmailService');
const { sendSMS } = require('../services/SMSService');
const { saveInAppNotification } = require('../services/InAppService');
const Notification = require('../models/Notification');

const processNotificationJob = async () => {
  const channel = getChannel();

  channel.consume('notifications', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    const { type, userId, recipient, subject, message, metadata, emailAuth } = data;

    try {
      let result;
      switch (type) {
        case 'email':
          result = await sendEmail({ to: recipient, subject, text: message, auth: emailAuth });
          break;
        case 'sms':
          result = await sendSMS({ phoneNumber: recipient, message });
          break;
        case 'in-app':
          result = await saveInAppNotification({ userId, content: message, metadata });
          break;
      }

      if (type !== 'in-app') {
        await Notification.create({
          userId,
          type,
          content: message,
          status: result.success ? 'sent' : 'failed',
          metadata,
        });
      }

      channel.ack(msg);
    } catch (error) {
      console.error('Job failed:', error);
     
      channel.nack(msg, false, false); // reject without requeue (for now)
    }
  });
};

module.exports = { processNotificationJob };
