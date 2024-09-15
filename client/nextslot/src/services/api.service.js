import axios from 'axios';
import { API_URL } from '../config/config'; // Import your base API URL from config

const ApiService = {
  
  // 1. Fetch Free Slots
  getFreeSlots: async (date, timezone) => {
    try {
      const response = await axios.get(`${API_URL}/free-slots`, {
        params: {
          date: date,
          timezone: timezone,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching free slots:', error);
      throw error;
    }
  },

  // 2. Create Event
  createEvent: async (dateTime, duration) => {
    try {
      const response = await axios.post(`${API_URL}/create-event`, {
        dateTime: dateTime,
        duration: duration,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Event already exists for the given time');
      } else {
        console.error('Error creating event:', error);
      }
      throw error;
    }
  },

  // 3. Get Events Between StartDate and EndDate
  getEvents: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/events`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
};

export default ApiService;
