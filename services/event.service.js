const eventModel = require("../models/event.modal");
const config = require("../config/slotConfg");
const {
  convertTimezone,
  formatDateToUTC,
} = require("../utils/timezone.converter");
const firebase = require('firebase-admin');
class EventService {
    async getFreeSlots(date, timezone) {
      const startTime = new Date(`${date}T${config.startHour}:00Z`);
      const endTime = new Date(`${date}T${config.endHour}:00Z`);
      const slots = [];
      let currentTime = startTime;
      while (currentTime < endTime) {
        slots.push(new Date(currentTime));
        currentTime = new Date(currentTime.getTime() + config.slotDuration * 60000);
      }
      const events = await eventModel.getEventsByDate(formatDateToUTC(date));
  
      const availableSlots = slots.filter((slot) => {
        return !events.some((event) => {
          const eventStart = event.DateTime.toDate()
          const eventEnd = new Date(eventStart.getTime() + event.Duration * 60000);
          return slot >= eventStart && slot < eventEnd;
        });
      });
      return availableSlots.map((slot) => convertTimezone(slot, "UTC", timezone));
    }

  async createEvent({ eventId, dateTime, duration, name, contact, comment }) {
      const formattedDateTime = formatDateToUTC(dateTime);
      const conflict = await eventModel.checkEventConflict(formattedDateTime,config.slotDuration);
      if (conflict) {
        throw new Error("Event already exists for this time.");
      }
      const currentTime = new Date().toISOString();
      const eventData = {
        eventId,
        DateTime: formattedDateTime,
        Duration: duration,
        Name: name,
        Contact: contact,
        Comment: comment,
        CreatedAt: formatDateToUTC(currentTime),
        UpdatedAt: formatDateToUTC(currentTime)
      };
      await eventModel.createEvent(eventData);
      return { message: "Event created successfully" };
  }

  async getEventsByDateRange(startDate, endDate) {
    const events = await eventModel.getEventsByDateRange(
      formatDateToUTC(startDate),
      formatDateToUTC(endDate)
    );
    return events;
  }
}

module.exports = new EventService();
