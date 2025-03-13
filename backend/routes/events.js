const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController.js');
const { getEventsForToday } = require('../controllers/eventController');

// Rotas para eventos
router.get('/today', auth, getEventsForToday);
router.post('/', auth, eventController.createEvent);
router.get('/', auth, eventController.getEvents);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router;