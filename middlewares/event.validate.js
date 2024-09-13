const Joi = require('joi');

const getFreeSlotsSchema = Joi.object({
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  timezone: Joi.string().required()
});

const createEventSchema = Joi.object({
  eventId: Joi.string().required(),
  dateTime: Joi.string().isoDate().required(),
  duration: Joi.number().integer().min(5).required(),
  name: Joi.string().required(),
  contact: Joi.string().required(),
  comment: Joi.string().optional()
});

const getEventsSchema = Joi.object({
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required()
});

const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = {
  validateGetFreeSlots: validate(getFreeSlotsSchema, 'query'),
  validateCreateEvent: validate(createEventSchema, 'body'),
  validateGetEvents: validate(getEventsSchema, 'query')
};