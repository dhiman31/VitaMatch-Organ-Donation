const express = require('express');
const router = express.Router();
const donorController = require('../../controllers/donorController');

router.post('/donateOrgan',donorController.createDonation);
router.get('/waitingOrgans',donorController.findAllWaiting);
router.post('/accept',donorController.acceptOneRequest);

module.exports = router;