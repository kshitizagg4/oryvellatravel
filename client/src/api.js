import axios from 'axios';

// In production set VITE_API_URL to the API origin, e.g. https://api.oryvellatravel.com
const api = axios.create({ baseURL: (import.meta.env.VITE_API_URL || '') + '/api' });

export const getCruises = (params) => api.get('/cruises', { params }).then((r) => r.data);
export const getCruise = (id) => api.get(`/cruises/${id}`).then((r) => r.data);
export const getFilters = () => api.get('/filters').then((r) => r.data);
export const getLines = () => api.get('/cruise-lines').then((r) => r.data);
export const getLine = (slug) => api.get(`/cruise-lines/${slug}`).then((r) => r.data);
export const getShip = (slug) => api.get(`/ships/${slug}`).then((r) => r.data);
export const getDestinations = () => api.get('/destinations').then((r) => r.data);
export const getDestination = (slug) => api.get(`/destinations/${slug}`).then((r) => r.data);
export const getDeals = () => api.get('/deals').then((r) => r.data);
export const createBooking = (payload) => api.post('/bookings', payload).then((r) => r.data);
export const postContact = (payload) => api.post('/contact', payload).then((r) => r.data);
export const getBooking = (ref) => api.get(`/bookings/${ref}`).then((r) => r.data);

export default api;
