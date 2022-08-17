const mongoose = require('mongoose');

var usageOfServerSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    SPH: {
      type: String,
      required: [true, 'a usageOfServerSchema must have a SPH'],
    },
    UOM: {
      type: String,
      // required: [true, 'a brand must have a name'],
    },
    UOC: {
      type: String,
      //required: [true, 'a brand must have a name'],
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const UsageOfServer = mongoose.model('UsageOfServer', usageOfServerSchema);

module.exports = UsageOfServer;
