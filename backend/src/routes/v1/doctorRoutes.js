const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/doctorController');

router.post('/requestOrgan',doctorController.requestedOrgan);
router.get('/availableOrgans',doctorController.findAllAvailable);
router.post('/accept',doctorController.acceptOneOrgan);

module.exports = router;