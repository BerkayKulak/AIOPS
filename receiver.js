const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (conError, connection) => {
  if (conError) {
    throw conError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    const QUEUE = 'hello14';
    channel.assertQueue(QUEUE, { durable: false });
    console.log('assert queue');
    channel.consume(
      QUEUE,
      (msg) => {
        // console.log(`Message received: ${msg.content}`);
        var message = msg.content;
        console.log(`asdfsd ${message}`);
      },
      { noAck: true }
    );
  });
});
