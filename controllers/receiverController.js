const UsageOfServer = require('../models/usageOfServerModel');
const catchAsync = require('./../utils/catchAsync');
const amqp = require('amqplib/callback_api');
const axios = require('axios');

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

exports.slack = catchAsync(async (req, res, next) => {
  axios
    .post(
      'https://hooks.slack.com/services/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',
      { text: `Name: ${req.body.name} Email: ${req.body.email}` }
    )
    .then(() => {
      res.send('Form Submitted');
    })
    .catch(() => {
      res.send('Form Fail');
    });
});
