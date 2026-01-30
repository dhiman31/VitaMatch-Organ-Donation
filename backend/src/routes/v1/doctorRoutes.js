const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/doctorController');
const {authMiddleware} = require('../../middleware/auth');

router.post('/requestOrgan',authMiddleware,doctorController.requestOrgan); // working fine
router.get('/availableOrgans',authMiddleware,doctorController.findAllAvailable); //working fine
router.post("/accept-organ", authMiddleware, doctorController.acceptOrgan); // working fine
router.get("/dashboard", authMiddleware, doctorController.doctorDashboard); // working fine
router.get("/doctor/allocations", authMiddleware, doctorController.getDoctorAllocations);

module.exports = router;