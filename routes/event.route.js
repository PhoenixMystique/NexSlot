const express = require('express');
const { getFreeSlots, createEvent, getEvents } = require('../controllers/event.controller');

const router = express.Router();

router.get('/slots', getFreeSlots);
router.post('/slots', createEvent);
router.get('/events', getEvents);
module.exports = router;
