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


  createEvent: async (payload) => {
    try {
      const response = await axios.post(`${API_URL}/slots`, {
        "dateTime": payload.dateTime,
        "duration": payload.duration,
        "timezone":payload.timezone
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

  getEvents: async (payload) => {
    try {
      const response = await axios.get(`${API_URL}/events`, {
        params: {
          "startDate": payload.startDate,
          "endDate": payload.endDate,
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
