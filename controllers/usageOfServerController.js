const UsageOfServer = require('../models/usageOfServerModel');
const catchAsync = require('./../utils/catchAsync');
const amqp = require('amqplib/callback_api');
const logger = require('../config/logger');
const readline = require('readline');

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

  var newObject;

  rl.question(
    'How many submissions would you like to send? ? ',
    function (submission) {
      rl.question('Do you want to send pdf ? ', function (pdf) {
        newObject = {
          userId: '62f3575ab51f8a773cde8ed1',
          SPH: parseInt(submission),
          IsPdfSend: parseInt(pdf),
        };
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
            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(newObject)));
            console.log('MESSAGE SEND ', QUEUE);
            console.log('MESSAGE OBJECT ', newObject);
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
