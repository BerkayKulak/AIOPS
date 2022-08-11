const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (conError, connection) => {
  if (conError) {
    throw conError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    const QUEUE = 'SPHTOPYTHON';
    channel.assertQueue(QUEUE, { durable: false });
    channel.consume(
      QUEUE,
      (msg) => {
        console.log(`Message received: ${msg.content}`);
      },
      { noAck: true }
    );
  });
});
