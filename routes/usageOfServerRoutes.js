const express = require('express');

const usageOfServerController = require('./../controllers/usageOfServerController');
const receiverController = require('./../controllers/receiverController');

const router = express.Router();

router
  .route('/')
  .get(usageOfServerController.getAllUsageOfServer)
  .post(usageOfServerController.createUsageOfServer);

router.route('/sphToPython').post(usageOfServerController.userIdAndSPH);
router.route('/predict').get(receiverController.predictResult);

router
  .route('/withUserId/:id')
  .get(usageOfServerController.getAllUsageOfServerWithUserId);

router.route('/:id').get(usageOfServerController.getUsageOfServer);
//   .patch(brandController.updateBrand)
//   .delete(brandController.deleteBrand);

module.exports = router;
