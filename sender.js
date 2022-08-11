const amqp = require('amqplib/callback_api');

let object = { age: 16 };
amqp.connect('amqp://localhost', (conError, connection) => {
  if (conError) {
    throw conError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    const QUEUE = 'queuename';
    channel.assertQueue(QUEUE);

    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(object)));
    console.log('MESSAGE SEND ', QUEUE);
  });
});
