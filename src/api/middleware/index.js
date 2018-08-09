import axios from 'axios'

export const API_URL = 'https://test-5.chronobank.io/'

const api = axios.create({ baseURL: API_URL })

export const getTransactions = (address: string) => api.get(`/tx/${ address }/history`)
export const getEvents = () => api.get('/events')
export const getEventLogs = (eventName: string) => api.get(`/events/${ eventName }`)
