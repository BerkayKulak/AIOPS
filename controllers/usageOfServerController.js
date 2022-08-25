const UsageOfServer = require('../models/usageOfServerModel');
const catchAsync = require('./../utils/catchAsync');
const amqp = require('amqplib/callback_api');
const logger = require('../config/logger');
const readline = require('readline');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const axios = require('axios');
const { parse } = require('csv-parse');
var fs = require('fs');

exports.getAllUsageOfServer = catchAsync(async (req, res, next) => {
  const usageOfServerModel = await UsageOfServer.find(req.body);

  // amqp.connect('amqp://localhost', (conError, connection) => {
  //   if (conError) {
  //     throw conError;
  //   }
  //   connection.createChannel((channelError, channel) => {
  //     if (channelError) {
  //       throw channelError;
  //     }
  //     const QUEUE = 'codingtest6';
  //     channel.assertQueue(QUEUE, { durable: false });
  //     let object = { age: 16 };
  //     channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(object)));
  //     console.log('MESSAGE SEND ', QUEUE);
  //   });
  // });

  res.status(200).json({
    status: 'success',
    results: usageOfServerModel.length,
    data: {
      usageOfServerModel,
    },
  });
  logger.error('getAllUsageOfServer method has started');
});

exports.userIdAndSPH = catchAsync(async (req, res, next) => {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  var newObject = {};

  rl.question(
    'How many submissions would you like to send? ? ',
    function (submission) {
      rl.question('Do you want to send pdf ? ', function (pdf) {
        rl.question('What payment are you using ?', function (payment) {
          newObject = {
            userId: '62f3575ab51f8a773cde8ed1',
            SPH: parseInt(submission),
            IsPdfSend: parseInt(pdf),
            paymentSystem: payment.charAt(0).toUpperCase() + payment.slice(1),
          };
          // var intSubmission = parseInt(submission);
          // if (intSubmission < 100) {
          //   newObject.paymentSystem = 'Free';
          // } else if (intSubmission > 100 && intSubmission < 150) {
          //   newObject.paymentSystem = 'Bronze';
          // } else if (intSubmission > 120 && intSubmission < 200) {
          //   newObject.paymentSystem = 'Silver';
          // } else if (intSubmission > 200 && intSubmission < 250) {
          //   newObject.paymentSystem = 'Gold';
          // } else {
          //   newObject.paymentSystem = 'Enterprise';
          // }
          // var averageSPH;
          amqp.connect('amqp://localhost', (conError, connection) => {
            if (conError) {
              throw conError;
            }
            connection.createChannel((channelError, channel) => {
              if (channelError) {
                throw channelError;
              }

              function average(a, n) {
                var sum = 0;
                for (var i = 0; i < n; i++) sum += a[i];

                return parseFloat(sum / n);
              }

              var arrayAverage = [];
              var arrayAverageInt = [];
              var parser = parse({ columns: true }, function (err, records) {
                //console.log(records);
                records.map((e) => {
                  arrayAverage.push(e.SPH);
                });
                for (var i = 0; i < records.length; i++) {
                  arrayAverageInt.push(parseInt(arrayAverage[i]));
                }

                var n = arrayAverageInt.length;
                averageSPH = average(arrayAverageInt, n);

                // TODO: PAYMENT SYSTEM INTEGRATE
                // if (averageSPH < 100) {
                //   newObject.paymentSystem = 'Bronze';
                // } else if (averageSPH > 180 && averageSPH < 250) {
                //   newObject.paymentSystem = 'Silver';
                // } else if (averageSPH > 250 && averageSPH < 500) {
                //   newObject.paymentSystem = 'Gold';
                // } else {
                //   newObject.paymentSystem = 'Diamond';
                // }

                console.log(newObject);

                const QUEUE = 'SPHTOPYTHON';
                channel.assertQueue(QUEUE, { durable: false });
                channel.sendToQueue(
                  QUEUE,
                  Buffer.from(JSON.stringify(newObject))
                );
                console.log('MESSAGE SEND ', QUEUE);
                console.log('MESSAGE OBJECT ', newObject);

                const webhookClient = new WebhookClient({
                  id: '1007544639454187551',
                  token:
                    'rMNg7G566d_6UXG4TXclDegvv7jsI92JToPREkfVnU31xxh1ShLQjkS5e6Qd_UZqTwRI',
                });

                const embed = new EmbedBuilder()
                  .setColor(0x0099ff)
                  .setTitle(`${averageSPH}`)
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
                    {
                      name: 'Inline field title',
                      value: 'Some value here',
                      inline: true,
                    },
                    {
                      name: 'Inline field title',
                      value: 'Some value here',
                      inline: true,
                    }
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
                axios.post(
                  'https://hooks.slack.com/services/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',
                  { text: `: ${JSON.stringify(newObject)}` }
                );
              });

              fs.createReadStream(__dirname + '/UsageOfServers.csv').pipe(
                parser
              );
            });
          });

          res.status(200).json({
            status: 'success',
            data: {
              newObject,
            },
          });
          logger.error('userIdAndSPH method has started');
          rl.close();
        });
      });
    }
  );

  // rl.on('close', function () {
  //   console.log('\nBYE BYE !!!');
  //   process.exit(0);
  // });
});

exports.getAllUsageOfServerWithUserId = catchAsync(async (req, res, next) => {
  const usageOfServerModel = await UsageOfServer.find(req.body);

  let newObject = usageOfServerModel.filter(
    (e) => e.UserId == '62f3575ab51f8a773cde8ed1'
  );

  var sumSPH = 0;
  var sumUOM = 0;
  var sumUOC = 0.0;

  newObject.forEach((element) => {
    sumSPH += parseFloat(element.SPH);
    sumUOM += parseFloat(element.UOM);
    sumUOC += parseFloat(element.UOC);
  });

  var averageSPH = sumSPH / newObject.length;
  var averageUOM = sumUOM / newObject.length;
  var averageUOC = sumUOC / newObject.length;

  res.status(200).json({
    status: 'success',
    results: newObject.length,
    data: {
      newObject,
      averageSPH,
      averageUOM,
      averageUOC,
    },
  });
  logger.error('getAllUsageOfServerWithUserId method has started');
});

exports.createUsageOfServer = catchAsync(async (req, res, next) => {
  const usageOfServerModel = await UsageOfServer.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      usageOfServerModel,
    },
  });
});

// exports.deleteBrand = catchAsync(async (req, res, next) => {
//   const brand = await Brand.findByIdAndDelete(req.params.id);
//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });

exports.getUsageOfServer = catchAsync(async (req, res, next) => {
  const usageOfServerModel = await UsageOfServer.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      usageOfServerModel,
    },
  });
});

// exports.updateBrand = catchAsync(async (req, res, next) => {
//   const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       brand,
//     },
//   });
// });
