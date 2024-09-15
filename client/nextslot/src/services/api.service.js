import axios from 'axios';
import { API_URL } from '../config/config'; // Import your base API URL from config

const ApiService = {
  

  getFreeSlots: async (payload) => {
    try {
      const response = await axios.get(`${API_URL}/slots`, {
        params: {
          "date": payload.dateTime,
          "timezone": payload.timezone,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching free slots:', error);
      throw error;
    }
  },


  createEvent: async (dateTime, duration,timezone) => {
    try {
      const response = await axios.post(`${API_URL}/slots`, {
        "dateTime": dateTime,
        "duration": duration,
        "timezone":timezone
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

  getEvents: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/events`, {
        params: {
          "startDate": startDate,
          "endDate": endDate,
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
