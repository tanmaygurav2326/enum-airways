const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const crewController = require('../controllers/crewController');

const ApiResponse = require('../utils/response');
const crewService = require('../services/crewService');

router.post('/flights/:flightId', authMiddleware, authorize('Admin'), crewController.assignCrew);
router.get('/flights/:flightId', crewController.getFlightCrew);
router.get('/my-assignments', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const flights = await crewService.getCrewFlights(userId);
    const response = ApiResponse.success(200, flights, `Retrieved ${flights.length} assignments`);
    res.status(response.statusCode).json(response.body);
  } catch (err) {
    next(err);
  }
});
router.get('/user/:userId/flights', authMiddleware, crewController.getCrewFlights);
router.delete('/assignments/:assignmentId', authMiddleware, authorize('Admin'), crewController.removeAssignment);

module.exports = router;