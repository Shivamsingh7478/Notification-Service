const amqp = require('amqplib');

let channel;

const connectQueue = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('notifications', { durable: true });
    console.log('RabbitMQ connected and channel created');
  } catch (error) {
    console.error('RabbitMQ connection failed:', error);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel not created yet');
  }
  return channel;
};

module.exports = { connectQueue, getChannel };
