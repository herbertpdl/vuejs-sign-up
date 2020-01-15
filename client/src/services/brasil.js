import axios from 'axios'

const baseUrl = 'http://localhost:3001'

// Get states
export function getStates() {
  return axios.get(`${baseUrl}/estados`).then(resp => resp.data)
}

// Get cities
export function getCities(stateId) {
  return axios.get(`${baseUrl}/cidades/?estadoId=${stateId}`).then(resp => resp.data)
}