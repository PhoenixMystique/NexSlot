const db = require('../config/firestore');
const firebase = require('firebase-admin');

class EventModel {
  async createEvent(eventData) {
    return await db.collection('events').add(eventData);
  }

  async getEventsByDateRange(startDate, endDate) {
    const startTimestamp = firebase.firestore.Timestamp.fromDate(startDate);
    const endTimestamp = firebase.firestore.Timestamp.fromDate(endDate);
    const snapshot = await db.collection('events')
      .where('DateTime', '>=', startTimestamp)
      .where('DateTime', '<=', endTimestamp)
      .get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getEventsByDate(date) {
    const startOfDay = firebase.firestore.Timestamp.fromDate(new Date(date.setHours(0, 0, 0, 0)));
    const endOfDay = firebase.firestore.Timestamp.fromDate(new Date(date.setHours(23, 59, 59, 999)));
    const snapshot = await db.collection('events')
      .where('DateTime', '>=', startOfDay)
      .where('DateTime', '<=', endOfDay)
      .get();
    return snapshot.docs.map(doc => doc.data());
  }

  async checkEventConflict(DateTime, duration) {
    const endTime = new Date(DateTime.getTime() + duration * 60000);
    const startTimestamp = firebase.firestore.Timestamp.fromDate(DateTime);
    const endTimestamp = firebase.firestore.Timestamp.fromDate(endTime);
    
    const snapshot = await db.collection('events')
      .where('DateTime', '<=', endTimestamp)
      .where('DateTime', '>=', startTimestamp)
      .get();
    return !snapshot.empty;
  }
}

module.exports = new EventModel();