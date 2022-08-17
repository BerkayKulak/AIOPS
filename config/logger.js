const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.MongoDB({
      level: 'error',
      db: 'mongodb+srv://kulakberkay16:UlyiKPN0TfF4jXts@cluster0.aa7xz.mongodb.net/AiOpsDb?retryWrites=true&w=majority',
      collection: 'Logs',
      format: format.combine(format.timestamp(), format.json()),
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

module.exports = logger;
