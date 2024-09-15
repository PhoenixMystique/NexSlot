const eventService = require('../services/event.service');
const { validateGetFreeSlots, validateCreateEvent, validateGetEvents } = require('../middlewares/event.validate');

exports.getFreeSlots = [
  validateGetFreeSlots,
  async (req, res) => {
    const { date, timezone } = req.query;

    try {
      const availableSlots = await eventService.getFreeSlots(date, timezone);
      res.status(200).json(availableSlots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.createEvent = [
    validateCreateEvent,
    async (req, res) => {
      const { dateTime, duration, timezone } = req.body;

      try {
        const response = await eventService.createEvent({
          dateTime,
          duration,
          timezone
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(422).json({ error: error.message });
      }
    }
  ];

exports.getEvents = [
  validateGetEvents,
  async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
      const events = await eventService.getEventsByDateRange(startDate, endDate);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];