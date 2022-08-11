const UsageOfServer = require('../models/usageOfServerModel');
const catchAsync = require('./../utils/catchAsync');
const amqp = require('amqplib/callback_api');

exports.predictResult = catchAsync(async (req, res, next) => {
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
          console.log(`Message received: ${JSON.stringify(msg.content)}`);
          var message = JSON.parse(msg.content);
          res.status(200).json({
            status: 'success',
            data: {
              message,
            },
          });
        },
        { noAck: true }
      );
    });
  });
});
