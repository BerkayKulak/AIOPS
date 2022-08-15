const UsageOfServer = require('../models/usageOfServerModel');
const catchAsync = require('./../utils/catchAsync');
const amqp = require('amqplib/callback_api');
const axios = require('axios');
const { EmbedBuilder, WebhookClient } = require('discord.js');

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
