const amqp = require('amqplib');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Notification = require('./models/Notification');

dotenv.config();

const startWorker = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Worker connected to MongoDB');

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('notifications', { durable: true });

    console.log('Worker waiting for messages...');

    channel.consume('notifications', async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log('Received:', data);

        const retryCount = data.retryCount || 0;
        const MAX_RETRIES = 3;

        const notification = new Notification({
          userId: data.userId,
          type: data.type,
          content: data.message,
          metadata: data,
          retryCount: retryCount,
        });


        try {
          // Simulate notification sending
          switch (data.type) {
            case 'sms':
              if (Math.random() < 0.5) throw new Error('Simulated SMS failure');
              console.log(`Simulated SMS to ${data.recipient}`);
              break;

            case 'in-app':
              console.log(`Simulated in-app notification for user ${data.userId}`);
              break;

            case 'email':
              if (Math.random() < 0.5) throw new Error('Simulated Email failure');
              console.log(`Simulated Email with subject: ${data.subject}`);
              break;

            default:
              throw new Error(`Unknown notification type: ${data.type}`);
          }

          notification.status = 'sent';
          await notification.save();
          channel.ack(msg);
        } catch (err) {
          console.error('Worker Error:', err.message);
          notification.status = 'failed';
          await notification.save();

          if (retryCount < MAX_RETRIES) {
            // Requeue with incremented retry count
            data.retryCount = retryCount + 1;
            console.log(`Retrying (#${data.retryCount})...`);
            channel.sendToQueue('notifications', Buffer.from(JSON.stringify(data)), {
              persistent: true,
            });
            channel.ack(msg); 
          } else {
            console.log('Max retries reached. Discarding message.');
            channel.ack(msg); // Discard after max retries
          }
        }
      }
    });
  } catch (err) {
    console.error('Worker Setup Failed:', err);
    process.exit(1);
  }
};

startWorker();
