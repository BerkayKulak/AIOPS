const UsageOfServer = require('../models/usageOfServerModel');
const catchAsync = require('./../utils/catchAsync');
const amqp = require('amqplib/callback_api');
const axios = require('axios');
const { EmbedBuilder, WebhookClient } = require('discord.js');

exports.predictResult = catchAsync(async (req, res, next) => {
  var message;
  amqp.connect('amqp://localhost', (conError, connection) => {
    if (conError) {
      throw conError;
    }
    connection.createChannel(
      (channelError, channel) => {
        if (channelError) {
          throw channelError;
        }
        const QUEUE = 'hello11';
        channel.assertQueue(QUEUE, { durable: false });
        console.log('assert queue');
        channel.consume(QUEUE, (msg) => {
          // console.log(`Message received: ${msg.content}`);
          message = JSON.parse(msg.content);
          console.log(message);
        });
      },
      { noAck: true }
    );
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
    .catch((error) => {
      console.log(error);
      res.send('Form Fail');
    });
});

exports.discord = catchAsync(async (req, res, next) => {
  const webhookClient = new WebhookClient({
    id: '1007544639454187551',
    token:
      'rMNg7G566d_6UXG4TXclDegvv7jsI92JToPREkfVnU31xxh1ShLQjkS5e6Qd_UZqTwRI',
  });

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({
      name: 'Some name',
      iconURL:
        'https://ps.w.org/embed-form/assets/icon-256x256.png?rev=2612516',
      url: 'https://discord.js.org',
    })
    .setDescription('Some description here')
    .setThumbnail(
      'https://ps.w.org/embed-form/assets/icon-256x256.png?rev=2612516'
    )
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true }
    )
    .addFields({
      name: 'Inline field title',
      value: 'Some value here',
      inline: true,
    })
    .setImage(
      'https://orangematter.solarwinds.com/wp-content/uploads/2022/03/DevOps-lifecycle-capabilities-1024x621.png'
    )
    .setTimestamp()
    .setFooter({
      text: 'Some footer text here',
      iconURL:
        'https://ps.w.org/embed-form/assets/icon-256x256.png?rev=2612516',
    });

  webhookClient.send({
    content: 'Server has been started',
    username: 'AIOPS',
    avatarURL:
      'https://ps.w.org/embed-form/assets/icon-256x256.png?rev=2612516',
    embeds: [embed],
  });

  res.send('Form Submitted');
});
