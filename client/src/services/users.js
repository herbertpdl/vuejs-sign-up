import axios from 'axios'

const baseUrl = 'http://localhost:3001'

// Save user
export function saveUser(data) {
  return axios.post(`${baseUrl}/users`, data).then(resp => resp.data)
}