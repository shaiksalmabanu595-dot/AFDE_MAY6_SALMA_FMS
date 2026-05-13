/**
 * Feedback service — wraps every API call related to feedback.
 *
 * Components should call into this service rather than using Axios
 * directly, keeping HTTP concerns separate from rendering concerns.
 */
import api from '../api';

export const feedbackService = {
  async listAll() {
    const { data } = await api.get('/feedback');
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/feedback/${id}`);
    return data;
  },

  async create(feedback) {
    const { data } = await api.post('/feedback', feedback);
    return data;
  },

  async update(id, feedback) {
    const { data } = await api.put(`/feedback/${id}`, feedback);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(`/feedback/${id}`);
    return data;
  },

  async search({ keyword, rating, program } = {}) {
    const params = {};
    if (keyword) params.keyword = keyword;
    if (rating) params.rating = rating;
    if (program) params.program = program;
    const { data } = await api.get('/search', { params });
    return data;
  },

  async getStatistics() {
    const { data } = await api.get('/feedback/statistics');
    return data;
  },
};
