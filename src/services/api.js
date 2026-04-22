// src/services/api.js
import axios from 'axios';

// ⚠️ Replace with YOUR HTTP API URL
const API_BASE_URL = 'https://hlc5hlsf8l.execute-api.us-east-1.amazonaws.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiService = {
  getBots: async () => {
    try {
      const response = await api.get('/bots');
      return response.data;
    } catch (error) {
      console.error('Error fetching bots:', error);
      throw error;
    }
  },

  getBot: async (botId) => {
    try {
      const response = await api.get(`/bots/${botId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bot:', error);
      throw error;
    }
  },

  createBot: async (botData) => {
    try {
      const response = await api.post('/bots', botData);
      return response.data;
    } catch (error) {
      console.error('Error creating bot:', error);
      throw error;
    }
  },

  updateBot: async (botId, updates) => {
    try {
      const response = await api.put(`/bots/${botId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating bot:', error);
      throw error;
    }
  },

  deleteBot: async (botId) => {
    try {
      const response = await api.delete(`/bots/${botId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting bot:', error);
      throw error;
    }
  },

  getBotTrades: async (botId) => {
    try {
      const response = await api.get(`/bots/${botId}/trades`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trades:', error);
      throw error;
    }
  }
};

export default apiService;
